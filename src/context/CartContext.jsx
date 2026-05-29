import { createContext, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const existing = cartItems.find(
      (item) => item.id === product.id
    );

    if (existing) {
      const updated = cartItems.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );

      setCartItems(updated);
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(
      cartItems.filter((item) => item.id !== id)
    );
  };

  const clearCart = () => {
  setCartItems([]);
};

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;