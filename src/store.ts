import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./features/products/productsSlice";
import cartReducer from "./features/cart/cartSlice";

function loadCartState() {
  try {
    const serializedState =
      localStorage.getItem("cartState");

    if (serializedState === null) return undefined;
    
    return JSON.parse(serializedState);
  } catch (err) {
    console.error(err);
  }
}

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
  preloadedState: {
    cart: loadCartState(),
  },
});

store.subscribe(() => {
  try {
    const state = store.getState();
    const serializedCart = JSON.stringify(state.cart);
    localStorage.setItem("cartState", serializedCart);
  } catch (err) {
    console.error(err);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
