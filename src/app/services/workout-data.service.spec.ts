import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { WorkoutDataService } from './workout-data.service';
import { firstValueFrom } from 'rxjs';

describe('WorkoutDataService', () => {
  let service: WorkoutDataService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [WorkoutDataService]
    });
    service = TestBed.inject(WorkoutDataService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load default data when localStorage is empty', fakeAsync(async () => {
    const users = await firstValueFrom(service.getUsers());
    expect(users.length).toBe(3);
    expect(users[0].name).toBe('John Doe');
  }));

  it('should load data from localStorage when available', fakeAsync(async () => {
    localStorage.clear();
    const mockData = [{
      id: 1,
      name: 'Test User',
      workouts: [{ type: 'Running', minutes: 30 }]
    }];
    localStorage.setItem('userData', JSON.stringify(mockData));
    
    TestBed.resetTestingModule();
    const newService = TestBed.inject(WorkoutDataService);
    
    const users = await firstValueFrom(newService.getUsers());
    expect(users.length).toBe(1);
    expect(users[0]).toEqual(mockData[0]);
  }));

  it('should add workout to existing user', fakeAsync(async () => {
    service.addWorkout('John Doe', 'Running', 30);
    const users = await firstValueFrom(service.getUsers());
    const user = users.find(u => u.name === 'John Doe');
    expect(user?.workouts.some(w => w.type === 'Running' && w.minutes === 30)).toBeTrue();
  }));

  it('should create new user when adding workout for non-existing user', () => {
    service.addWorkout('New User', 'Yoga', 45);
    
    service.getUsers().subscribe(users => {
      const user = users.find(u => u.name === 'New User');
      expect(user).toBeTruthy();
      expect(user?.workouts[0]).toEqual({ type: 'Yoga', minutes: 45 });
    });
  });

  it('should delete user successfully', fakeAsync(async () => {
    // Add test user
    service.addWorkout('Test User', 'Running', 30);
    tick();

    // Get users and find test user
    const users = await firstValueFrom(service.getUsers());
    const testUser = users.find(u => u.name === 'Test User');
    expect(testUser).toBeTruthy();

    // Delete user
    if (testUser) {
      service.deleteUser(testUser.id);
      tick();

      // Verify deletion
      const updatedUsers = await firstValueFrom(service.getUsers());
      expect(updatedUsers.find(u => u.name === 'Test User')).toBeFalsy();
    }
  }));
});

