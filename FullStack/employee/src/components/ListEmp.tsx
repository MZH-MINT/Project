import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { deleteEmployee } from '../service/empservice'; // Assuming a delete API function

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
}

interface ListEmpProps {
  employees: Employee[];
// Ensure onAdd prop is passed for adding employee
}

const ListEmp: React.FC<ListEmpProps> = ({ employees }) => {
  const [open, setOpen] = useState(false); // For the confirmation dialog
  const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null); // Store employee id to delete
  const navigator = useNavigate();

  const handleDeleteClick = (id: number) => {
    setEmployeeToDelete(id); // Set the employee to delete
    setOpen(true); // Open the confirmation dialog
  };

  const handleCloseDialog = (confirm: boolean) => {
    setOpen(false); // Close the dialog

    if (confirm && employeeToDelete !== null) {
      // If confirmed, call delete API
      deleteEmployee(employeeToDelete)
        .then(() => {
          alert('Employee deleted successfully');
          // Reload the list of employees or refresh the state (You can trigger the parent method here)
          // onDelete(employeeToDelete); 
        })
        .catch((error) => {
          console.error('Error deleting employee:', error);
          alert('Failed to delete employee.');
        });
    }
    setEmployeeToDelete(null); // Clear the employee ID after the action
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between mb-4">
        <Typography variant="h4" align="center" gutterBottom className="text-indigo-700 font-bold">
          Employee List
        </Typography>
        {/* Add Employee button */}
        <Button variant="contained" color="primary" onClick={() => navigator('/add')}>
          Add Employee
        </Button>
      </div>

      <TableContainer component={Paper} elevation={4} className="rounded-xl shadow-lg">
        <Table>
          <TableHead sx={{ backgroundColor: '#EEF2FF' }}>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>First Name</strong></TableCell>
              <TableCell><strong>Last Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Position</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell> {/* Actions Column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.length > 0 ? (
              employees.map((emp) => (
                <TableRow key={emp.id} hover>
                  <TableCell>{emp.id}</TableCell>
                  <TableCell>{emp.firstName}</TableCell>
                  <TableCell>{emp.lastName}</TableCell>
                  <TableCell>{emp.email}</TableCell>
                  <TableCell>{emp.position}</TableCell>
                  <TableCell>
                    {/* Action buttons */}
                    <Tooltip title="Edit">
                      <IconButton color="primary" onClick={() => navigator(`/edit/${emp.id}`)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="secondary" onClick={() => handleDeleteClick(emp.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body2" color="textSecondary">
                    No employees found.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this employee?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDialog(false)} color="primary">
            No
          </Button>
          <Button onClick={() => handleCloseDialog(true)} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ListEmp;
