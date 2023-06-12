import axios from 'axios';
import queryString from 'query-string';
import { RecipeInterface, RecipeGetQueryInterface } from 'interfaces/recipe';
import { GetQueryInterface } from '../../interfaces';

export const getRecipes = async (query?: RecipeGetQueryInterface) => {
  const response = await axios.get(`/api/recipes${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createRecipe = async (recipe: RecipeInterface) => {
  const response = await axios.post('/api/recipes', recipe);
  return response.data;
};

export const updateRecipeById = async (id: string, recipe: RecipeInterface) => {
  const response = await axios.put(`/api/recipes/${id}`, recipe);
  return response.data;
};

export const getRecipeById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/recipes/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteRecipeById = async (id: string) => {
  const response = await axios.delete(`/api/recipes/${id}`);
  return response.data;
};
