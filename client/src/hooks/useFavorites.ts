import { useState, useEffect } from 'react';
import { fetchFavorites, addFavorite, removeFavorite } from '../api/toolsApi';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getFavorites = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchFavorites();
      setFavorites(data);
    } catch (err) {
      // console.log(err)
      setError(err instanceof Error ? err.message : 'Failed to fetch favorites');
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  const handleAddFavorite = async (toolId: number) => {
    try {
      await addFavorite(toolId);
      setFavorites(prev => [...prev, toolId]);
    } catch (err) {
      console.log(err instanceof Error ? err.message : 'Failed to add favorite')
      setError(err instanceof Error ? err.message : 'Failed to add favorite');
    }
  };

  const handleRemoveFavorite = async (toolId: string) => {
    try {
      await removeFavorite(toolId);
      setFavorites(prev => prev.filter(id => id !== Number(toolId)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove favorite');
    }
  };

  return {
    favorites,
    loading,
    error,
    handleAddFavorite,
    handleRemoveFavorite,
    getFavorites
  };
};