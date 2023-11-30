import { useState, useEffect } from 'react';
import WorkoutProgram from '../types/WorkoutProgram';
import '../trainer/trainer.css';

interface ClientWorkoutListProps {
	jwtToken: string | null;
}
interface WorkoutProgramWithColor extends WorkoutProgram {
	color: string;
  }

const ClientWorkoutList: React.FC<ClientWorkoutListProps> = ({ jwtToken }) => {
	const [workoutPrograms, setWorkoutPrograms] = useState<WorkoutProgramWithColor[]>([]);
	const [selectedWorkoutProgramId, setSelectedWorkoutProgramId] = useState<number | null>(null);
	const [selectedWorkoutProgramDetails, setSelectedWorkoutProgramDetails] = useState<WorkoutProgram | null>(null);
	const [clientNames, setClientNames] = useState<{ [key: number]: string }>({});

	const getRandomColor = () => {
		const letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	};

	useEffect(() => {
		if (jwtToken !== null) {
		  fetch('https://afefitness2023.azurewebsites.net/api/WorkoutPrograms', {
			headers: {
			  Authorization: `Bearer ${jwtToken}`,
			  'Content-Type': 'application/json',
			},
		  })
			.then((response) => {
			  if (!response.ok) {
				throw new Error(`Network response was not ok. Status: ${response.status}`);
			  }
			  return response.json();
			})
			.then((data: WorkoutProgram[]) => {
			  const programsWithRandomColors = data.map((program) => ({
				...(program as WorkoutProgramWithColor),
				color: getRandomColor(),
			  }));
			  setWorkoutPrograms(programsWithRandomColors);
			})
			.catch((error) => console.error('Error fetching workout programs:', error.message));
		}
	  }, [jwtToken]);

	useEffect(() => {
		const fetchClientName = async (clientId: number) => {
			try {
				const response = await fetch(`https://afefitness2023.azurewebsites.net/api/Users/${clientId}`, {
					headers: {
						Authorization: `Bearer ${jwtToken}`,
						'Content-Type': 'application/json',
					},
				});

				if (response.status === 404) {
					setClientNames((prevClientNames) => ({
						...prevClientNames,
						[clientId]: `No client with ID ${clientId}, it might have been deleted.`,
					}));
					return;
				}

				if (!response.ok) {
					throw new Error(`Network response was not ok. Status: ${response.status}`);
				}

				const clientData = await response.json();

				setClientNames((prevClientNames) => ({
					...prevClientNames,
					[clientId]: `${clientData.firstName} ${clientData.lastName}`,
				}));
			} catch (error) {
				console.error('Error fetching client name:', (error as Error).message);
			}
		};

		workoutPrograms.forEach((program) => {
			if (program.clientId && !clientNames[program.clientId]) {
				fetchClientName(program.clientId);
			}
		});
	}, [workoutPrograms, clientNames, jwtToken]);

	useEffect(() => {
		const foundProgram = workoutPrograms.find((item) => item.workoutProgramId === selectedWorkoutProgramId);
		setSelectedWorkoutProgramDetails(foundProgram || null);
	}, [selectedWorkoutProgramId, workoutPrograms]);

	const handleBoxClick = (programId: number) => {
		if (selectedWorkoutProgramId === programId) {
			setSelectedWorkoutProgramId(null);
		} else {
			setSelectedWorkoutProgramId(programId);
			let foundProgram = workoutPrograms.find((item) => item.workoutProgramId === programId);
			setSelectedWorkoutProgramDetails(foundProgram || null);
		}
	};

	const handleLogout = () => {
		window.location.href = "/login";
	};




	return (
		<div>
			{workoutPrograms.map((program) => (
				<div
					key={program.workoutProgramId}
					onClick={() => handleBoxClick(program.workoutProgramId)}
					className={`client-box ${selectedWorkoutProgramId === program.workoutProgramId ? 'selected' : ''}`}
					style={{
						backgroundColor: program.color,
						backgroundImage: `linear-gradient(to bottom right, ${program.color}, white 90%)`,
					}}
				>
					<div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
						<div >
						<h1>{`${program.name}`}</h1>
							<p>Description: {program.description}</p>
							<p>Amount of Exercises: {program.exercises?.length}</p>
							<p>Client: {program.clientId ? (clientNames[program.clientId] || 'Loading...') : 'No client affiliated with program'}</p>

							{selectedWorkoutProgramId === program.workoutProgramId && (
								<div>
									{(selectedWorkoutProgramDetails?.exercises && selectedWorkoutProgramDetails.exercises.length !== 0) && (
										<h2 className="mt-3">Exercises:</h2>
									)}
									{selectedWorkoutProgramDetails?.exercises?.map((exercise, index) => (
										<div key={index} className="mb-3">
											<h3>{`${exercise.name ? (exercise.name) : "!Exercise has no name!"}`}</h3>
											<p>Description: {exercise.description}</p>
											<p>Reps/Time: {exercise.repetitions ? (exercise.repetitions) : exercise.time}</p>
											<p>Sets: {exercise.sets}</p>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			))}
		</div>
	);

}
export default ClientWorkoutList;