import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, InputLabel, FormControl, ListItemText, } from '@mui/material';
import User from '../types/user';
import WorkoutProgram from '../types/WorkoutProgram';

interface ProgramFormProps {
	allExercises: Exercise[];
	isOpen: boolean;
	onRequestClose: () => void;
	client: User | null;
	jwtToken: string|null;

}

const ProgramForm: React.FC<ProgramFormProps> = ({ allExercises, isOpen, onRequestClose, client, jwtToken }) => {
	const [formData, setFormData] = useState<WorkoutProgram>({
		workoutProgramId: 0,
		name: '',
		description: '',
		exercises: [],
		personalTrainerId: 0,
		clientId: client?.userId || 0,
		color: '#ffffff'
	});

	useEffect(() => {
		setFormData((prevData) => ({ ...prevData, clientid: client?.userId || '' }));
	}, [client]);

	const handleChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name as string]: value }));
	};

	const handleSubmit = () => {
		fetch('https://afefitness2023.azurewebsites.net/api/WorkoutPrograms', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${jwtToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Network response was not ok. Status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				console.log('Form submitted successfully:', data);
				onRequestClose();
			})
			.catch((error) => {
				console.error('Error submitting the form:', error.message);
			});
	};

	return (
		<Dialog open={isOpen} onClose={onRequestClose}>
			<DialogTitle>Add Program</DialogTitle>
			<DialogContent>
				<TextField label="Program Name" name="name" value={formData.name} onChange={handleChange} fullWidth margin="normal" />
				<TextField
					label="Description"
					name="description"
					value={formData.description}
					onChange={handleChange}
					fullWidth
					margin="normal"
				/>
				<FormControl fullWidth margin="normal">
					<InputLabel id="exercises-label">Exercises</InputLabel>
					<Select
						labelId="exercises-label"
						id="exercises"
						name="exercises"
						multiple
						value={formData.exercises}
						// onChange={handleChange} // TODO: Implement correctly
						renderValue={(selected) => (selected as []).join(', ')}
					>
						{allExercises.map((exercise) => (
							<MenuItem key={exercise.name} value={exercise.name}>
								<ListItemText primary={exercise.name} />
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button onClick={onRequestClose} style={{ backgroundColor: 'red', color: 'white' }}>
					Cancel
				</Button>
				<Button onClick={handleSubmit} style={{ backgroundColor: 'green', color: 'white' }}>
					Add
				</Button>
			</DialogActions>
		</Dialog>
	);

	async function getServerSideProps() {
		try {
			const exercisesResponse = await fetch('https://afefitness2023.azurewebsites.net/api/Exercises', {
				headers: {
					Authorization: `Bearer ${jwtToken}`,
					'Content-Type': 'application/json',
				},
			});

			if (!exercisesResponse.ok) {
				throw new Error(`Network response was not ok. Status: ${exercisesResponse.status}`);
			}

			const exercisesData = await exercisesResponse.json();
			const exerciseNames = exercisesData.map((exercise: any) => exercise.name);

			return {
				props: {
					allExercises: exerciseNames,
				},
			};
		} catch (error) {
			console.error('Error fetching exercises:', error);

			return {
				props: {
					allExercises: [],
				},
			};
		}
	}
};



export default ProgramForm;
