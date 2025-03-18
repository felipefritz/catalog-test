import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from "redux";
import { setupListeners } from '@reduxjs/toolkit/query'
import { CatalogAPI } from '../services/catalogService';


export const rootReducer = combineReducers({
  [CatalogAPI.reducerPath]: CatalogAPI.reducer,

});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      CatalogAPI.middleware,
    ),
});
setupListeners(store.dispatch)


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
