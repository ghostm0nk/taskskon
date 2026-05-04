import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Header from './components/Header';
import AuthForm from './pages/AuthForm';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error.message);
      }
      setSession(session);
      setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setLoading(false);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-700 animate-pulse">Loading Taskskon...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header session={session} setSession={setSession} />
      <main className="flex-grow">
        {!session ? (
          <AuthForm setSession={setSession} />
        ) : (
          <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Taskskon!</h2>
            <p className="text-lg text-gray-700 mb-4">You are logged in.</p>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Your Task Dashboard (Coming Soon)</h3>
              <p className="text-gray-600">This is where your tasks will be displayed and managed.</p>
              <p className="mt-4 text-gray-500 text-sm">Session details: {session.user.email}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;