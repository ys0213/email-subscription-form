import React from 'react';
import EmailSubscriptionForm from './components/EmailSubscriptionForm';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <EmailSubscriptionForm />
      </div>
    </div>
  );
}

export default App;
