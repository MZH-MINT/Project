import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addEmployee, getAllEmployees } from '../service/empservice';

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
      const employees = await getAllEmployees();
      const emailExists = employees.some((emp: { email: string; }) => emp.email === email);

      if (emailExists) {
        alert('An employee with this email already exists.');
        return;
      }

      const newEmp = { firstName, lastName, email, position };
      await addEmployee(newEmp);
      onEmployeeAdded();
      navigate('/');
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
          select
          label="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          fullWidth
          margin="normal"
          required
        >
          {['Trainee', 'SWE1', 'SWE2', 'SWE3', 'SDM', 'PM'].map((pos) => (
            <MenuItem key={pos} value={pos}>
              {pos}
            </MenuItem>
          ))}
        </TextField>

        <Button type="submit" variant="contained" color="primary" fullWidth className="mt-4">
          Add Employee
        </Button>
      </form>
    </Paper>
  );
};

export default AddEmployee;
