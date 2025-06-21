import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import '../style/pagestyle/Profile.css';
import useSearchHistory from '../hooks/useSearchHistory';

const API_BASE = process.env.REACT_APP_API || 'http://localhost:5000';

const Profile = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');
  const userId = localStorage.getItem('userId');
  const [isEditing, setIsEditing] = useState(false);  
  const [formData, setFormData] = useState({
    email: userEmail || '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Use the custom hook
  const { history: searches, loading: searchesLoading, error: searchesError } = useSearchHistory(userId);

  useEffect(() => {
    if (!userEmail || !userId) {
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userId');
      navigate('/login');
    }
  }, [userEmail, userId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.newPassword || formData.confirmPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        setError('New passwords do not match');
        return;
      }
    }

    try {
      const response = await fetch(`${API_BASE}/api/users/profile/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.newPassword || undefined
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (formData.email !== userEmail) {
          localStorage.setItem('userEmail', formData.email);
        }
        setSuccess(data.message || 'Profile updated successfully');
        setIsEditing(false);
        setFormData(prev => ({
          ...prev,
          newPassword: '',
          confirmPassword: ''
        }));
      } else {
        setError(data.message || 'Update failed');
      }
    } catch (err) {
      console.error('Update error:', err);
      setError('Error connecting to server. Please try again.');
    }
  };

  if (!userEmail) {
    return (
      <div className="profile-main-container">
        <Header />
        <div className="profile-container">
          <div className="error-message">
            Please log in to view your profile
            <button onClick={() => navigate('/login')} className="login-button">
              Go to Login
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="profile-main-container">
      <Header />
      <div className="profile-container">
        <div className="profile-header">
          <h2>My Profile</h2>
        </div>

        {success && <div className="success-message">{success}</div>}
        {error && <div className="error-message">{error}</div>}
        
        {!isEditing ? (
          <>
            <div className="profile-info">
              <div className="info-item">
                <label>Email:</label>
                <span>{userEmail}</span>
              </div>
              <div className="info-item">
                <label>Password:</label>
                <span>********</span>
              </div>
            </div>
            <div className="button-row">
              <button onClick={() => setIsEditing(true)} className="edit-button">
                Edit Profile
              </button>
              <button onClick={() => navigate('/choose')} className="return-button">
                Return to Choose
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="edit-form">
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>New Password:</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Confirm New Password:</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="button-group">
              <button type="submit" className="save-button">Save Changes</button>
              <button 
                type="button" 
                onClick={() => {
                  setIsEditing(false);
                  setError('');
                  setSuccess('');
                  setFormData(prev => ({
                    ...prev,
                    email: userEmail,
                    newPassword: '',
                    confirmPassword: ''
                  }));
                }} 
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="search-history">
          <h3>Recent Searches ({searches.length})</h3>
          {searchesLoading ? (
            <p>Loading...</p>
          ) : searchesError ? (
            <p className="error-message">{searchesError}</p>
          ) : searches.length === 0 ? (
            <p>No searches yet</p>
          ) : (
            <div className="search-list">
              {searches.map((term, index) => (
                <div key={index} className="search-item">
                  <p className="search-term">{term}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;