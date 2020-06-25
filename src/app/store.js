import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import sessionReducer from '../features/session/sessionSlice';
import signalRMiddleware from './signalRMiddleware'

export default configureStore({
  reducer: {
    session: sessionReducer
  },
  middleware : [...getDefaultMiddleware(), signalRMiddleware]
});
