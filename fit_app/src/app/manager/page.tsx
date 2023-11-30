import React, { useEffect } from 'react';
import ManagerNavbar from '../components/managernavbar';
import { Button, Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import TrainerForm from '../components/trainerform';
import { JwtPayload } from 'jsonwebtoken';
import User from '../types/user';
import Link from 'next/link';

const UserForm: React.FC = () => {
	let isTrainerFormVisible = false;

	const handleOpenTrainerForm = () => {
		isTrainerFormVisible = true;
	};

	const handleCloseTrainerForm = () => {
		isTrainerFormVisible = false;
	};
	const handleLogout = () => {
		window.location.href = "/login";
	};

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
			})
			.catch((error) => {
				console.error('Error submitting the form:', error.message);
			});
	};

	return (
		<div>
			<ManagerNavbar />
			<Box display="flex" justifyContent="center" alignItems="center" height="100vh">
				<Link href="/manager/AddTrainer">
					Add Trainer
				</Link>
			</Box>
		</div>
	);
};

export default UserForm;
