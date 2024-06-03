import { ShoppingCart,Product } from "../interfaces/interfaces";

  export const handleAddToCart = (cart: ShoppingCart[], product: Product): ShoppingCart[] => {
    const newCartItem: ShoppingCart = {
      products: [product],
      quantity: 1,
    };
    return [...cart, newCartItem];
  };

export const formatDateString = (dateString: string): string => {
  // Parse the ISO date string into a Date object
  const date = new Date(dateString);

  // Helper function to pad single digit numbers with a leading zero
  const pad = (num: number): string => num.toString().padStart(2, '0');

  // Extract date components
  const year = date.getUTCFullYear();
  const month = pad(date.getUTCMonth() + 1); // Months are 0-based
  const day = pad(date.getUTCDate());

  // Extract time components
  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());
  const seconds = pad(date.getUTCSeconds());

  // Format the date string
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

export const formatBytes = (bytes: number): string => {
  const kB = 1024;
  const MB = kB * 1024;

  if (bytes >= MB) {
      return (bytes / MB).toFixed(2) + ' Mo';
  } else if (bytes >= kB) {
      return (bytes / kB).toFixed(2) + ' ko';
  } else {
      return bytes + ' o';
  }
}

export const shuffle = (array: any[]): any[] => {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}
