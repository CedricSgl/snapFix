import axios from 'axios';
import { baseUrl } from '../config';

export const fetchUsers = async () => {
  const response = await axios.get(`${baseUrl}/users`);
  return response.data;
};