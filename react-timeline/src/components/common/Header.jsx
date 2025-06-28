import { useNavigate ,useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

/**
 * Header Component
 *
 * Displays the app header with:
 * - Centered clickable title ("HistoryFlow") that navigates to the choose page or home based on login state.
 * - Left side profile button navigating to the user's profile.
 * - Conditional back button on specific routes that navigates to the previous page.
 * - Right side logout button that triggers logout API call and clears localStorage.
 *
 * Features:
 * - Shows logout button only if user is logged in (based on localStorage).
 * - Disables logout button while logout request is in progress.
 * - Responsive and accessible with aria labels and titles.
 *
 * Uses React Router's useNavigate and useLocation hooks for navigation and route detection.
 */


const profileImage = "data:image/svg+xml,%3Csvg width='32' height='32'  viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23e0e0e0'/%3E%3Ccircle cx='16' cy='12' r='5' fill='%23757575'/%3E%3Cpath d='M16 19c-5 0-10 2.5-10 5v2h20v-2c0-2.5-5-5-10-5z' fill='%23757575'/%3E%3C/svg%3E";

function Header() {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const isLoggedIn = !!localStorage.getItem('userEmail');
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

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
    <header
      className="w-full bg-[#006A71] text-[#F2EFE7] px-10 py-5 flex items-center text-2xl font-extrabold shadow-md select-none relative justify-between"
    >
      {/* Center title - absolutely centered */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={() => navigate(isLoggedIn ? '/choose' : '/')}
        title="Go to Choose"
      >
        HistoryFlow
      </div>

      {/* Left side: profile button and back button */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleProfileClick}
          className="bg-transparent border-none cursor-pointer px-4 py-2 rounded-md transition-colors duration-300 text-[#F2EFE7] text-lg hover:bg-white hover:bg-opacity-10"
          aria-label="Profile"
        >
          <img src={profileImage} alt="Profile" className="w-8 h-8 rounded-full" />
        </button>

        {showBackButton && (
          <button
            onClick={() => navigate(-1)}
            className="bg-transparent border-none w-10 h-10 text-3xl text-[#F2EFE7] rounded-full flex items-center justify-center mr-auto hover:bg-white hover:bg-opacity-10 transition-colors duration-300"
            title="Back"
          >
            ←
          </button>
        )}
      </div>

      {/* Right side: logout button and dark mode toggle */}
      <div className="ml-auto">
        <button onClick={toggleDarkMode} className="darkmode-toggle" title="Toggle dark mode" style={{marginRight: '1rem'}}>
          {darkMode ? '🌙 Dark' : '☀️ Light'}
        </button>
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="ml-auto px-4 py-1.5 bg-red-600 text-white rounded-md border-none cursor-pointer text-lg font-semibold transition-colors duration-200 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
