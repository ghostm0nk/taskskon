import React from 'react';
import { supabase } from '../lib/supabase';

const Header = ({ session, setSession }) => {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    } else {
      setSession(null);
    }
  };

  return (
    <header className="w-full bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Taskskon</h1>
        <nav>
          {session ? (
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transform hover:scale-105 transition-all duration-200"
            >
              Sign Out
            </button>
          ) : (
            <span className="text-gray-300">Please sign in</span>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;