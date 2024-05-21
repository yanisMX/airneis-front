import { ReactNode } from "react";

export interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}


 export interface Cart {
    products : Product[];
    quantity : number;
    subtotal : number;
    total : string;
  }


  export interface ShoppingCart {
    shoppingCart :  Cart[],
    setShoppingCart : React.Dispatch<React.SetStateAction<Cart[]>>;
  }




export interface RootLayoutProps {
    children: ReactNode;
  }

export interface UserDataSignIn {
    email: string;
    password: string;
    cookies: boolean;
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

  export interface userDetail {
    id : number;
    name : string;
    email : string;
    role : string;
    createdAt : string;
    updatedAt : string;
    defaultBillingAddress : number;
    defaultShippingAddress : number;
  }

  export interface Address {
          id: number;
          label: string;
          firstName: string;
          lastName: string;
          address1: string;
          address2: string;
          city: string;
          region: string;
          postalCode: string;
          country: string;
          phone: string;
          type: "billing" | "shipping";
          createdAt: string;
          updatedAt: string;
  }

export interface ProductComponentProps {
    product: Product,
    i: number
}

export interface FilterForProductsProps {
  categories: Category[];
  materials: Material[];
  selectedCategories: number[];
  setSelectedCategories: (categories: number[]) => void;
  selectedMaterials: number[];
  setSelectedMaterials: (materials: number[]) => void;
}
  



