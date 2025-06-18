import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchFilterProps {
  searchTerm: string;
  onChange: (term: string) => void;
  placeholder?: string;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ 
  searchTerm, 
  onChange, 
  placeholder = "Search tools..." 
}) => {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="relative flex-1 max-w-md">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400 dark:text-gray-500 transition-colors duration-200" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm transition-colors duration-200"
          placeholder={placeholder}
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 dark:hover:text-gray-300 text-gray-400 dark:text-gray-500 transition-colors duration-200"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;