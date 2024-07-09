import axios from 'axios';
import { Country, PaginatedLeadershipResponse } from './types';
import { API_URL } from '../const';

export const fetchCountries = async (): Promise<Country[]> => {
  try {
    const response = await axios.get<Country[]>(`${API_URL}/countries`);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

export const getLeadershipDataByCountries = async (countries: string[], page: number = 1, rows: number = 50): Promise<PaginatedLeadershipResponse> => {
  const response = await axios.get(`${API_URL}/leadership/countries`, {
    params: { list: countries.join(','), page, rows },
  });
  return response.data;
};
