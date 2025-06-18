import React from 'react';
import toast from 'react-hot-toast';
import { Heart, ExternalLink, Tag, DollarSign, Wrench } from 'lucide-react';
import { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
  onFavorite: (toolId: number) => void;
  isFavorite: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onFavorite, isFavorite }) => {
  const handleFavorite = () => {
    try {
      onFavorite(tool.id);
      const message = isFavorite ? 'Removed from favorites' : 'Added to favorites';
      // console.log(message)
      toast.success(message);
    } catch (error) {
      toast.error('Could not update favorites. Please try again.');
    }
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 overflow-hidden">
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center transition-colors duration-200">
              <Wrench className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg leading-tight transition-colors duration-200">
                {tool.name}
              </h3>
              <span className="text-sm text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full transition-colors duration-200">
                {tool.category}
              </span>
            </div>
          </div>
          <button
            onClick={handleFavorite}
            className={`p-2 rounded-full transition-all duration-200 ${
              isFavorite
                ? 'bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50'
                : 'bg-gray-50 dark:bg-gray-700 text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-red-500 dark:hover:text-red-400'
            }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Excerpt */}
        {tool.excerpt && (
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 transition-colors duration-200">
            {tool.excerpt}
          </p>
        )}

        {/* Tags */}
        {tool.tags && tool.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {tool.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Spacer to push footer down */}
        <div className="mt-auto" />

        <div className="pt-4 border-t border-gray-100 dark:border-gray-700 transition-colors duration-200 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Pricing */}
            {tool.pricing && (
              <span className="inline-flex items-center text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded-full">
                <DollarSign className="w-4 h-4 mr-1" />
                {tool.pricing}
              </span>
            )}
          </div>
          {tool.url && (
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-200"
            >
              <span>Visit Tool</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
