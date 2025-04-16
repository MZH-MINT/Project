import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Typography } from '@mui/material';
import { getEmployeeById, updateEmployee } from '../service/empservice';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
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
        <TextField label="First Name" name="firstName" value={employee.firstName} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Last Name" name="lastName" value={employee.lastName} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Email" name="email" type="email" value={employee.email} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Position" name="position" value={employee.position} onChange={handleChange} fullWidth margin="normal" />

        <Button type="submit" variant="contained" color="primary" fullWidth className="mt-4">
          Update Employee
        </Button>
      </form>
    </Paper>
  );
};

export default UpdateEmployee;

