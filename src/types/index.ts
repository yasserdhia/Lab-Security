export interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role: string;
  is_active: boolean;
  created_at: string;
  last_login?: string;
  profile_picture?: string;
  bio?: string;
  phone?: string;
  address?: string;
  salary?: number;
  social_security?: string;
  credit_card?: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  category?: string;
  stock_quantity: number;
  is_active: boolean;
  created_at: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface VulnerabilityLevel {
  id: number;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  vulnerabilityType: string;
  hints: string[];
}
