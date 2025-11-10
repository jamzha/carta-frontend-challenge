import React, { useState, useMemo } from 'react';
import './CourseList.css';
import CourseCard from './CourseCard';
import { Course } from '../types';

interface CourseListProps {
  courses: Course[];
  onCourseClick: (course: Course) => void;
  viewedCourseIds: string[];
}

// CourseList Component
// Displays a searchable list of courses with filtering by title, code, or description
const CourseList: React.FC<CourseListProps> = ({ courses, onCourseClick, viewedCourseIds }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter courses based on search query (searches title, description, and course codes)
  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) {
      return courses;
    }

    const query = searchQuery.toLowerCase();
    return courses.filter((course) => {
      const titleMatch = course.title.toLowerCase().includes(query);
      const descriptionMatch = course.description.toLowerCase().includes(query);
      const codeMatch = course.course_codes.some((code) =>
        code.toLowerCase().includes(query)
      );
      return titleMatch || descriptionMatch || codeMatch;
    });
  }, [courses, searchQuery]);

  return (
    <div className="course-list-container">
      <header className="course-list-header">
        <h1>Carta Course Search</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search courses by title, code, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <span className="results-count">
              {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} found
            </span>
          )}
        </div>
      </header>

      <div className="course-list">
        {filteredCourses.length === 0 ? (
          <div className="no-results">
            {searchQuery ? 'No courses found matching your search.' : 'No courses available.'}
          </div>
        ) : (
          filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onClick={() => onCourseClick(course)}
              isViewed={viewedCourseIds.includes(course.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CourseList;

