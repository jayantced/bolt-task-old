// utils/api.ts

import axios from 'axios';

const API_BASE_URL = 'https://reqres.in/api';

interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UserData[];
}

export const fetchUsers = async (page: number = 1, perPage: number = 10): Promise<ApiResponse> => {
  try {
    const response = await axios.get<ApiResponse>(`${API_BASE_URL}/users`, {
      params: {
        page,
        per_page: perPage,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
