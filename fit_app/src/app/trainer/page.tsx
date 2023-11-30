'use client'
import React, { useEffect, useState } from 'react';
import TrainerNavbar from '../components/trainernavbar';
import { Box } from '@mui/material';
import WorkoutList from '../components/WorkoutList';
import './trainer.css';
import '../login/login.css';


const Trainer: React.FC = () => {
	const [jwtToken, setJwtToken] = useState<string | null>(null);
	const [shouldRefetch, setShouldRefresh] = useState<boolean>(false);
	const [triggerWorkoutListRefetch, setTriggerWorkoutListRefetch] = useState<boolean>(false);

	useEffect(() => {
		const token = localStorage.getItem('jwtToken');
		setJwtToken(token);
	}, []);

	const handleRefetch = () => {
		setShouldRefresh(true);
	}

	useEffect(() => {
		if (shouldRefetch) {
			setTriggerWorkoutListRefetch(!triggerWorkoutListRefetch);
			setShouldRefresh(false);
		}
	}, [shouldRefetch]);

	return (
		<div className='container'>
			<div>
				<TrainerNavbar jwtToken={jwtToken} triggerRefresh={handleRefetch} />
				<Box display="flex" justifyContent="center" alignItems="center" height="1vh">
				</Box>
			</div>
			<WorkoutList jwtToken={jwtToken} shouldTriggerRefetch={triggerWorkoutListRefetch} />
		</div>
	);
};

export default Trainer;
