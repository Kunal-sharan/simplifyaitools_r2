import { Tool } from '../types';

const API_URL = 'http://localhost:5000/api';

export const fetchTools = async (category = ''): Promise<Tool[]> => {
  try {
    const response = await fetch(`${API_URL}/tools${category ? `?category=${category}` : ''}`);
    if (!response.ok) throw new Error('Failed to fetch tools');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tools:', error);
    throw error;
  }
};

export const fetchFavorites = async (): Promise<number[]> => {
  try {
    const response = await fetch(`${API_URL}/tools/favorites`);
    // console.log(response.json())
    if (!response.ok) throw new Error('Failed to fetch favorites');
    const data = response.json();
    // console.log(data)
    return data || [];
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
};

export const addFavorite = async (toolId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/tools/favorites`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ toolId })
    });
    if (!response.ok) throw new Error('Failed to add favorite');
  } catch (error) {
    console.error('Error adding favorite:', error);
    throw error;
  }
};

export const removeFavorite = async (toolId: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/tools/favorites/${toolId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to remove favorite');
  } catch (error) {
    console.error('Error removing favorite:', error);
    throw error;
  }
};