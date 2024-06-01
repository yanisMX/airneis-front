export interface UserDataSignIn {
    email: string;
    password: string;
  }

export interface UserDataSignUp {
    name: string;
    email: string;
    password: string;
  }

export interface ApiResponse {
    success : boolean;
    token : {
      accessToken : string,
      refreshToken : string;
    }
  }
  
  export interface Product {
    priority: number;
    id: number;
    name: string;
    description: string;
    slug: string;
    price: string;
    stock: number;
    createdAt: string;
    updatedAt: string;
    category: Category;
    materials: Material[];
    images: Image[];
    backgroundImage: Image;
  }

export interface ProductCreation {
  name: string | null;
  description?: string;
  slug?: string;
  price: number | null;
  stock: number | null;
  priority?: number;
  categoryId: number | null;
  materialIds: number[];
  imageIds: number[];
  backgroundImageId: number | null;
}
  
  export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    thumbnail?: Image;
    createdAt: string;
    updatedAt: string;
  }

  export interface CategoryFilters {
    search?: string;
    sort?: "id" | "name" | "createdAt" | "updatedAt";
    order?: "asc" | "desc";
    limit: number;
    page: number;
  }

  export interface CategoryPagination {
    categoryCount: number;
    totalPages: number;
    limit: number;
    page: number;
  }

export interface CategoryCreation {
  name: string | null;
  description?: string;
  slug?: string;
  thumbnailId: number | null;
}
  
  export interface Material {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  }

  export interface MaterialFilters {
    search?: string;
    sort?: "id" | "name" | "createdAt" | "updatedAt";
    order?: "asc" | "desc";
    limit: number;
    page: number;
  }

  export interface MaterialPagination {
    materialCount: number;
    totalPages: number;
    limit: number;
    page: number;
  }

  export interface MaterialCreation {
    name: string | null;
  }
  
  export interface Image {
    id: number;
    name: string;
    filename: string;
    type: string;
    size: number;
    createdAt: string;
    updatedAt: string;
  }

  export interface ShoppingCart {
    products : Product[];
    quantity : number;

  }

export interface ProductQuery {
  search?: string;
  categories?: number[];
  materials?: number[];
  minPrice?: number;
  maxPrice?: number;
  stock?: boolean;
  sort?: "id" | "name" | "price" | "category" | "stock" | "createdAt";
  order?: "asc" | "desc";
  limit?: number;
  page?: number;
}

export interface ProductPagination {
  productCount: number;
  totalPages: number;
  limit: number;
  page: number;
}

export interface MediaQuery {
  search?: string;
  type?: string;
  limit?: number;
  page?: number;
}

export interface MediaPagination {
  mediaCount: number;
  totalPages: number;
  limit: number;
  page: number;
}
