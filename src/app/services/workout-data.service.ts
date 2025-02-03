import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Workout } from '../models/workout.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutDataService {
  private workouts = new BehaviorSubject<Workout[]>([]);
  
  constructor() {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    const savedData = localStorage.getItem('workouts');
    if (savedData) {
      this.workouts.next(JSON.parse(savedData));
    } else {
      // Load default data
      const defaultWorkouts: Workout[] = [
        {
          id: '1',
          userName: 'John Doe',
          workoutType: 'Running',
          minutes: 30,
          date: new Date('2024-03-10')
        },
        {
          id: '2',
          userName: 'Jane Smith',
          workoutType: 'Yoga',
          minutes: 45,
          date: new Date('2024-03-11')
        },
        {
          id: '3',
          userName: 'Mike Johnson',
          workoutType: 'Weight Training',
          minutes: 60,
          date: new Date('2024-03-12')
        }
      ];
      this.workouts.next(defaultWorkouts);
      this.saveToLocalStorage();
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('workouts', JSON.stringify(this.workouts.value));
  }

  getWorkouts(): Observable<Workout[]> {
    return this.workouts.asObservable();
  }

  addWorkout(workout: Omit<Workout, 'id'>): void {
    const newWorkout = {
      ...workout,
      id: Date.now().toString(),
    };
    this.workouts.next([...this.workouts.value, newWorkout]);
    this.saveToLocalStorage();
  }
}
