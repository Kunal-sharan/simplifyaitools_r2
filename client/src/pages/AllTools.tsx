import React from 'react';
import { useTools } from '../hooks/useTools';
import { useFavorites } from '../hooks/useFavorites';
import ToolCard from '../components/ToolCard';
import FiltersBar from '../components/FiltersBar';
import LoadingCard from '../components/LoadingCard';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';

const AllTools: React.FC = () => {
  const { tools, loading, error, setCategory, category, searchTerm, setSearchTerm } = useTools();
  const { favorites, handleAddFavorite, handleRemoveFavorite } = useFavorites();

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-200">All Tools</h1>
          <p className="text-gray-600 dark:text-gray-400 transition-colors duration-200">Discover and organize your favorite tools</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-200">All Tools</h1>
          <p className="text-gray-600 dark:text-gray-400 transition-colors duration-200">Discover and organize your favorite tools</p>
        </div>
        
        <ErrorMessage message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  const hasActiveFilters = searchTerm.trim() || category;
  const emptyStateMessage = hasActiveFilters 
    ? 'No tools match your search criteria. Try adjusting your filters.'
    : 'No tools found. Check back later for new tools.';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-200">All Tools</h1>
        <p className="text-gray-600 dark:text-gray-400 transition-colors duration-200">Discover and organize your favorite tools</p>
      </div>
      
      <FiltersBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={category}
        onCategoryChange={setCategory}
      />
      
      {tools.length === 0 ? (
        <div className="text-center py-12 px-4">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 text-gray-400 dark:text-gray-500 transition-colors duration-200">
              🔍
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-200">
            {hasActiveFilters ? 'No matching tools found' : 'No tools found'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto transition-colors duration-200">
            {emptyStateMessage}
          </p>
          {hasActiveFilters && (
            <button
              onClick={() => {
                setSearchTerm('');
                setCategory('');
              }}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <>
          {hasActiveFilters && (
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
                Found {tools.length} tool{tools.length !== 1 ? 's' : ''}
                {searchTerm && ` matching "${searchTerm}"`}
                {category && ` in ${category}`}
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setCategory('');
                }}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
              >
                Clear filters
              </button>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tools.map(tool => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isFavorite={favorites.includes(tool.id)}
                onFavorite={(id) => 
                  favorites.includes(id) 
                    ? handleRemoveFavorite(id)
                    : handleAddFavorite(id)
                }
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllTools;