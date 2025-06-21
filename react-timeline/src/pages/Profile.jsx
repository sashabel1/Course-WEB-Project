import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import '../style/pagestyle/Profile.css';
import useSearchHistory from '../hooks/useSearchHistory';
import useProfileForm from '../hooks/useProfileForm';
import SearchHistory from '../components/profile/SearchHistory';
import ProfileView from '../components/profile/ProfileView';
import ProfileForm from '../components/profile/ProfileForm';

const API_BASE = process.env.REACT_APP_API || 'http://localhost:5000';

const Profile = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');
  const userId = localStorage.getItem('userId');

  const {
    formData, error, success, isEditing,
    setIsEditing, handleInputChange,
    handleSubmit, cancelEdit
  } = useProfileForm(userEmail, userId, API_BASE, (newEmail) => {
    if (newEmail !== userEmail) localStorage.setItem('userEmail', newEmail);
  });

  const { history: searches, loading: searchesLoading, error: searchesError } = useSearchHistory(userId);

  useEffect(() => {
    if (!userEmail || !userId) {
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userId');
      navigate('/login');
    }
  }, [userEmail, userId, navigate]);

  const handleHistorySelect = (term) => {
    navigate(`/search?query=${encodeURIComponent(term)}`);
  };

  if (!userEmail) {
    return (
      <div className="profile-main-page">
        <Header />
        <div className="profile-container">
          <div className="error-message">
            Please log in to view your profile
            <button onClick={() => navigate('/login')} className="login-button">Go to Login</button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="profile-main-page">
      <Header />
      <div className="profile-container">
        <div className="profile-header">
          <h2>My Profile</h2>
        </div>

        {success && <div className="success-message">{success}</div>}
        {error && <div className="error-message">{error}</div>}

        {isEditing ? (
          <ProfileForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            cancelEdit={cancelEdit}
          />
        ) : (
          <ProfileView
            email={userEmail}
            onEdit={() => setIsEditing(true)}
            onReturn={() => navigate('/choose')}
          />
        )}

        <SearchHistory
          searches={searches}
          loading={searchesLoading}
          error={searchesError}
          onSelect={handleHistorySelect}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
