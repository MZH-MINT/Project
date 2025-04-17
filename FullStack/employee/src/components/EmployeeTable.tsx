import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
}

interface EmployeeTableProps {
  employees: Employee[];
  onDelete: (id: number) => void;
  navigate: any;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, onDelete, navigate }) => {
  return (
    <TableContainer component={Paper} elevation={4} className="rounded-xl shadow-lg">
      <Table>
        <TableHead sx={{ backgroundColor: '#EEF2FF' }}>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>First Name</strong></TableCell>
            <TableCell><strong>Last Name</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell><strong>Position</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
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
                  <Tooltip title="Edit">
                    <IconButton color="primary" onClick={() => navigate(`/edit/${emp.id}`)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton color="secondary" onClick={() => onDelete(emp.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          ) : (
<TableRow>
  <TableCell colSpan={6} align="center">
    <span>No employees found.</span>
  </TableCell>
</TableRow>

          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;
