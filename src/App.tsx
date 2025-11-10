import React, { useState, useEffect } from 'react';
import './App.css';
import CourseList from './components/CourseList';
import CourseDetail from './components/CourseDetail';
import { Course } from './types';

const COURSES_API_URL = 'https://gist.githubusercontent.com/jwass91/f8c0b4f887c5db63434b41ad04d56d03/raw/6b532445911a4a871fc8f29bb00b367c7dd2dc61/carta-courses.json';

// Main App Component
// Manages course data fetching, navigation between list and detail views,
// and tracks viewed courses in localStorage
function App() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Initialize viewed courses from localStorage
  const [viewedCourseIds, setViewedCourseIds] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('viewedCourses') || '[]') as string[];
  });

  // Fetch courses from API on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch(COURSES_API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Handle course selection and mark as viewed in localStorage
  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    const viewedCourses = JSON.parse(localStorage.getItem('viewedCourses') || '[]');
    if (!viewedCourses.includes(course.id)) {
      viewedCourses.push(course.id);
      localStorage.setItem('viewedCourses', JSON.stringify(viewedCourses));
      setViewedCourseIds([...viewedCourses]);
    }
  };

  // Return to course list and refresh viewed courses
  const handleBackToList = () => {
    setSelectedCourse(null);
    const viewedCourses = JSON.parse(localStorage.getItem('viewedCourses') || '[]') as string[];
    setViewedCourseIds(viewedCourses);
  };

  if (loading) {
    return (
      <div className="app-container">
        <div className="loading">
          <span>Loading courses...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {selectedCourse ? (
        <CourseDetail course={selectedCourse} onBack={handleBackToList} />
      ) : (
        <CourseList 
          courses={courses} 
          onCourseClick={handleCourseClick}
          viewedCourseIds={viewedCourseIds}
        />
      )}
    </div>
  );
}

export default App;

