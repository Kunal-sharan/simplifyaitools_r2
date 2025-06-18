import React from 'react';
import { Search, Heart } from 'lucide-react';

interface EmptyStateProps {
  type: 'no-tools' | 'no-favorites';
}

const EmptyState: React.FC<EmptyStateProps> = ({ type }) => {
  const content = {
    'no-tools': {
      icon: Search,
      title: 'No tools found',
      description: 'Try adjusting your search criteria or check back later for new tools.'
    },
    'no-favorites': {
      icon: Heart,
      title: 'No favorites yet',
      description: 'Start exploring tools and add your favorites by clicking the heart icon.'
    }
  };

  const { icon: Icon, title, description } = content[type];

  return (
    <div className="text-center py-12 px-4">
      <div className="flex items-center justify-center mb-4">
        <Icon className="w-12 h-12 text-gray-400 dark:text-gray-500 transition-colors duration-200" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-200">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto transition-colors duration-200">{description}</p>
    </div>
  );
};

export default EmptyState;