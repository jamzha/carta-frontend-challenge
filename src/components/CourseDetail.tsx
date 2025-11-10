import React, { useMemo } from 'react';
import './CourseDetail.css';
import { Course, Rating } from '../types';

interface CourseDetailProps {
  course: Course;
  onBack: () => void;
}

// CourseDetail Component
// Displays detailed course information including metadata, description,
// offerings, and instructor ratings grouped by instructor
const CourseDetail: React.FC<CourseDetailProps> = ({ course, onBack }) => {
  // Format units display (single number or range)
  const units = course.min_units === course.max_units
    ? `${course.min_units}`
    : `${course.min_units}-${course.max_units}`;

  // Group ratings by instructor and calculate aggregate statistics
  const instructorRatings = useMemo(() => {
    const grouped: { [key: string]: Rating[] } = {};
    course.ratings.forEach((rating) => {
      if (!grouped[rating.instructor_name]) {
        grouped[rating.instructor_name] = [];
      }
      grouped[rating.instructor_name].push(rating);
    });

    return Object.entries(grouped).map(([name, ratings]) => {
      const totalRating = ratings.reduce((sum, r) => sum + parseFloat(r.average_rating), 0);
      const avgRating = (totalRating / ratings.length).toFixed(2);
      const totalRatings = ratings.reduce((sum, r) => sum + r.num_ratings, 0);
      return {
        name,
        ratings,
        averageRating: avgRating,
        totalRatings,
      };
    }).sort((a, b) => parseFloat(b.averageRating) - parseFloat(a.averageRating));
  }, [course.ratings]);

  return (
    <div className="course-detail-container">
      <button className="back-button" onClick={onBack}>
        Back to Course List
      </button>

      <div className="course-detail-content">
        <div className="course-detail-header">
          <div className="course-detail-codes">
            {course.course_codes.map((code, index) => (
              <span key={index} className="course-detail-code">
                {code}
              </span>
            ))}
          </div>
          <h1 className="course-detail-title">{course.title}</h1>
          <div className="course-detail-meta">
            <span className="course-detail-units">{units} unit{units !== '1' ? 's' : ''}</span>
            {course.grading && (
              <span className="course-detail-grading">{course.grading}</span>
            )}
            {course.average_hours_spent && (
              <span className="course-detail-hours">
                Avg. {course.average_hours_spent} hours/week
              </span>
            )}
          </div>
        </div>

        <div className="course-detail-description">
          <h2>Description</h2>
          <p>{course.description}</p>
        </div>

        {course.offerings.length > 0 && (
          <div className="course-offerings">
            <h2>Course Offerings</h2>
            <div className="offerings-list">
              {course.offerings.map((offering) => (
                <div key={offering.id} className="offering-item">
                  <div className="offering-header">
                    <span className="offering-component">{offering.component}</span>
                    <span className="offering-section">Section {offering.section_number}</span>
                  </div>
                  <div className="offering-details">
                    <span className="offering-mode">{offering.instruction_mode}</span>
                    <span className="offering-term">
                      {offering.term.season} {offering.term.start_year}
                    </span>
                  </div>
                  {offering.notes && (
                    <p className="offering-notes">{offering.notes}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="instructor-ratings">
          <h2>Instructor Ratings</h2>
          {instructorRatings.length === 0 ? (
            <p className="no-ratings">No instructor ratings available for this course.</p>
          ) : (
            <div className="ratings-list">
              {instructorRatings.map((instructor, index) => (
                <div key={index} className="instructor-rating-card">
                  <div className="instructor-header">
                    <h3 className="instructor-name">{instructor.name}</h3>
                    <div className="instructor-overall-rating">
                      <span className="rating-value">{instructor.averageRating}</span>
                      <span className="rating-stars">
                        {'★'.repeat(Math.round(parseFloat(instructor.averageRating)))}
                        {'☆'.repeat(5 - Math.round(parseFloat(instructor.averageRating)))}
                      </span>
                      <span className="rating-count">
                        ({instructor.totalRatings} {instructor.totalRatings === 1 ? 'rating' : 'ratings'})
                      </span>
                    </div>
                  </div>
                  <div className="instructor-ratings-detail">
                    {instructor.ratings.map((rating, ratingIndex) => (
                      <div key={ratingIndex} className="rating-item">
                        <div className="rating-term">
                          {rating.term.season} {rating.term.start_year}
                        </div>
                        <div className="rating-details">
                          <span className="rating-score">{rating.average_rating}</span>
                          <span className="rating-num">
                            {rating.num_ratings} {rating.num_ratings === 1 ? 'rating' : 'ratings'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;

