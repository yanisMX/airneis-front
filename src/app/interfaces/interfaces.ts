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

  export interface ShoppingCart {
    products : Product[];
    quantity : number;

  }



