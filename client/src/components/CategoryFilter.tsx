import React from 'react';
import { Filter } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onChange: (category: string) => void;
}

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'Writing', label: 'Writing' },
  { value: 'Image', label: 'Image' },
  { value: 'Video', label: 'Video' },
  { value: 'Audio', label: 'Audio' },
  { value: 'Development', label: 'Development' },
  { value: 'Design', label: 'Design' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Productivity', label: 'Productivity' },
];

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onChange }) => {
  return (
    <div className="flex items-center space-x-3 sm:flex-shrink-0">
      <div className="flex items-center space-x-2">
        <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400 transition-colors duration-200" />
        <label htmlFor="category-filter" className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200 whitespace-nowrap">
          Category:
        </label>
      </div>
      <select
        id="category-filter"
        value={selectedCategory}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm min-w-[160px] transition-colors duration-200"
      >
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;