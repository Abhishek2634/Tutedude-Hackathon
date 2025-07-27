'use client';
import Link from 'next/link';
import ProfileDropdown from './ProfileDropdown';
import ThemeSwitcher from './ThemeSwitcher'; // Import the new component

export default function Header({ user, onAuthClick, onLogout }) {
  return (
    <header className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-green-600 dark:text-green-500">
          Annapurna
        </Link>
        <nav className="flex items-center gap-4">
          <ThemeSwitcher /> {/* Add the theme switcher here */}
          {user ? (
            <ProfileDropdown user={user} onLogout={onLogout} />
          ) : (
            <button 
              onClick={onAuthClick} 
              className="px-4 py-2 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
            >
              Login / Sign Up
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
