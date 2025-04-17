// src/components/ExportCSV.tsx
import React from "react";
import { Button } from "@mui/material";

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
}

interface ExportCSVProps {
  employees: Employee[];
}

const ExportCSV: React.FC<ExportCSVProps> = ({ employees }) => {
  const handleExport = () => {
    const headers = ["ID", "First Name", "Last Name", "Email", "Position"];
    const rows = employees.map(emp =>
      [emp.id, emp.firstName, emp.lastName, emp.email, emp.position]
    );

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += headers.join(",") + "\n";
    rows.forEach(row => {
      csvContent += row.join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "employee_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button variant="outlined" color="success" onClick={handleExport}>
      Export CSV
    </Button>
  );
};

export default ExportCSV;
