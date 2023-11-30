// components/TrainerNavbar.tsx
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import ClientForm from './clientform';
import { Button } from '@mui/material';
import User from '../types/user';
import ProgramForm from './programform';
import Image from 'next/image';

interface ClientListProps {
	jwtToken: string;
}

const TrainerNavbar: React.FC<ClientListProps> = ({ jwtToken }) => {
	const [isToolboxVisible, setToolboxVisibility] = useState(false);
	const [clients, setClients] = useState<User[]>([]);
	const [isFormVisible, setFormVisibility] = useState(false);
	const [isWorkoutFormVisible, setWorkoutFormVisibility] = useState(false);
	const [selectedClient, setSelectedClient] = useState<User | null>(null);

	const handleToggleToolbox = () => {
		setToolboxVisibility(!isToolboxVisible);
	};

	const fetchClients = useCallback(() => {
		if (jwtToken !== null) {
			fetch('https://afefitness2023.azurewebsites.net/api/Users/Clients', {
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
				.then((data: User[]) => setClients(data))
				.catch((error) => console.error('Error fetching clients:', error.message));
		}
	}, [jwtToken]);

	useEffect(() => {
		fetchClients();
	}, [jwtToken, fetchClients]);

	const handlePlusButtonClick = () => {
		setFormVisibility(true);
	};

	const closeForm = () => {
		setFormVisibility(false);
		fetchClients();
	};

	const handleWorkoutButtonClick = (client: User) => {
		setSelectedClient(client);
		setWorkoutFormVisibility(true);
	};

	const closeWorkoutForm = () => {
		setWorkoutFormVisibility(false);
	};

	const handleLogout = () => {
		window.location.href = "/login";
	};

	return (
		<nav className="navbar">
			{/* ... (rest of the code remains unchanged) */}
		</nav>
	);
};

export default TrainerNavbar;
