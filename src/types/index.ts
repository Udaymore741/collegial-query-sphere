
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  socialLinks: {
    linkedin: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Question {
  id: string;
  title: string;
  content: string;
  author: User;
  category: Category;
  upvotes: number;
  likes: number;
  answers: Answer[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Answer {
  id: string;
  content: string;
  author: User;
  upvotes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchParams {
  query?: string;
  category?: string;
  sort?: 'recent' | 'popular';
}
