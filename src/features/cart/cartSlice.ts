import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import type { Product } from "../products/productsSlice";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ product, quantity: 1 });
      }
    },
    removeFromCart: (
      state,
      action: PayloadAction<number>
    ) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
    },
    incrementQuantity: (
      state,
      action: PayloadAction<number>
    ) => {
      const item = state.items.find(
        (item) => item.product.id === action.payload
      );
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity: (
      state,
      action: PayloadAction<number>
    ) => {
      const item = state.items.find(
        (item) => item.product.id === action.payload
      );
      
      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          state.items = state.items.filter(
            (item) => item.product.id !== action.payload
          );
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
