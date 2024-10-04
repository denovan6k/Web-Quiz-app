# Quiz App

## Overview

This is a dynamic quiz application built with Next.js, React, and TypeScript. Users can navigate through various quizzes, answer questions, and view their scores. The app leverages Zustand for state management and integrates form validation using Zod and React Hook Form.

## Features

- **Dynamic Quiz Loading**: Quizzes are loaded dynamically based on user selection, allowing for a seamless experience.
- **Responsive Design**: The app is designed to be responsive, providing a smooth experience on both mobile and desktop devices.
- **Dark Mode Toggle**: Users can switch between light and dark themes, with their preferences saved in local storage.
- **Real-time State Management**: Uses Zustand for managing quiz states, ensuring smooth transitions and updates throughout the application.
- **Form Validation**: Implemented with Zod and React Hook Form for a better user experience and input validation.
- **Progress Tracking**: Users can see their progress through quizzes.

## Technologies Used

- **Next.js**: For server-side rendering and routing.
- **React**: For building user interfaces.
- **TypeScript**: For type safety.
- **Zustand**: For state management.
- **Zod**: For schema validation.
- **React Hook Form**: For managing form state and validation.
- **Tailwind CSS**: For styling.

## Installation

To get started with the Quiz App, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/denovan6k/Web-Quiz-app.git

   ```
```bash
cd Web-Quiz-app

npm install

npm run dev
```
## Folder structure
```bash
Web-Quiz-app/
├── app/
│   ├── store/          # Zustand store for state management
│   ├── components/     # Reusable UI components
│   ├── mobile/         # Mobile-specific components and assets
│   ├── pages/          # Next.js pages
│   ├── styles/         # CSS and styling
│   └── data.json       # Quiz data
├── public/             # Static files and assets
├── package.json        # Project dependencies
└── README.md           # Project documentation


