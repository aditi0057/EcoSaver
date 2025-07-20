// src/context/CartContext.tsx
import React, { createContext, useContext, useState} from "react";
import type { ReactNode } from "react";

// src/types/Product.ts
export type Product = {
  product_id: number;
  product_name: string;
  brand: string;
  category: string;
  product_description: string;
  product_weight_or_volume: string;
  "actual_price_(₹)": number;
  "selling_price_(₹)": number;
  discount: number;
  avg_rating: number;
  out_of_stock: boolean;
  packing_material_type: string;
  packing_material_weight: string;
  shipping_packaging: string;
  is_sustainable: boolean;
  sustainability_factors: string;
  certification_tags: string;
  end_of_life_disposal: string;
  "end_of_life_disposal.1": string; // image URL
  ecoScore: number;
  breakdown: any;
  certifications: string[];
  id?: string; // Optional legacy ID
  name?: string; // Optional alias
  material?: string;
  packaging?: string;
};


type CartContextType = {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  swapItem: (oldProductId: string, newProduct: Product) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);



export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev; // prevent duplicates
      return [...prev, product];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

   const swapItem = (oldProductId: string, newProduct: Product) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === oldProductId ? newProduct : item))
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, swapItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
