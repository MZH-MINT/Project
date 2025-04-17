// src/components/ConvertPDF.tsx
import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // No destructuring
import { Button } from "@mui/material";

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
}

interface ConvertPDFProps {
  employees: Employee[];
}

const ConvertPDF: React.FC<ConvertPDFProps> = ({ employees }) => {
  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Paper size
    const orientation = "portrait";

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);

    const title = "Employee List Report";
    const introText =
      "We are glad to say these are the employees working in our organisation.";

    // Title and Introduction
    doc.text(title, marginLeft, 40);
    doc.setFontSize(11);
    doc.text(introText, marginLeft, 60);

    // Table Headers
    const headers = [["ID", "First Name", "Last Name", "Email", "Position"]];

    // Table Body
    const data = employees.map((emp) => [
      emp.id.toString(),
      emp.firstName,
      emp.lastName,
      emp.email,
      emp.position,
    ]);

    // Generate table
    autoTable(doc, {
      startY: 80,
      head: headers,
      body: data,
      theme: "grid",
      headStyles: {
        fillColor: [33, 150, 243], // Material Blue
        textColor: 255,
        fontSize: 12,
      },
      styles: {
        fontSize: 10,
        cellPadding: 4,
      },
    });

    // Save PDF
    doc.save("employee_list_report.pdf");
  };

  return (
    <Button variant="outlined" color="primary" onClick={exportPDF}>
      Download PDF Report
    </Button>
  );
};

export default ConvertPDF;
