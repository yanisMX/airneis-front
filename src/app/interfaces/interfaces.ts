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
    isFeatured: boolean;
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
  isFeatured: boolean;
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
  featured?: boolean;
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
  sort?: "id" | "name" | "type" | "size" | "createdAt";
  order?: "asc" | "desc";
}

export interface MediaPagination {
  mediaCount: number;
  totalPages: number;
  limit: number;
  page: number;
}

export interface MediaDto {
  name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserDto {
  name: string;
  email?: string;
  role: "user" | "admin";
}

export interface UserQuery {
  search?: string;
  limit?: number;
  page?: number;
}

export interface UserPagination {
  userCount: number;
  totalPages: number;
  limit: number;
  page: number;
}

export interface Order {
  id: number;
  createdAt: string;
  updatedAt: string;
  status: OrderStatus;
  products: OrderProduct[];
  billingAddress: Address;
  shippingAddress: Address;
  user?: User;
}

export enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELED = "canceled",
}

export const OrderStatusLabels = {
  pending: "En attente",
  confirmed: "Confirmée",
  shipped: "Expédiée",
  delivered: "Livrée",
  canceled: "Annulée",
}

export interface OrderProduct {
  id: number;
  name: string;
  price: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: number;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderQuery {
  user?: number;
  limit?: number;
  page?: number;
}

export interface OrderPagination {
  orderCount: number;
  totalPages: number;
  limit: number;
  page: number;
}

export interface OrderDto {
  status: OrderStatus;
}
