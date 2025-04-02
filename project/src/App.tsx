import React, { useState } from 'react';
import { Wallet, Users, LayoutDashboard, LogOut } from 'lucide-react';
import Dashboard from './components/Dashboard';
import TrustFundSetup from './components/TrustFundSetup';
import Login from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  
  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
            <Wallet className="h-6 w-6" />
            TrustGuard
          </h1>
        </div>
        <nav className="mt-8">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left ${
              currentView === 'dashboard'
                ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </button>
          <button
            onClick={() => setCurrentView('setup')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left ${
              currentView === 'setup'
                ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Users className="h-5 w-5" />
            Trust Setup
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-600 hover:bg-gray-50"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {currentView === 'dashboard' ? <Dashboard /> : <TrustFundSetup />}
      </div>
    </div>
  );
}

export default App;