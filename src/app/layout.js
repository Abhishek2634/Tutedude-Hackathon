'use client';
import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import { Toaster } from 'react-hot-toast';
import ThemeProvider from '@/components/ThemeProvider';
import "./globals.css";

export default function RootLayout({ children }) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Check for logged-in user on initial load by checking the session cookie
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null); // Explicitly set user to null if fetch fails
        }
      } catch (error) {
        console.error("Failed to fetch user session", error);
        setUser(null);
      }
    };
    fetchUser();
  }, []); // Empty dependency array means this runs once on initial load

  // Function to handle user logout
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null); // Clear user state on the frontend immediately
  };

  // Function to run after a successful login/signup to update the UI
  const handleLoginSuccess = async () => {
    const res = await fetch('/api/auth/me'); // Re-fetch user data to get the new session
    const data = await res.json();
    setUser(data.user);
    setIsAuthModalOpen(false); // Close the modal
  };

  return (
    <html lang="en" className="light" style={{ colorScheme: 'light' }}>
      <ThemeProvider>
        <body className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col min-h-screen">
          <Toaster position="top-center" />
          <Header 
            user={user} 
            onAuthClick={() => setIsAuthModalOpen(true)} 
            onLogout={handleLogout} 
          />
          <main className="flex-grow container mx-auto p-4">{children}</main>
          <Footer />
          <AuthModal 
            isOpen={isAuthModalOpen} 
            onClose={() => setIsAuthModalOpen(false)} 
            onSuccess={handleLoginSuccess}
          />
        </body>
      </ThemeProvider>
    </html>
  );
}
