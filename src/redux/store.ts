import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import commentReducer from './slices/commentsSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    comments: commentReducer, // Dodali smo commentReducer ovdje
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
