import React, { useState } from 'react';
import './Login.css'; // Import a CSS file for styling
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // State variables for username, password, login error message, and navigation
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate(); // Navigate to different routes

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sending a POST request to the authentication endpoint with user credentials
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      if (response.ok) {
        // If login successful, store the token in local storage
        const data = await response.json();
        const loginToken = data.token;
        localStorage.setItem('loginToken', loginToken);
        console.log('Login successful. Token stored:');
        
        // Navigate to the home route after successful login
        navigate('/home');
        console.log('After navigate function');
      } else {
        // If login fails, set an error message
        setLoginError('Invalid username or password');
      }
    } catch (error) {
      // Handle any errors that occur during login
      console.error('Login failed:', error);
      setLoginError('Login failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="login-container bg-white border-blue-900 rounded-lg p-8"  id="loginContainer">
        <h2 className='text-2xl decoration-4 mb-2'>Login</h2>
        {/* Login form */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* Username input */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
          {/* Password input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          {/* Submit button */}
          <button type="submit" className="py-2 login-button border-spacing-4 bg-blue-900 hover:bg-green-500" id='loginButton'>
            Login
          </button>
        </form>
        {/* Display login error message if there's any */}
        {loginError && <p className="error-message">{loginError}</p>}
      </div>
    </div>
  );
};

export default Login;
