// src/context/CartContext.js
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (product, quantity) => {
    setCartItems(prevItems => {
      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex > -1) {
        // Nếu đã có, cập nhật số lượng
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Nếu chưa có, thêm mới
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Cập nhật số lượng sản phẩm
  const updateQuantity = (productId, quantity) => {
    setCartItems(prevItems => {
      return prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      );
    });
  };

  // Tính tổng tiền
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      // Trong thực tế, bạn sẽ chuyển đổi giá từ string sang số
      // Đây chỉ là ví dụ đơn giản
      const price = parseInt(item.price.replace(/\D/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  return (
    
      {children}
    
  );
};

// Hook để sử dụng context
export const useCart = () => useContext(CartContext);