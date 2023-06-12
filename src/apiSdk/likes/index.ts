import axios from 'axios';
import queryString from 'query-string';
import { LikeInterface, LikeGetQueryInterface } from 'interfaces/like';
import { GetQueryInterface } from '../../interfaces';

export const getLikes = async (query?: LikeGetQueryInterface) => {
  const response = await axios.get(`/api/likes${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createLike = async (like: LikeInterface) => {
  const response = await axios.post('/api/likes', like);
  return response.data;
};

export const updateLikeById = async (id: string, like: LikeInterface) => {
  const response = await axios.put(`/api/likes/${id}`, like);
  return response.data;
};

export const getLikeById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/likes/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteLikeById = async (id: string) => {
  const response = await axios.delete(`/api/likes/${id}`);
  return response.data;
};
