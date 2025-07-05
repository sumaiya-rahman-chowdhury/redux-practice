import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "@/redux/features/posts/postSlice";
import cartReducer from "@/redux/features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
