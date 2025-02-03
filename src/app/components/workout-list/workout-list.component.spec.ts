import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutListComponent } from './workout-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material/dialog';
import { WorkoutDataService } from '../../services/workout-data.service';
import { of } from 'rxjs';

describe('WorkoutListComponent', () => {
  let component: WorkoutListComponent;
  let fixture: ComponentFixture<WorkoutListComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let workoutServiceSpy: jasmine.SpyObj<WorkoutDataService>;

  beforeEach(async () => {
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    workoutServiceSpy = jasmine.createSpyObj('WorkoutDataService', ['getUsers', 'deleteUser']);
    workoutServiceSpy.getUsers.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [
        WorkoutListComponent,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialog, useValue: dialogSpy },
        { provide: WorkoutDataService, useValue: workoutServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
