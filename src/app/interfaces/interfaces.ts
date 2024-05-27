import { ReactNode } from "react";

export interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  user: UserData | null;
  
}
export interface CartItem {
  product: Product;
  quantity: number;
}

 export interface Cart {
    items : CartItem[];
    total : number;
  }




  export interface ShoppingCart {
    shoppingCart :  Cart,
    setShoppingCart : React.Dispatch<React.SetStateAction<Cart>>;
  }

export interface RootLayoutProps {
    children: ReactNode;
  }

export interface UserData {
    id?: number;
    name?: string;
    email: string;
    password: string;
    role?: string;
    accessToken?: string;
    defaultBillingAddress?: number;
    


  }

export interface UserFetch {
    success: boolean;
    user: UserData;
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
  



