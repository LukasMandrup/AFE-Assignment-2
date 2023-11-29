'use client'
import React, { useEffect, useState } from 'react';
import ManagerNavbar from '../components/managernavbar';
import { Button, Box } from '@mui/material';
import TrainerForm from '../components/trainerform';

const UserForm: React.FC = () => {
  const [isTrainerFormVisible, setTrainerFormVisibility] = useState(false);
  const [jwtToken, setJwtToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    setJwtToken(token);
  }, []);

  const handleOpenTrainerForm = () => {
    setTrainerFormVisibility(true);
  };

  const handleCloseTrainerForm = () => {
    setTrainerFormVisibility(false);
  };
  const handleLogout = () => {
    window.location.href = "/login";
  };

  return (
    <div>
      <ManagerNavbar />
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Button
          onClick={handleOpenTrainerForm}
          size="large"
          style={{ backgroundColor: '#1b4027', color: 'white' }}
        >
          Click here to add a Trainer🏋️🏋️
        </Button>
      </Box>
      <TrainerForm isOpen={isTrainerFormVisible} onRequestClose={handleCloseTrainerForm} jwtToken={jwtToken} />
    </div>
  );
};

export default UserForm;
