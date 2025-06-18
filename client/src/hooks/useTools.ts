import { useState, useEffect } from 'react';
import { fetchTools } from '../api/toolsApi';
import { Tool } from '../types';
import { useDebounce } from './useDebounce';

export const useTools = () => {
  const [allTools, setAllTools] = useState<Tool[]>([]);
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Debounce search term to avoid excessive filtering
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Fetch tools from API
  useEffect(() => {
    const getTools = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchTools(category);
        setAllTools(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch tools');
        setAllTools([]);
      } finally {
        setLoading(false);
      }
    };
    getTools();
  }, [category]);

  // Filter tools based on search term and category
  useEffect(() => {
    let filtered = allTools;

    // Apply search filter
    if (debouncedSearchTerm.trim()) {
      const searchLower = debouncedSearchTerm.toLowerCase().trim();
      filtered = filtered.filter(tool => 
        tool.name.toLowerCase().includes(searchLower) ||
        tool.category.toLowerCase().includes(searchLower) ||
        (tool.excerpt && tool.excerpt.toLowerCase().includes(searchLower))
      );
    }

    setFilteredTools(filtered);
  }, [allTools, debouncedSearchTerm]);

  return { 
    tools: filteredTools, 
    loading, 
    error, 
    setCategory, 
    category,
    searchTerm,
    setSearchTerm
  };
};