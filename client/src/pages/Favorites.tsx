import React, { useMemo } from 'react';
import { useTools } from '../hooks/useTools';
import { useFavorites } from '../hooks/useFavorites';
import ToolCard from '../components/ToolCard';
import SearchFilter from '../components/SearchFilter';
import LoadingCard from '../components/LoadingCard';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import { useDebounce } from '../hooks/useDebounce';

const Favorites: React.FC = () => {
  const { tools } = useTools();
  const { favorites, loading, error, handleRemoveFavorite } = useFavorites();
  const [searchTerm, setSearchTerm] = React.useState('');
  
  // Debounce search term
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const favoriteTools = useMemo(() => {
    let filtered = tools.filter(tool => favorites.includes(tool.id));
    
    // Apply search filter
    if (debouncedSearchTerm.trim()) {
      const searchLower = debouncedSearchTerm.toLowerCase().trim();
      filtered = filtered.filter(tool => 
        tool.name.toLowerCase().includes(searchLower) ||
        tool.category.toLowerCase().includes(searchLower) ||
        (tool.description && tool.description.toLowerCase().includes(searchLower))
      );
    }
    
    return filtered;
  }, [tools, favorites, debouncedSearchTerm]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-200">Favorite Tools</h1>
          <p className="text-gray-600 dark:text-gray-400 transition-colors duration-200">Your curated collection of essential tools</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <LoadingCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-200">Favorite Tools</h1>
          <p className="text-gray-600 dark:text-gray-400 transition-colors duration-200">Your curated collection of essential tools</p>
        </div>
        
        <ErrorMessage message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  const totalFavorites = tools.filter(tool => favorites.includes(tool.id)).length;
  const hasSearchFilter = searchTerm.trim();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-200">Favorite Tools</h1>
        <p className="text-gray-600 dark:text-gray-400 transition-colors duration-200">Your curated collection of essential tools</p>
      </div>
      
      {totalFavorites > 0 && (
        <div className="mb-6">
          <SearchFilter 
            searchTerm={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search your favorite tools..."
          />
        </div>
      )}
      
      {totalFavorites === 0 ? (
        <EmptyState type="no-favorites" />
      ) : favoriteTools.length === 0 && hasSearchFilter ? (
        <div className="text-center py-12 px-4">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 text-gray-400 dark:text-gray-500 transition-colors duration-200">
              🔍
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-200">
            No matching favorites found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto transition-colors duration-200">
            No favorite tools match your search for "{searchTerm}". Try a different search term.
          </p>
          <button
            onClick={() => setSearchTerm('')}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <>
          {hasSearchFilter && (
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
                Found {favoriteTools.length} favorite{favoriteTools.length !== 1 ? 's' : ''} matching "{searchTerm}"
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
              >
                Clear search
              </button>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteTools.map(tool => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isFavorite={true}
                onFavorite={handleRemoveFavorite}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;