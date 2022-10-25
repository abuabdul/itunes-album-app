import {configureStore} from '@reduxjs/toolkit';

import initialState from './initialState';
import search from './search';

const store = configureStore({
  reducer: {
    search,
  },
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware();
    return middlewares;
  },
  preloadedState: initialState,
});

export default store;