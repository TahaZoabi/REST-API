export interface CategoryBody {
  name: string;
}

export interface CategoryParams {
  id: string;
}

export interface ProductParams {
  id: string;
  categoryId: string;
}

export interface ProductBody {
  name: string;
  description?: string;
  price: number;
  currency: string;
  quanity: number;
  isActive: boolean;
  categoryId: number;
}
