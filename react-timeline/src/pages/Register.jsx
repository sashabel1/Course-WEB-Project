import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

/**
 * Register Component
 *
 * This component provides a registration form for new users to create an account.ד
 * On successful registration, the user is redirected to the login page.
 *
 * Features:
 * - Input validation to ensure passwords match before submitting
 * - Displays success and error messages
 * - Navigates to login page after successful registration with a delay
 *
 * Hooks used:
 * - useState: Manages form input values, error, and success states
 * - useNavigate: Handles navigation to other routes
 */

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true); 
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Error connecting to server');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#F2EFE7] overflow-x-auto">
      <Header />

      <div className="flex-1 max-w-md w-full m-8 p-8 rounded-xl bg-white shadow-[0_8px_16px_rgba(0,106,113,0.2)]">
        <h2 className="text-[#006A71] text-center text-2xl font-semibold mb-8">Create an Account</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-4 text-center font-medium">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-700 p-4 rounded mb-4 text-center font-medium">
            Registration successful! Redirecting to login...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#006A71]"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 font-medium text-gray-700">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#006A71]"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="mb-1 font-medium text-gray-700">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#006A71]"
            />
          </div>

          <button
            id="btnRegister"
            type="submit"
            className="w-full bg-[#2196F3] text-white font-bold text-lg py-2.5 px-5 rounded-md cursor-pointer
                       transition-transform duration-300 hover:bg-[#10b2bd] hover:-translate-y-0.5
                       hover:shadow-[0_4px_8px_rgba(0,106,113,0.3)]"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-6 text-[#006A71]">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-[#004a4f] underline font-bold cursor-pointer hover:text-[#006A71]"
          >
            Login here
          </span>
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default Register;