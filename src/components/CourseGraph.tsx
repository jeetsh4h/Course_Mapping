import ReactFlow, { 
  Node, 
  Edge,
  Background,
  Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Course } from '../types/Course';
import { useState } from 'react';

interface CourseGraphProps {
  courses: Course[];
}

export const CourseGraph = ({ courses }: CourseGraphProps) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Group courses by semester and organize layout
  const nodes: Node[] = courses.map((course) => {
    const semNum = parseInt(course.semester.replace('Sem-', ''));
    const semesterGroup = courses.filter(c => 
      c.semester === course.semester
    );
    const indexInSemester = semesterGroup.findIndex(c => 
      c.courseCode === course.courseCode
    );
    
    return {
      id: course.courseCode,
      data: { 
        label: course.courseCode,
        type: course.major // Add type for styling
      },
      position: {
        x: semNum * 300, // Increased spacing between semesters
        y: indexInSemester * 100 + 100 // Added offset for legend
      },
      style: {
        background: course.major === 'Core' ? '#e6f3ff' : '#fff2e6',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        width: 150
      }
    };
  });

  // Add legend nodes
  const legendNodes: Node[] = [
    {
      id: 'legend-core',
      type: 'default',
      position: { x: 50, y: 20 },
      data: { label: 'Core Course' },
      style: {
        background: '#e6f3ff',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '5px',
        width: 120
      }
    },
    {
      id: 'legend-elective',
      type: 'default',
      position: { x: 200, y: 20 },
      data: { label: 'Elective Course' },
      style: {
        background: '#fff2e6',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '5px',
        width: 120
      }
    },
    {
      id: 'legend-and',
      type: 'default',
      position: { x: 350, y: 20 },
      data: { label: 'AND Prerequisite' },
      style: {
        background: '#ffffff',
        border: '1px solid #000',
        borderRadius: '5px',
        padding: '5px',
        width: 120
      }
    },
    {
      id: 'legend-or',
      type: 'default',
      position: { x: 500, y: 20 },
      data: { label: 'OR Prerequisite' },
      style: {
        background: '#ffffff',
        border: '1px solid #ff0000',
        borderRadius: '5px',
        padding: '5px',
        width: 120
      }
    }
  ];

  // Combine regular nodes with legend nodes
  const allNodes = [...legendNodes, ...nodes];

  const edges: Edge[] = courses.flatMap(course =>
    course.prerequisites.and.flatMap(orGroup =>
      orGroup.map(prereq => ({
        id: `${prereq}-${course.courseCode}`,
        source: prereq,
        target: course.courseCode,
        type: 'smoothstep',
        // Add different styles for AND/OR relationships
        style: {
          stroke: orGroup.length > 1 ? '#ff0000' : '#000000',
          strokeWidth: 2,
        },
      }))
    )
  );

  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <ReactFlow 
        nodes={allNodes}
        edges={edges}
        onNodeClick={(_, node: Node) => {
          if (node && !node.id.startsWith('legend-')) {
            setSelectedCourse(courses.find(c => c.courseCode === node.id) ?? null);
          }
        }}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
      
      {selectedCourse && (
        <div className="course-details">
          <h3>{selectedCourse.courseTitle}</h3>
          <p>Code: {selectedCourse.courseCode}</p>
          <p>Credits: {selectedCourse.credits}</p>
          <p>Type: {selectedCourse.major}</p>
          <p>Semester: {selectedCourse.semester}</p>
        </div>
      )}
    </div>
  );
};
