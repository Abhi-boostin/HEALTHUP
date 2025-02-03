import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { WorkoutDataService } from '../../services/workout-data.service';

@Component({
  selector: 'app-workout-chart',
  standalone: true,
  imports: [CommonModule, ChartModule],
  template: `
    <div class="bg-white rounded-lg shadow p-6 mt-6">
      <h2 class="text-2xl font-bold mb-4">Workout Statistics</h2>
      <div style="height: 400px;">
        <canvas baseChart
          [data]="barChartData"
          [options]="barChartOptions"
          [type]="'bar'">
        </canvas>
      </div>
    </div>
  `
})
export class WorkoutChartComponent implements OnInit {
  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total Minutes'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  };

  barChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: []
  };

  constructor(private workoutService: WorkoutDataService) {}

  ngOnInit(): void {
    this.workoutService.getUsers().subscribe(users => {
      this.updateChartData(users);
    });
  }

  private updateChartData(users: any[]): void {
    const workoutTypes = ['Running', 'Cycling', 'Swimming', 'Yoga', 'Weight Training'];
    const datasets = users.map(user => ({
      data: workoutTypes.map(type => 
        user.workouts
          .filter(w => w.type === type)
          .reduce((sum, w) => sum + w.minutes, 0)
      ),
      label: user.name
    }));

    this.barChartData = {
      labels: workoutTypes,
      datasets
    };
  }
}