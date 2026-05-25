import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  mealId: number;
  mealName: string;
  mealPrice: number;
  mealUrl: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(i => i.mealId === action.payload.mealId);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(i => i.mealId !== action.payload);
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(i => i.mealId === action.payload);
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(i => i.mealId === action.payload);
      if (item) {
        if (item.quantity === 1) {
          state.items = state.items.filter(i => i.mealId !== action.payload);
        } else {
          item.quantity -= 1;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    openCart: (state) => { state.isOpen = true; },
    closeCart: (state) => { state.isOpen = false; },
    toggleCart: (state) => { state.isOpen = !state.isOpen; },
  },
});

export const {
  addToCart, removeFromCart, incrementQuantity,
  decrementQuantity, clearCart, openCart, closeCart, toggleCart,
} = cartSlice.actions;

export default cartSlice.reducer;