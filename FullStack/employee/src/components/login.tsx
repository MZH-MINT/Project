import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../service/loginservice';
import '../style/login.css'; // External CSS

interface LoginFormInputs {
  username: string;
  password: string;
}

const Login = ({ onLogin }: { onLogin: (token: string) => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState('');

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await loginUser(data);
      if (response.token) {
        onLogin(response.token);
        navigate('/');
      } else {
        setErrorMessage('Invalid credentials');
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'An error occurred');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="username" className="input-label">Username</label>
            <input
              type="text"
              id="username"
              {...register('username', { required: 'Username is required' })}
              className="input-field"
            />
            {errors.username && <span className="error-message">{errors.username.message}</span>}
          </div>

          <div>
            <label htmlFor="password" className="input-label">Password</label>
            <input
              type="password"
              id="password"
              {...register('password', { required: 'Password is required' })}
              className="input-field"
            />
            {errors.password && <span className="error-message">{errors.password.message}</span>}
          </div>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <button type="submit" className="submit-button">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
