// components/clientForm.tsx

import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import jwt from 'jsonwebtoken';
import User from '../types/user';

interface ClientFormProps {
  isOpen: boolean;
  onRequestClose: () => void;
  jwtToken: string;
}

const ClientForm: React.FC<ClientFormProps> = ({ isOpen, onRequestClose, jwtToken }) => {
  const [formData, setFormData] = useState<User>({
    userId:0,
    personalTrainerId:0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    accountType: 'Client',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Handle userId and personalTrainerId separately
    if (name === 'accountType' && value !== 'PersonalTrainer') {
      setFormData((prevData) => ({ ...prevData, personalTrainerId: 0 }));
    }

    // Handle other form fields
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    var tokendecoded = jwt.decode(jwtToken);
    const dataToSend = {
      ...formData,
      userId: 0,
      personaltrainerId: tokendecoded.UserId,
    };
    console.log(tokendecoded)
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
      <DialogTitle>Add Client</DialogTitle>
      <DialogContent>
        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
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

export default ClientForm;
