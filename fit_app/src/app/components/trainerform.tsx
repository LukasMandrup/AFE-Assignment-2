// components/clientForm.tsx

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import jwt from 'jsonwebtoken';
import User from '../types/user';

interface TrainerFormProps {
	isOpen: boolean;
	onRequestClose: () => void;
}

const TrainerForm: React.FC<TrainerFormProps> = ({ isOpen, onRequestClose }) => {
	let formData: User = ({
		userId: 0,
		personalTrainerId: 0,
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		accountType: 'PersonalTrainer',
	});

	const handleSubmit = () => {
		const dataToSend = {
			...formData,
			userId: 0,
			personaltrainerId: 0,
		};

		const jwtToken = localStorage.getItem('jwtToken');
		if (jwtToken === null) {
			return;
		}
		fetch('https://afefitness2023.azurewebsites.net/api/Users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${jwtToken}`,
			},
			body: JSON.stringify(dataToSend),
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

		onRequestClose();
	};

	return (
		<Dialog open={isOpen} onClose={onRequestClose}>
			<DialogTitle>Add Trainer</DialogTitle>
			<DialogContent>
				<TextField
					label="First Name"
					name="firstName"
					value={formData.firstName}
					fullWidth
					margin="normal"
				/>
				<TextField
					label="Last Name"
					name="lastName"
					value={formData.lastName}
					fullWidth
					margin="normal"
				/>
				<TextField
					label="Email"
					name="email"
					value={formData.email}
					fullWidth
					margin="normal"
				/>
				<TextField
					label="Password"
					name="password"
					value={formData.password}
					fullWidth
					margin="normal"
				/>
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

export default TrainerForm;
