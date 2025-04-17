import axios from 'axios';

const API_URL = 'http://localhost:8081/api/login';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token: string | null;
}

export const loginUser = async (loginRequest: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axios.post(API_URL, loginRequest);
    return response.data; // Assuming the response is in the structure { message, token }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors
      const errorMessage = error.response?.data?.message || 'An error occurred during login';
      throw new Error(errorMessage);
    }
    throw new Error('An unknown error occurred during login');
  }
};
