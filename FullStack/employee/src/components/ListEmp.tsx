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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { deleteEmployee } from '../service/empservice'; // Assuming a delete API function
import DeleteDialog from './DeleteDialog'; // Import the DeleteDialog component
import SearchBar from '../components/searchbar'; // Import the SearchBar component
import PaginationControls from './PaginationControls'; // Import the PaginationControls component
import ConvertPDF from '../components/convertPDF'; // Import the ExportCSV component
import ExportCSV from '../components/exportcsv';


interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
}

interface ListEmpProps {
  employees: Employee[];
  onLogout: () => void;
  onDelete: () => void;
}

const ListEmp: React.FC<ListEmpProps> = ({ employees, onLogout, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigator = useNavigate();

  const handleDeleteClick = (id: number) => {
    setEmployeeToDelete(id);
    setOpen(true);
  };

  const handleCloseDialog = (confirm: boolean) => {
    setOpen(false);
    if (confirm && employeeToDelete !== null) {
      deleteEmployee(employeeToDelete)
        .then(() => {
          alert('Employee deleted successfully');
          onDelete();
        })
        .catch((error) => {
          console.error('Error deleting employee:', error);
        });
    }
    setEmployeeToDelete(null);
  };

  const filteredEmployees = employees.filter((emp) =>
    `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between mb-4 gap-4">
        <Typography variant="h4" className="text-indigo-700 font-bold">
          Employee List
        </Typography>
        <div className="flex gap-2 items-center ml-auto">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Button variant="contained" color="primary" onClick={() => navigator('/add')}>
            Add Employee
          </Button>
          <Button variant="outlined" color="secondary" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>

      <TableContainer component={Paper} elevation={4} className="rounded-xl shadow-lg">
        <Table>
          <TableHead>
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
            {paginatedEmployees.length > 0 ? (
              paginatedEmployees.map((emp) => (
                <TableRow key={emp.id} hover>
                  <TableCell>{emp.id}</TableCell>
                  <TableCell>{emp.firstName}</TableCell>
                  <TableCell>{emp.lastName}</TableCell>
                  <TableCell>{emp.email}</TableCell>
                  <TableCell>{emp.position}</TableCell>
                  <TableCell>
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

      {/* Pagination Controls */}
      <PaginationControls
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={filteredEmployees.length}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteDialog open={open} onClose={handleCloseDialog} />

{/* Export PDF Button */}
<ConvertPDF employees={employees} />

{/* Export CSV Button */}
<ExportCSV employees={employees} />


    </div>
  );
};

export default ListEmp;
