import { Course } from '../types/Course';

export const parseCSV = (csvContent: string): Course[] => {
  const lines = csvContent.split('\n');
  
  const parsePrerequisites = (prereqString: string): { and: string[][] } => {
    if (!prereqString.trim()) {
      return { and: [] };
    }

    // Split by 'and' first to get groups that must all be satisfied
    const andGroups = prereqString.split('and').map(group => group.trim());
    
    // For each AND group, split by 'or' to get alternative options
    const processedGroups = andGroups.map(group => 
      group
        .split('or')
        .map(course => course.trim())
        .filter(course => course) // Remove empty strings
    );

    return { and: processedGroups };
  };

  return lines
    .slice(1)
    .filter(line => line.trim())
    .map(line => {
      const values = line.split(',').map(v => v.trim());
      return {
        courseCode: values[0],
        semester: values[1],
        courseTitle: values[2],
        credits: Number(values[3]),
        major: values[4] as 'Core' | 'Elective',
        prerequisites: parsePrerequisites(values[5] || '')
      };
    });
};
