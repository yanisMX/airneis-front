import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  login: () => void;
  logout: () => void;
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
}
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface ShoppingCart {
  shoppingCart: Cart;
  setShoppingCart: React.Dispatch<React.SetStateAction<Cart>>;
}

export interface RootLayoutProps {
  children: ReactNode;
}

export interface UserData {
  id?: number;
  name?: string;
  email: string;
  password?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
  accessToken?: string;
  defaultBillingAddress?: number;
  defaultShippingAddress?: number;
  billingAddress?: string;
  shippingAddress?: string;
}

export interface UserFetch {
  success: boolean;
  user: UserData;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  token?: {
    accessToken: string;
    refreshToken: string;
  };
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

export interface ApiResponseForUserModification {
  success: boolean;
  user: UserData;
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

export interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Material {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
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

export interface Address {
  id?: number;
  label: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  postalCode: string;
  region: string;
  country: string;
  phone: string;
  type: 'billing' | 'shipping';
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductComponentProps {
  product: Product;
  i: number;
}

export interface FilterForProductsProps {
  categories: Category[];
  materials: Material[];
  selectedCategories: number[];
  setSelectedCategories: (categories: number[]) => void;
  selectedMaterials: number[];
  setSelectedMaterials: (materials: number[]) => void;
  setMinPrice: Dispatch<SetStateAction<number | undefined>>
  setMaxPrice: Dispatch<SetStateAction<number | undefined>>
}

export interface AccountAddressInputProps {
  id: string;
  label: string;
  value: string;
  handleFocus: (ref: React.RefObject<HTMLInputElement>) => void;
}

export interface AccountInformationInputProps {
  id: string;
  label: string;
  type: string;
  value: string;
  handleFocus: (ref: React.RefObject<HTMLInputElement>) => void;
  handleModifyPersonalInformationClick: (
    newInformation: string,
    informationType: 'name' | 'email',
    ref: React.RefObject<HTMLInputElement>
  ) => void;
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

export interface ChangePasswordPopupProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (oldPassword: string, newPassword: string) => void;
}

export interface PopupProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (address: {
    label: string;
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    city: string;
    postalCode: string;
    region: string;
    country: string;
    phone: string;
    type: 'billing' | 'shipping';
  }) => void;
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

