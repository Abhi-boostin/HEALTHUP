export interface WorkoutEntry {
  type: string;
  minutes: number;
}

export interface UserWorkout {
  id: number;
  name: string;
  workouts: WorkoutEntry[];
} 