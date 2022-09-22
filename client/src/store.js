import { configureStore } from '@reduxjs/toolkit';

import userReducer from './reducers/userSlice';
import itemsReducer from './reducers/itemsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    items: itemsReducer
  }
})

export default store;