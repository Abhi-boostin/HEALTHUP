# Health Challenge Tracker

A modern Angular-based workout tracking application with Material UI and Tailwind CSS.

## Features Implemented

- 🏋️ Workout Tracking System
  - Add/Edit/Delete workouts
  - User management
  - Workout type categorization
  - Duration tracking

- 📊 Data Management
  - LocalStorage persistence
  - SSR compatibility
  - State management using Services

- 🎨 UI/UX
  - Material Design components
  - Responsive layout with Tailwind CSS
  - Clean and modern interface

## Technical Stack

- Angular 19.1.0
- Angular Material 19.1.2
- Tailwind CSS 3.4.1
- Chart.js 4.4.7
- TypeScript 5.7.2

## Deployment

The application is deployed on GitHub Pages:
- URL: https://abhi-boostin.github.io/HEALTHUP/
- CI/CD: GitHub Actions
- Hosting: GitHub Pages

## Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run development server:
   ```bash
   ng serve
   ```
4. Visit `http://localhost:4200`

## Testing

100% test coverage maintained for critical components:

```bash
ng test --code-coverage
```


## Deployment Steps

1. Build production:
   ```bash
   ng build --configuration production
   ```
2. Deploy to GitHub Pages:
   ```bash
   ng deploy --base-href=/HEALTHUP/
   ```

## Project Structure

- `/src/app/components`: UI Components
- `/src/app/services`: Data Services
- `/src/app/models`: TypeScript Interfaces


## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes and commit them
4. Push to your fork and create a pull request
