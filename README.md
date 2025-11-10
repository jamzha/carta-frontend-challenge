# Carta Course Search

A React + TypeScript application that mimics Carta's search results page for course browsing.

## Features

- **Course List View**: Displays all courses with title, course codes, description, and unit count
- **Search Functionality**: Filter courses by title, course code, or description
- **Course Detail View**: Click any course to see detailed information including:
  - Full course description
  - Instructor ratings grouped by instructor
  - Course offerings with schedules and sections
  - Average hours spent per week
- **Viewed Indicator**: Courses you've viewed are marked with a green badge and left border
- **LocalStorage Persistence**: Viewed courses are saved in browser localStorage
- **Responsive Design**: Works well on desktop and mobile devices

## Getting Started

### Installation

```bash
npm install
```

### Running the App

```bash
npm start
```

The app will open at [ http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
```

## Tech Stack

- React 18.2.0
- TypeScript 4.9.5
- React Scripts 5.0.1

## Project Structure

```
src/
  ├── components/
  │   ├── CourseList.tsx      # Main course list with search
  │   ├── CourseCard.tsx      # Individual course card
  │   └── CourseDetail.tsx    # Course detail view
  ├── types.ts                # TypeScript interfaces
  ├── App.tsx                 # Main app component
  └── index.tsx               # Entry point
```

## CodeSandbox

This project is ready to be imported into CodeSandbox. Simply:
1. Go to https://codesandbox.io
2. Click "Import Project"
3. Upload this folder or connect to your Git repository

