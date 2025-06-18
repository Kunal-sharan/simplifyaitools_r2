import React from 'react';
import SearchFilter from './SearchFilter';
import CategoryFilter from './CategoryFilter';

interface FiltersBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const FiltersBar: React.FC<FiltersBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <SearchFilter 
        searchTerm={searchTerm}
        onChange={onSearchChange}
        placeholder="Search tools by name, category, or description..."
      />
      <CategoryFilter 
        selectedCategory={selectedCategory}
        onChange={onCategoryChange}
      />
    </div>
  );
};

export default FiltersBar;