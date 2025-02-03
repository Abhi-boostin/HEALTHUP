import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, WorkoutListComponent],
  template: `
    <mat-toolbar color="primary" class="mb-4">
      <span>Health Challenge Tracker</span>
    </mat-toolbar>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Workout Tracker</h1>
      <app-workout-list></app-workout-list>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'health-challenge-tracker';
}
