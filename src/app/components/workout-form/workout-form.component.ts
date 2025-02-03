import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { WorkoutDataService } from '../../services/workout-data.service';

@Component({
  selector: 'app-workout-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  template: `
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <h2 class="text-2xl font-bold mb-4">Add Workout</h2>
      <form #workoutForm="ngForm" (ngSubmit)="onSubmit()" class="space-y-4">
        <mat-form-field class="w-full">
          <mat-label>User Name</mat-label>
          <input matInput [(ngModel)]="workout.userName" name="userName" required>
        </mat-form-field>

        <mat-form-field class="w-full">
          <mat-label>Workout Type</mat-label>
          <mat-select [(ngModel)]="workout.workoutType" name="workoutType" required>
            <mat-option *ngFor="let type of workoutTypes" [value]="type">
              {{type}}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field class="w-full">
          <mat-label>Minutes</mat-label>
          <input matInput type="number" [(ngModel)]="workout.minutes" name="minutes" required min="1">
        </mat-form-field>

        <button mat-raised-button color="primary" type="submit" [disabled]="!workoutForm.valid">
          Add Workout
        </button>
      </form>
    </div>
  `
})
export class WorkoutFormComponent {
  workout = {
    userName: '',
    workoutType: '',
    minutes: 0,
    date: new Date()
  };

  workoutTypes = ['Running', 'Yoga', 'Weight Training', 'Swimming', 'Cycling'];

  constructor(private workoutService: WorkoutDataService) {}

  onSubmit() {
    this.workoutService.addWorkout(this.workout);
    this.workout = {
      userName: '',
      workoutType: '',
      minutes: 0,
      date: new Date()
    };
  }
}
