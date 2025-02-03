import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { WorkoutDataService } from '../../services/workout-data.service';
import { Workout } from '../../models/workout.model';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  template: `
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-2xl font-bold mb-4">Workout History</h2>
      <table mat-table [dataSource]="workouts" class="w-full">
        <!-- User Name Column -->
        <ng-container matColumnDef="userName">
          <th mat-header-cell *matHeaderCellDef>User Name</th>
          <td mat-cell *matCellDef="let workout">{{workout.userName}}</td>
        </ng-container>

        <!-- Workout Type Column -->
        <ng-container matColumnDef="workoutType">
          <th mat-header-cell *matHeaderCellDef>Workout Type</th>
          <td mat-cell *matCellDef="let workout">{{workout.workoutType}}</td>
        </ng-container>

        <!-- Minutes Column -->
        <ng-container matColumnDef="minutes">
          <th mat-header-cell *matHeaderCellDef>Minutes</th>
          <td mat-cell *matCellDef="let workout">{{workout.minutes}}</td>
        </ng-container>

        <!-- Date Column -->
        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef>Date</th>
          <td mat-cell *matCellDef="let workout">{{workout.date | date}}</td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `,
  styles: []
})
export class WorkoutListComponent implements OnInit {
  workouts: Workout[] = [];
  displayedColumns: string[] = ['userName', 'workoutType', 'minutes', 'date'];

  constructor(private workoutService: WorkoutDataService) {}

  ngOnInit(): void {
    this.workoutService.getWorkouts().subscribe(workouts => {
      this.workouts = workouts;
    });
  }
}
