import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';


/**
 * Index Component
 *
 * This is the landing page of the HistoryFlow app, welcoming users and providing
 * navigation options to either login or register.
 *
 * Features:
 * - Displays a welcome message and app description
 * - Provides two primary action buttons: Login and Register
 * - Uses React Router's useNavigate hook for client-side navigation
 *
 * Hooks used:
 * - useNavigate: To programmatically navigate to login or register routes
 */

const Index = () => {
  const navigate = useNavigate();

  const goToLogin = () => navigate('/login');
  const goToRegister = () => navigate('/register');

   return (
    <div className="min-h-screen flex flex-col items-center bg-[#F2EFE7] overflow-x-auto">
      <Header />
      <main className="flex-1 flex flex-col items-center mt-12">
        <h1 className="text-5xl font-extrabold text-[#006A71] mb-8 text-center drop-shadow-md">
          Welcome to HistoryFlow
        </h1>

        <div className="flex gap-[40px] items-center justify-center my-[60px]">
          <button
            onClick={goToLogin}
            className="w-[200px] h-[200px] rounded-full text-2xl font-bold flex items-center justify-center
                       bg-[#006A71] text-white shadow-[0_8px_16px_rgba(0,106,113,0.3)]
                       transition duration-300
                       hover:bg-[#F2EFE7] hover:text-[#006A71] hover:border hover:border-[#006A71] hover:shadow-[0_12px_24px_rgba(0,106,113,0.4)]
                       transform hover:-translate-y-1"
          >
            Login
          </button>

          <button
            onClick={goToRegister}
            className="w-[200px] h-[200px] rounded-full text-2xl font-bold flex items-center justify-center
                       border-3 border-[#006A71] bg-transparent text-[#006A71]
                       shadow-[0_8px_16px_rgba(0,106,113,0.2)]
                       transition duration-300
                       hover:bg-[#006A71] hover:text-white hover:shadow-[0_12px_24px_rgba(0,106,113,0.4)]
                       transform hover:-translate-y-1"
          >
            Register
          </button>
        </div>

        <section className="text-center text-[#006A71] text-lg max-w-3xl mx-auto leading-relaxed">
          <p>Discover historical events and timelines through our interactive search platform.</p>
          <p>Login to access your personalized timeline searches or register to get started!</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;