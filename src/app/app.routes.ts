import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/workouts', pathMatch: 'full' },
  {
    path: 'workouts',
    loadComponent: () => 
      import('./components/workout-list/workout-list.component')
        .then(m => m.WorkoutListComponent)
  }
];
