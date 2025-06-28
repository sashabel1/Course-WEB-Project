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
    <div className="min-h-screen flex flex-col items-center bg-[#F2EFE7] dark:bg-gray-900 overflow-x-auto transition-colors duration-300">
      <Header />
      <main className="flex-1 flex flex-col items-center mt-12">
        <h1 className="text-5xl font-extrabold text-[#006A71] dark:text-gray-100 mb-8 text-center drop-shadow-md">
          Welcome to HistoryFlow
        </h1>

        <div className="flex gap-12 mb-12">
          <button
            onClick={goToLogin}
            className="w-[200px] h-[200px] rounded-full text-2xl font-bold flex items-center justify-center
                       bg-[#006A71] text-white dark:bg-blue-600 dark:text-gray-100
                       cursor-pointer transition-all duration-300 shadow-[0_8px_16px_rgba(0,106,113,0.3)]
                       hover:-translate-y-2 hover:shadow-[0_12px_24px_rgba(0,106,113,0.4)]"
          >
            Login
          </button>

          <button
            onClick={goToRegister}
            className="w-[200px] h-[200px] rounded-full text-2xl font-bold flex items-center justify-center
                       border-[3px] border-[#006A71] dark:border-blue-600 bg-transparent text-[#006A71] dark:text-gray-100
                       cursor-pointer transition-all duration-300 shadow-[0_8px_16px_rgba(0,106,113,0.3)]
                       hover:-translate-y-2 hover:shadow-[0_12px_24px_rgba(0,106,113,0.4)]
                       hover:bg-[#006A71] hover:text-white dark:hover:bg-blue-600"
          >
            Register
          </button>
        </div>

        <section className="text-center text-[#006A71] dark:text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
          <p>
            Explore history through interactive timelines. Whether you're a student, educator, or history enthusiast, 
            HistoryFlow helps you discover and understand historical events in a whole new way.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;