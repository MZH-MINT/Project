import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListEmp from './components/ListEmp';
import AddEmployee from './components/addemp';
import UpdateEmployee from './components/update';
import { getAllEmployees } from './service/empservice';
import Header from './components/header';
import Footer from './components/footer';
import Login from './components/login';

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
}

const App: React.FC = () => {
  const [employees, setEmployees] = React.useState<Employee[]>([]);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [token, setToken] = React.useState<string>('');

  const fetchEmployees = async () => {
    try {
      const data = await getAllEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleLogin = (token: string) => {
    setToken(token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setToken('');
    setIsAuthenticated(false);
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      fetchEmployees();
    }
  }, [isAuthenticated]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow p-6">
          <Routes>
            {!isAuthenticated ? (
              <Route path="/" element={<Login onLogin={handleLogin} />} />
            ) : (
              <>
                <Route
                  path="/"
                  element={
                    <ListEmp
                      employees={employees}
                      onLogout={handleLogout}
                      onDelete={fetchEmployees} // ✅ Auto-refresh list after delete
                    />
                  }
                />
                <Route
                  path="/add"
                  element={<AddEmployee onEmployeeAdded={fetchEmployees} />}
                />
                <Route
                  path="/edit/:id"
                  element={<UpdateEmployee onEmployeeUpdated={fetchEmployees} />}
                />
              </>
            )}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
