import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { WorkoutDataService } from '../../services/workout-data.service';
import { Workout } from '../../models/workout.model';
import { WorkoutFormComponent } from '../workout-form/workout-form.component';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    WorkoutFormComponent
  ],
  template: `
    <app-workout-form></app-workout-form>

    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex gap-4 mb-4">
        <mat-form-field>
          <mat-label>Search by name</mat-label>
          <input matInput [(ngModel)]="searchTerm" (ngModelChange)="applyFilters()">
        </mat-form-field>

        <mat-form-field>
          <mat-label>Filter by type</mat-label>
          <mat-select [(ngModel)]="selectedType" (ngModelChange)="applyFilters()">
            <mat-option>All</mat-option>
            <mat-option *ngFor="let type of workoutTypes" [value]="type">
              {{type}}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      <table mat-table [dataSource]="paginatedWorkouts" class="w-full">
        <ng-container matColumnDef="userName">
          <th mat-header-cell *matHeaderCellDef>User Name</th>
          <td mat-cell *matCellDef="let workout">{{workout.userName}}</td>
        </ng-container>

        <ng-container matColumnDef="workoutType">
          <th mat-header-cell *matHeaderCellDef>Workout Type</th>
          <td mat-cell *matCellDef="let workout">{{workout.workoutType}}</td>
        </ng-container>

        <ng-container matColumnDef="minutes">
          <th mat-header-cell *matHeaderCellDef>Minutes</th>
          <td mat-cell *matCellDef="let workout">{{workout.minutes}}</td>
        </ng-container>

        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef>Date</th>
          <td mat-cell *matCellDef="let workout">{{workout.date | date}}</td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>

      <mat-paginator
        [length]="filteredWorkouts.length"
        [pageSize]="pageSize"
        [pageSizeOptions]="[5, 10, 25]"
        (page)="onPageChange($event)">
      </mat-paginator>
    </div>
  `
})
export class WorkoutListComponent implements OnInit {
  workouts: Workout[] = [];
  filteredWorkouts: Workout[] = [];
  paginatedWorkouts: Workout[] = [];
  displayedColumns: string[] = ['userName', 'workoutType', 'minutes', 'date'];
  workoutTypes = ['Running', 'Yoga', 'Weight Training', 'Swimming', 'Cycling'];
  
  searchTerm = '';
  selectedType = '';
  pageSize = 5;
  currentPage = 0;

  constructor(private workoutService: WorkoutDataService) {}

  ngOnInit(): void {
    this.workoutService.getWorkouts().subscribe(workouts => {
      this.workouts = workouts;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredWorkouts = this.workouts.filter(workout => {
      const nameMatch = workout.userName.toLowerCase().includes(this.searchTerm.toLowerCase());
      const typeMatch = !this.selectedType || workout.workoutType === this.selectedType;
      return nameMatch && typeMatch;
    });
    this.updatePaginatedWorkouts();
  }

  updatePaginatedWorkouts(): void {
    const startIndex = this.currentPage * this.pageSize;
    this.paginatedWorkouts = this.filteredWorkouts.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedWorkouts();
  }
}
