import { useNavigate ,useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import '../../style/componentsStyle/Header.css';

const profileImage = "data:image/svg+xml,%3Csvg width='32' height='32'  viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23e0e0e0'/%3E%3Ccircle cx='16' cy='12' r='5' fill='%23757575'/%3E%3Cpath d='M16 19c-5 0-10 2.5-10 5v2h20v-2c0-2.5-5-5-10-5z' fill='%23757575'/%3E%3C/svg%3E";

function Header() {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const isLoggedIn = !!localStorage.getItem('userEmail');

  const handleProfileClick = () => {
    navigate('/profile');
  };


  const handleLogout = async () => {
    setIsLoggingOut(true);
    const email = localStorage.getItem('userEmail');
    console.log('Logging out:', email);
    if (email) {
      await fetch(`${process.env.REACT_APP_API}/api/users/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      localStorage.removeItem('userId');
      localStorage.removeItem('userEmail');
      setIsLoggingOut(false);
      navigate('/');
    }
  };
  const location = useLocation();
  const showBackButton = ["/bubble", "/search", "/timeline" ,"/custom-timeline"].includes(location.pathname);

  return (
    <header className="header">
    <div
      className="header-center"
      style={{ cursor: 'pointer' }}
      onClick={() => {
        if (isLoggedIn) {
          navigate('/choose');
        } else {
          navigate('/login');
        }
      }}
      title="Go to Choose"
    >
      HistoryFlow
    </div>
      <div className="header-left">
        <button 
          onClick={handleProfileClick}
          className="profile-button"
        >
          <img 
            src={profileImage}
            alt="Profile" 
            className="w-8 h-8 rounded-full"
          />
        </button>
        {showBackButton && (
          <button
            onClick={() => navigate(-1)}
            className="back-button"
            title="back"
          >
            ←
          </button>
        )}
      </div>


      <div className="header-right">
        {isLoggedIn && (
          <button 
            onClick={handleLogout}
            className="logout-button"
            disabled={isLoggingOut}
          >
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;