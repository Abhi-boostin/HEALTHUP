import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { WorkoutDataService } from './services/workout-data.service';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

describe('AppComponent', () => {
  let workoutServiceSpy: jasmine.SpyObj<WorkoutDataService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    workoutServiceSpy = jasmine.createSpyObj('WorkoutDataService', ['getUsers', 'deleteUser', 'addWorkout']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    workoutServiceSpy.getUsers.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        WorkoutListComponent,
        WorkoutFormComponent,
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        MatDialogModule,
        MatIconModule,
        MatButtonModule,
        ConfirmDialogComponent,
        UserDetailsComponent
      ],
      providers: [
        { provide: WorkoutDataService, useValue: workoutServiceSpy },
        { provide: MatDialog, useValue: dialogSpy }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the workout list component', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const workoutList = compiled.querySelector('app-workout-list');
    expect(workoutList).toBeTruthy('Workout list component should be rendered');
  });
});
