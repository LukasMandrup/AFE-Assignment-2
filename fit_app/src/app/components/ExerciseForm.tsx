import React, { useState, ChangeEvent } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import Exercise from '../types/Exercise';

interface ExerciseFormProps {
  onClose: () => void;
  onAddExercise: (exercise: Exercise) => void;
}

const ExerciseForm: React.FC<ExerciseFormProps> = ({ onClose, onAddExercise }) => {
  const [exerciseData, setExerciseData] = useState<Exercise>({
    name: '',
    description: '',
    sets: null,
    time: null,
    repetitions: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setExerciseData((prevData) => ({
      ...prevData,
      [name]: value === '' ? null : value,
    }));

    if (name === 'repetitions') {
      setExerciseData((prevData) => ({
        ...prevData,
        time: null,
      }));
    }

    if (name === 'time') {
      setExerciseData((prevData) => ({
        ...prevData,
        repetitions: null,
      }));
    }
  };

  const handleAddExercise = (e: React.MouseEvent) => {
    // Prevent the click event from propagating to the parent elements
    e.stopPropagation();

    onAddExercise({
      ...exerciseData,
    });

    // Reset the form and close the dialog
    setExerciseData({
      name: '',
      description: '',
      sets: null,
      time: null,
      repetitions: null,
    });
    onClose();
  };

  const handleFormClick = (e: React.MouseEvent) => {
    // Prevent the click event from propagating to the parent elements
    e.stopPropagation();
  };

  return (
    <Dialog open={true} onClose={onClose} onClick={handleFormClick}>
      <DialogTitle>Add Exercise</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={exerciseData.name || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={exerciseData.description || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Sets"
          name="sets"
          value={exerciseData.sets || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
        />
        <TextField
          label="Time"
          name="time"
          value={exerciseData.time || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="text"
        />
        <TextField
          label="Repetitions"
          name="repetitions"
          value={exerciseData.repetitions || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{ backgroundColor: 'red', color: 'white' }}>
          Cancel
        </Button>
        <Button onClick={handleAddExercise} style={{ backgroundColor: 'green', color: 'white' }}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExerciseForm;
