import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import { userApi } from '../features/api/userApi';
import { mealApi } from '../features/api/mealsApi';
import { ordersApi } from '../features/api/ordersApi';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token', 'isAuthenticated', 'userType'],
};

const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['items'], // persist cart items but not isOpen
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [mealApi.reducerPath]: mealApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    auth: persistedAuthReducer,
    cart: persistedCartReducer, // ✅ cart persists across refreshes
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(userApi.middleware, mealApi.middleware, ordersApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;