export interface Category {
  _id: string;
  name: {
    en: string;
    ar: string;
  };
  active: boolean;
  image: string;
  order: number;
  product: string[];
  branches: string[];
  createdAt: string;
  updatedAt: string;
}
