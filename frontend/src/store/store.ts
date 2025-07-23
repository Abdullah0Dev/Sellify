import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  PersistConfig,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import cartSlice from "@/store/features/cartSlice";
import { productsApi } from "./services/api";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"; // Add these imports
// 1. Create a separate root reducer without persistence
const rootReducer = combineReducers({
  cart: cartSlice,
  [productsApi.reducerPath]: productsApi.reducer,
});

// 2. Explicitly type the persisted reducer
type RootState = ReturnType<typeof rootReducer>;
type PersistedState = RootState & {
  _persist?: { version: number; rehydrated: boolean };
};

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
) as typeof rootReducer;

// 3. Configure store with explicit typing
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(productsApi.middleware),
});

export const persistor = persistStore(store);

// 4. Correctly typed root state
export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 5. Export typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
