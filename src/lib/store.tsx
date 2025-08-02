"use client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import cartReducer from "@/slices/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

interface Props {
  children: React.ReactNode;
}

export default function ReduxProvider({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}
