import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Typography, MenuItem } from '@mui/material';
import { getEmployeeById, updateEmployee, getAllEmployees } from '../service/empservice';

interface UpdateEmployeeProps {
  onEmployeeUpdated: () => void;
}

const UpdateEmployee: React.FC<UpdateEmployeeProps> = ({ onEmployeeUpdated }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: ''
  });

  useEffect(() => {
    if (id) {
      getEmployeeById(Number(id)).then(data => setEmployee(data));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setEmployee(prev => ({
      ...prev,
      [name as string]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const employees = await getAllEmployees();
      const emailExists = employees.some((emp: { email: string; id: number; }) => emp.email === employee.email && emp.id !== Number(id));

      if (emailExists) {
        alert('Another employee with this email already exists.');
        return;
      }

      if (id) {
        await updateEmployee(Number(id), employee);
        onEmployeeUpdated();
        navigate('/');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Failed to update employee.');
    }
  };

  return (
    <Paper elevation={3} className="max-w-xl mx-auto mt-10 p-6">
      <Typography variant="h5" gutterBottom align="center">
        Edit Employee
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          name="firstName"
          value={employee.firstName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={employee.lastName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={employee.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Position"
          name="position"
          value={employee.position}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          {['Trainee', 'SWE1', 'SWE2', 'SWE3', 'SDM', 'PM'].map((pos) => (
            <MenuItem key={pos} value={pos}>
              {pos}
            </MenuItem>
          ))}
        </TextField>

        <Button type="submit" variant="contained" color="primary" fullWidth className="mt-4">
          Update Employee
        </Button>
      </form>
    </Paper>
  );
};

export default UpdateEmployee;
