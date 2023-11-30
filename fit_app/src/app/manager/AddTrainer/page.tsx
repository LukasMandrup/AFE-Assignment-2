'use client'
import User from "@/app/types/user";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import React from "react";
import { ChangeEvent } from "react";

const AddTrainerPage: React.FC = () => {
	const [formData, setFormData] = React.useState<User>({
		userId: 0,
		personalTrainerId: 0,
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		accountType: 'PersonalTrainer',
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async () => {
		const dataToSend = {
			...formData,
			userId: 0,
			personaltrainerId: 0,
		};

		const jwtToken = localStorage.getItem('jwtToken');
		if (jwtToken === null) {
			return;
		}
		await fetch('https://afefitness2023.azurewebsites.net/api/Users', {
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

	const onRequestClose = () => {
		window.location.href = "/manager";
	}

	return (
		<div>
			<DialogTitle>Add Trainer</DialogTitle>
			<DialogContent>
				<TextField
					label="First Name"
					name="firstName"
					value={formData.firstName}
					fullWidth
					margin="normal"
					onChange={handleChange}
				/>
				<TextField
					label="Last Name"
					name="lastName"
					value={formData.lastName}
					fullWidth
					margin="normal"
					onChange={handleChange}
				/>
				<TextField
					label="Email"
					name="email"
					value={formData.email}
					fullWidth
					margin="normal"
					onChange={handleChange}
				/>
				<TextField
					label="Password"
					name="password"
					value={formData.password}
					fullWidth
					margin="normal"
					onChange={handleChange}
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
		</div>
	)
};

export default AddTrainerPage;
