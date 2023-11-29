import Exercise from "./Exercise";

interface WorkoutProgram {
    color: BackgroundColor | undefined;
    workoutProgramId: number;
    name: string | null;
    description: string | null;
    exercises: Array<Exercise> | null;
    personalTrainerId: number;
    clientId: number | null;
  }
  
  export default WorkoutProgram;