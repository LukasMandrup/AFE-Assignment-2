'use client'
import React, { useEffect, useState } from 'react';
import TrainerNavbar from '../components/trainernavbar';
import { Box } from '@mui/material';
import WorkoutList from '../components/WorkoutList';
import './trainer.css';
import '../login/login.css';


const Trainer: React.FC = () => {
	const [jwtToken, setJwtToken] = useState<string | null>(null);

	useEffect(() => {
		const token = localStorage.getItem('jwtToken');
		setJwtToken(token);
	}, []);

	return (
		<div className = 'container'>
			<div>
				<TrainerNavbar jwtToken={jwtToken} />
				<Box display="flex" justifyContent="center" alignItems="center" height="1vh">
				</Box>
			</div>
			<WorkoutList jwtToken={jwtToken} />
		</div>
	);
};

export default Trainer;
