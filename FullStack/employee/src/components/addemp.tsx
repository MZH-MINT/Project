import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addEmployee } from '../service/empservice';

interface AddEmployeeProps {
  onEmployeeAdded: () => void;
}

const AddEmployee: React.FC<AddEmployeeProps> = ({ onEmployeeAdded }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newEmp = { firstName, lastName, email, position };
      await addEmployee(newEmp);
      onEmployeeAdded();       // ✅ Call parent to refresh list
      navigate('/');           // ✅ Navigate back to list
    } catch (error) {
      console.error('Failed to add employee:', error);
      alert('Error adding employee. Please try again.');
    }
  };

  return (
    <Paper elevation={3} className="max-w-xl mx-auto mt-10 p-6">
      <Typography variant="h5" gutterBottom align="center">
        Add New Employee
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          fullWidth
          margin="normal"
          required
        />

        <Button type="submit" variant="contained" color="primary" fullWidth className="mt-4">
          Add Employee
        </Button>
      </form>
    </Paper>
  );
};

export default AddEmployee;
