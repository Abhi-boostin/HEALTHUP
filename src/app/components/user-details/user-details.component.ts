import { Component, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Chart } from 'chart.js/auto';
import { UserWorkout } from '../../models/workout.model';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <div class="p-6 max-w-2xl">
      <h2 class="text-3xl font-bold mb-6">{{data.user.name}}'s workout progress</h2>
      
      <div class="bg-white rounded-lg p-4">
        <canvas #workoutChart></canvas>
      </div>

      <div class="mt-6 flex justify-end">
        <button mat-button mat-dialog-close 
                class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
          Close
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      background: #f9fafb;
    }
  `]
})
export class UserDetailsComponent implements AfterViewInit {
  @ViewChild('workoutChart') chartCanvas!: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<UserDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: UserWorkout }
  ) {}

  ngAfterViewInit() {
    this.createChart();
  }

  private createChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    const workoutData = this.prepareChartData();

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: workoutData.labels,
        datasets: [{
          label: 'Minutes',
          data: workoutData.data,
          backgroundColor: 'rgb(147, 197, 253)',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: '#e5e7eb'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }

  private prepareChartData() {
    const workouts = this.data.user.workouts;
    const workoutTypes = [...new Set(workouts.map(w => w.type))];
    const minutes = workoutTypes.map(type => 
      workouts
        .filter(w => w.type === type)
        .reduce((sum, w) => sum + w.minutes, 0)
    );

    return {
      labels: workoutTypes,
      data: minutes
    };
  }
} 