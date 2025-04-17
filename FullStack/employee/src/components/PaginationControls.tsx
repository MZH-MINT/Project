import React from 'react';
import { Pagination, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface PaginationControlsProps {
  rowsPerPage: number;
  setRowsPerPage: (value: number) => void;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  totalItems: number;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  rowsPerPage,
  setRowsPerPage,
  currentPage,
  setCurrentPage,
  totalItems,
}) => {
  return (
    <div className="flex justify-between items-center mt-4">
      {/* Rows Per Page Selector */}
      <FormControl size="small" style={{ minWidth: 120 }}>
        <InputLabel>Rows per page</InputLabel>
        <Select
          value={rowsPerPage}
          onChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setCurrentPage(1); // Reset to first page when page size changes
          }}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </FormControl>

      {/* Pagination Controls */}
      <Pagination
        count={Math.ceil(totalItems / rowsPerPage)}
        page={currentPage}
        onChange={(event, value) => setCurrentPage(value)}
        color="primary"
      />
    </div>
  );
};

export default PaginationControls;
