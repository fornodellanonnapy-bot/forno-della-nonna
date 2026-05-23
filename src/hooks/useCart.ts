import { useState, useMemo } from 'react';
import type { PizzaItem } from '../components/PizzaCard';

export interface CartItem extends PizzaItem {
  quantity: number;
  toppings?: string[];
  cartItemId: string;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (pizza: PizzaItem, toppings: string[] = []) => {
    const toppingPrice = 7000;
    const finalPrice = pizza.price + (toppings.length * toppingPrice);
    const toppingsKey = toppings.length > 0 ? '_' + toppings.slice().sort().join('-').replace(/\s+/g, '') : '';
    const cartItemId = `${pizza.id}${toppingsKey}`;

    setItems(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map(item => 
          item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...pizza, price: finalPrice, toppings, cartItemId, quantity: 1 }];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = useMemo(() => items.reduce((acc, item) => acc + item.quantity, 0), [items]);
  const totalPrice = useMemo(() => items.reduce((acc, item) => acc + (item.price * item.quantity), 0), [items]);

  return {
    items,
    addToCart,
    removeFromCart,
    clearCart,
    totalCount,
    totalPrice
  };
}
