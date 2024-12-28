import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ApiResponse<T> {
  data: T;
  success : boolean,
  message: string;
  error: string;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("tour-sync-auth");
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const api = {
  get: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    const response = await axiosInstance.get<ApiResponse<T>>(endpoint);
    return response.data;
  },

  post: async <T>(endpoint: string, data: any): Promise<ApiResponse<T>> => {
    const response = await axiosInstance.post<ApiResponse<T>>(endpoint, data);
    return response.data;
  },

  put: async <T>(endpoint: string, data: any): Promise<ApiResponse<T>> => {
    const response = await axiosInstance.put<ApiResponse<T>>(endpoint, data);
    return response.data;
  },

  delete: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    const response = await axiosInstance.delete<ApiResponse<T>>(endpoint);
    return response.data;
  },
};

export default api;