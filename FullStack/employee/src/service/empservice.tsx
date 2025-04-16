import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/employees';

export const getAllEmployees = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

export const addEmployee = async (employee: Omit<employees, 'id'>) => {
  try {
    const response = await axios.post(API_BASE_URL, employee);
    return response.data;
  } catch (error) {
    console.error('Error adding employee:', error);
    throw error;
  }
};

export const getEmployeeById = async (id: number) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  };
  
  export const updateEmployee = async (id: number, updatedData: any) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, updatedData);
    return response.data;
  };
  
  export const deleteEmployee = async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
      console.error('Error deleting employee:', error);
      throw error;
    }
  };
  