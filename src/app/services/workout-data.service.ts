import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserWorkout } from '../models/workout.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WorkoutDataService {
  private users = new BehaviorSubject<UserWorkout[]>([]);
  private isBrowser: boolean;
  
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.loadInitialData();
  }

  private loadInitialData(): void {
    if (!this.isBrowser) {
      this.users.next([]);
      return;
    }

    const savedData = localStorage.getItem('userData');
    if (savedData) {
      this.users.next(JSON.parse(savedData));
    } else {
      const defaultUsers: UserWorkout[] = [
        {
          id: 1,
          name: 'John Doe',
          workouts: [
            { type: 'Running', minutes: 30 },
            { type: 'Cycling', minutes: 45 }
          ]
        },
        {
          id: 2,
          name: 'Jane Smith',
          workouts: [
            { type: 'Swimming', minutes: 60 },
            { type: 'Running', minutes: 20 }
          ]
        },
        {
          id: 3,
          name: 'Mike Johnson',
          workouts: [
            { type: 'Yoga', minutes: 50 },
            { type: 'Cycling', minutes: 40 }
          ]
        }
      ];
      this.users.next(defaultUsers);
      this.saveToLocalStorage();
    }
  }

  private saveToLocalStorage(): void {
    if (this.isBrowser) {
      localStorage.setItem('userData', JSON.stringify(this.users.value));
    }
  }

  getUsers(): Observable<UserWorkout[]> {
    return this.users.asObservable();
  }

  addWorkout(name: string, workoutType: string, minutes: number): void {
    const currentUsers = this.users.value;
    const existingUser = currentUsers.find(user => user.name === name);

    if (existingUser) {
      existingUser.workouts.push({ type: workoutType, minutes });
    } else {
      const newUser: UserWorkout = {
        id: Date.now(),
        name,
        workouts: [{ type: workoutType, minutes }]
      };
      currentUsers.push(newUser);
    }

    this.users.next(currentUsers);
    this.saveToLocalStorage();
  }

  deleteUser(userId: number): void {
    const currentUsers = this.users.value.filter(user => user.id !== userId);
    this.users.next(currentUsers);
    this.saveToLocalStorage();
  }
}
