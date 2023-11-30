'use client'
import React, { useEffect, useState } from 'react';
import ClientNavbar from '../components/clientnavbar';
import { Box } from '@mui/material';
import ClientWorkoutList from '../components/ClientWorkoutList';

const Trainer: React.FC = () => {
	const [jwtToken, setJwtToken] = useState<string | null>(null);

	useEffect(() => {
		const token = localStorage.getItem('jwtToken');
		setJwtToken(token);
	}, []);

	return (
		<div>
			<div>
				<ClientNavbar/>
				<Box display="flex" justifyContent="center" alignItems="center" height="1vh">
				</Box>
			</div>
			<ClientWorkoutList jwtToken={jwtToken} />
		</div>
	);
};

export default Trainer;
