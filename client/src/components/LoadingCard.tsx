import React from 'react';

const LoadingCard: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-200">
      <div className="p-6 animate-pulse">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg transition-colors duration-200"></div>
            <div>
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2 transition-colors duration-200"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 transition-colors duration-200"></div>
            </div>
          </div>
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors duration-200"></div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full transition-colors duration-200"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 transition-colors duration-200"></div>
        </div>
        <div className="pt-4 border-t border-gray-100 dark:border-gray-700 transition-colors duration-200">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 transition-colors duration-200"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;