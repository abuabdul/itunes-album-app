import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import request from '../src/helpers/request'
import initialState from './initialState';

const startSearching = createAsyncThunk('search/start', async (keyTerm, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const res = await request('search', null, {
      term: keyTerm?.split('-')?.join('+') || state?.search?.query,
      media: 'music',
      limit: 30 * state?.search?.iteration
    })
    return {
      results: res?.data?.results || [],
      resultCount: res?.data?.resultCount || 0,
      query: keyTerm?.split('-').join('+') || state?.search?.query,
      iteration: state?.search?.iteration + 1
    };
  } catch (error) {
    console.log('error', error);
    return {
      results: [],
      resultCount: 0,
      iteration: 0,
      query: keyTerm?.split('-').join('+') || state?.search?.query,
    };
  }
});

const searchSlice = createSlice({
  name: 'search',
  initialState: initialState.search,
  reducers: {},
  extraReducers: {
    [startSearching.pending]: (search, action) => {
      return {
        ...search,
        loading: true
      };
    },
    [startSearching.fulfilled]: (search, action) => {
      return {
        ...search,
        loading: false,
        ...action.payload,
      };
    },
  },
});

export const thunks = {
  startSearching,
};

export const actions = searchSlice.actions;
export default searchSlice.reducer;
