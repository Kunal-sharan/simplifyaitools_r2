export interface Tool {
  id: number;
  name: string;
  category: string;
  excerpt: string;
  url?: string;
  tags?: string[];
  pricing?: string;
}


export interface ApiResponse<T> {
  data: T;
  message?: string;
}

