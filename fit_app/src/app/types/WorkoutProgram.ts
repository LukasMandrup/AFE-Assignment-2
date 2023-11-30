import Exercise from "./Exercise";

interface WorkoutProgram {
	workoutProgramId: number;
	name: string;
	description: string;
	exercises: Exercise[];
	personalTrainerId: number;
	clientId: number;
	color: string; // Add the color property
  }
  
  export default WorkoutProgram;