import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import userReducer from "../slices/userSlice";

const rootReducer = combineReducers({
  user: userReducer,
});

// config persist, its' like local storage
const persistConfig = {
  key: "root",
  storage,
};

// create presisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// create store
const store = configureStore({
  reducer: persistedReducer,
  // to avoid redux-persist error in console
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// create persistor
const persistor = persistStore(store);
export { store, persistor };
