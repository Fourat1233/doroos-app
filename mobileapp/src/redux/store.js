import {configureStore} from '@reduxjs/toolkit';
import UserReducer from './slices/generalSlice';
export default configureStore({
  reducer: {
    general: UserReducer,
  },
});
