import { ReactNode } from 'react';

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