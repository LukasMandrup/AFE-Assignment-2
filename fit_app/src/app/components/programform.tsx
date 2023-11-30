import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, InputLabel, FormControl, ListItemText, } from '@mui/material';
import User from '../types/user';
import WorkoutProgram from '../types/WorkoutProgram';

interface ProgramFormProps {
	isOpen: boolean;
	onRequestClose: () => void;
	client: User | null;
	jwtToken: string|null;

}

const ProgramForm: React.FC<ProgramFormProps> = ({ isOpen, onRequestClose, client, jwtToken }) => {
	const [formData, setFormData] = useState<WorkoutProgram>({
		workoutProgramId: 0,
		name: '',
		description: '',
		exercises: [],
		personalTrainerId: 0,
		clientId: client?.userId || 0,
		color: '#ffffff'
	});

	const [allExercises, setAllExercises] = useState<string[]>([]);

	useEffect(() => {
		setFormData((prevData) => ({ ...prevData, clientid: client?.userId || '' }));
	}, [client]);

	useEffect(() => {
		fetch('https://afefitness2023.azurewebsites.net/api/Exercises', {
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
			.then((data) => {
				const exerciseNames = data.map((exercise: any) => exercise.name);
				setAllExercises(exerciseNames);
			})
			.catch((error) => {
				console.error('Error fetching exercises:', error.message);
			});
	}, [jwtToken]);

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
							<MenuItem key={exercise} value={exercise}>
								<ListItemText primary={exercise} />
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
};

export default ProgramForm;
