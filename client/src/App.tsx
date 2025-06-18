import React, { useState } from 'react';
import { useDarkMode } from './hooks/useDarkMode';
import Navigation from './components/Navigation';
import AllTools from './pages/AllTools';
import Favorites from './pages/Favorites';

function App() {
  const [currentView, setCurrentView] = useState<'all' | 'favorites'>('all');
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navigation 
        currentView={currentView} 
        onViewChange={setCurrentView}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />
      
      <main>
        {currentView === 'all' ? <AllTools /> : <Favorites />}
      </main>
      
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-16 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2024 ToolHub. Built with React and TypeScript.</p>
            <p className="text-sm mt-2">
              API endpoint: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded transition-colors duration-200">http://localhost:5000/api</code>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;