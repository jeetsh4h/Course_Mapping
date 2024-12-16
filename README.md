# Curriculum Mapping Visualization

An interactive visualization tool for viewing and exploring academic curriculum prerequisites and course relationships. Built with React, TypeScript, and Vite.

## Features

- Interactive course dependency graph using ReactFlow
- Support for multiple majors (Computer Science, Psychology, Economics)
- Visual distinction between core and elective courses
- Prerequisite relationship visualization (AND/OR relationships)
- Course detail panel on selection
- Responsive layout with zoom and pan controls

## Tech Stack

- React 18
- TypeScript
- Vite
- ReactFlow
- ESLint

## Getting Started

1. Install dependencies:
```bash
npm install
```
2. Run the development server:
```bash
npm run dev
```
3. Build for production:
```bash
npm run build
```
4. Preview the production build:
```bash
npm run preview
```

## Project Structure
```
src/
├── components/
│   └── CourseGraph.tsx   # Main visualization component
├── data/
│   └── majors/           # CSV files for each major's curriculum
├── types/
│   └── Course.ts         # TypeScript interfaces
├── utils/
│   └── csvParser.ts      # CSV parsing utilities
├── App.tsx               # Main application component
└── main.tsx              # Application entry point
```

## Data Format
Curriculum data is stored in CSV files with the following structure:

* Course Code
* Semester
* Course Title
* Credits
* Core/Elective
* Prerequisites


# TODO
- [x] Add a way to upload custom CSV files (in that specific format)
- [ ] Better visualisation of the prerequisite relationships\
- [ ] Fix the spacing for the sem 1/2 courses
- [ ] Make it clearer that the courses are clickable
- [ ] Make a more explicit grouping my semester
