import { useState, useEffect } from 'react'
import { CourseGraph } from './components/CourseGraph'
import { parseCSV } from './utils/csvParser'
import { Course, MajorType } from './types/Course'
import './App.css'

function App() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedMajor, setSelectedMajor] = useState<MajorType>('computer_science');

  useEffect(() => {
    const loadCourses = async () => {
      const response = await fetch(`/src/data/majors/${selectedMajor}.csv`);
      const text = await response.text();
      setCourses(parseCSV(text));
    };
    
    loadCourses().catch(error => {
      console.error('Error loading courses:', error);
    });
  }, [selectedMajor]);

  return (
    <div className="app">
      <h1>Curriculum Map</h1>
      <select 
        value={selectedMajor}
        onChange={(e) => setSelectedMajor(e.target.value as MajorType)}
      >
        <option value="computer_science">Computer Science</option>
        <option value="psych">Psychology</option>
        <option value="econ_ba">Economics</option>
      </select>
      {courses.length > 0 && <CourseGraph courses={courses} />}
    </div>
  )
}

export default App
