import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { WorkoutDataService } from '../../services/workout-data.service';
import { UserWorkout } from '../../models/workout.model';
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

      <table mat-table [dataSource]="paginatedUsers" class="w-full">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>User Name</th>
          <td mat-cell *matCellDef="let user">{{user.name}}</td>
        </ng-container>

        <ng-container matColumnDef="workouts">
          <th mat-header-cell *matHeaderCellDef>Workouts</th>
          <td mat-cell *matCellDef="let user">
            <div *ngFor="let workout of user.workouts">
              {{workout.type}}: {{workout.minutes}} minutes
            </div>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>

      <mat-paginator
        [length]="filteredUsers.length"
        [pageSize]="pageSize"
        [pageSizeOptions]="[5, 10, 25]"
        (page)="onPageChange($event)">
      </mat-paginator>
    </div>
  `
})
export class WorkoutListComponent implements OnInit {
  users: UserWorkout[] = [];
  filteredUsers: UserWorkout[] = [];
  paginatedUsers: UserWorkout[] = [];
  displayedColumns: string[] = ['name', 'workouts'];
  workoutTypes = ['Running', 'Yoga', 'Weight Training', 'Swimming', 'Cycling'];
  
  searchTerm = '';
  selectedType = '';
  pageSize = 5;
  currentPage = 0;

  constructor(private workoutService: WorkoutDataService) {}

  ngOnInit(): void {
    this.workoutService.getUsers().subscribe(users => {
      this.users = users;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredUsers = this.users.filter(user => {
      const nameMatch = user.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const typeMatch = !this.selectedType || 
        user.workouts.some(w => w.type === this.selectedType);
      return nameMatch && typeMatch;
    });
    this.updatePaginatedUsers();
  }

  updatePaginatedUsers(): void {
    const startIndex = this.currentPage * this.pageSize;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedUsers();
  }
}
