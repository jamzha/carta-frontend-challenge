import React from 'react';
import './CourseCard.css';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onClick: () => void;
  isViewed: boolean;
}

// CourseCard Component
// Displays a single course card with title, codes, description, and metadata
// Shows visual indicator if course has been viewed
const CourseCard: React.FC<CourseCardProps> = ({ course, onClick, isViewed }) => {
  // Format units display (single number or range)
  const units = course.min_units === course.max_units
    ? `${course.min_units}`
    : `${course.min_units}-${course.max_units}`;

  return (
    <div
      className={`course-card ${isViewed ? 'viewed' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      // Keyboard accessibility: Enter or Space to select
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="course-card-header">
        <div className="course-codes">
          {course.course_codes.map((code, index) => (
            <span key={index} className="course-code">
              {code}
            </span>
          ))}
        </div>
      </div>
      <h2 className="course-title">{course.title}</h2>
      <p className="course-description">{course.description}</p>
      <div className="course-meta">
        <span className="course-units">{units} unit{units !== '1' ? 's' : ''}</span>
        {course.grading && (
          <span className="course-grading">{course.grading}</span>
        )}
      </div>
    </div>
  );
};

export default CourseCard;

