export interface Term {
  season: string;
  stanford_term_id: number;
  previous_term: number | null;
  end_year: number;
  next_term: number | null;
  id: string;
  start_year: number;
}

export interface Rating {
  instructor_name: string;
  term: Term;
  average_rating: string;
  num_ratings: number;
}

export interface Offering {
  schedules: any[];
  component: string;
  section_number: string;
  notes: string;
  instruction_mode: string;
  term: Term;
  id: string;
}

export interface Course {
  offerings: Offering[];
  max_units: number;
  repeatable: boolean;
  seasons_offered: string[];
  id: string;
  description: string;
  min_units: number;
  title: string;
  average_hours_spent: string;
  grading: string;
  course_id: string;
  similar_courses: {
    taken_after: any[];
    taken_before: any[];
    taken_concurrently: any[];
    similar_descriptions: any[];
  };
  general_requirements: string[];
  course_codes: string[];
  ratings: Rating[];
}

