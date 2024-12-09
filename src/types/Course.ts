export interface Course {
  courseCode: string;
  semester: string;
  courseTitle: string;
  credits: number;
  major: 'Core' | 'Elective';
  prerequisites: {
    and: string[][];  // Array of OR groups (inner arrays) that must all be satisfied
  };
}

export type MajorType = 'computer_science' | 'psych' | 'econ_ba';
