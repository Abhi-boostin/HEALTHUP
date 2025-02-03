import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutFormComponent } from './workout-form.component';
import { WorkoutDataService } from '../../services/workout-data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('WorkoutFormComponent', () => {
  let component: WorkoutFormComponent;
  let fixture: ComponentFixture<WorkoutFormComponent>;
  let workoutService: jasmine.SpyObj<WorkoutDataService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('WorkoutDataService', ['addWorkout']);
    
    await TestBed.configureTestingModule({
      imports: [
        WorkoutFormComponent,
        BrowserAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule
      ],
      providers: [
        { provide: WorkoutDataService, useValue: spy },
        provideAnimations()
      ]
    }).compileComponents();

    workoutService = TestBed.inject(WorkoutDataService) as jasmine.SpyObj<WorkoutDataService>;
    fixture = TestBed.createComponent(WorkoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.userName).toBe('');
    expect(component.workoutType).toBe('');
    expect(component.minutes).toBe(0);
  });

  it('should have predefined workout types', () => {
    expect(component.workoutTypes).toContain('Running');
    expect(component.workoutTypes).toContain('Cycling');
    expect(component.workoutTypes.length).toBe(5);
  });

  it('should call addWorkout service method on form submit', () => {
    component.userName = 'Test User';
    component.workoutType = 'Running';
    component.minutes = 30;

    component.onSubmit();

    expect(workoutService.addWorkout).toHaveBeenCalledWith('Test User', 'Running', 30);
  });

  it('should reset form after submission', () => {
    component.userName = 'Test User';
    component.workoutType = 'Running';
    component.minutes = 30;

    component.onSubmit();

    expect(component.userName).toBe('');
    expect(component.workoutType).toBe('');
    expect(component.minutes).toBe(0);
  });
});
