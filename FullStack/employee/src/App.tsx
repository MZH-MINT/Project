import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListEmp from './components/ListEmp';
import AddEmployee from './components/addemp';
import UpdateEmployee from './components/update';
import { getAllEmployees } from './service/empservice';
import Header from './components/header';
import Footer from './components/footer';

const App = () => {
  const [employees, setEmployees] = React.useState<Employee[]>([]);

  const fetchEmployees = () => {
    getAllEmployees()
      .then(data => setEmployees(data))
      .catch(err => console.error('API error:', err));
  };

  React.useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow p-6">
          <Routes>
            <Route
              path="/"
              element={
                <ListEmp
                  employees={employees}
                />
              }
            />
            <Route path="/add" element={<AddEmployee onEmployeeAdded={fetchEmployees} />} />
            <Route path="/edit/:id" element={<UpdateEmployee onEmployeeUpdated={fetchEmployees} />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
