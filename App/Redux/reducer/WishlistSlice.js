import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload);
      
    },
    removeItem(state, action) {
      state.items = state.items.filter(item => item.cover_id !== action.payload.cover_id);
      console.log('state.items',state.items)
    },
  },
});

export const { addItem, removeItem } = wishlistSlice.actions;

export default wishlistSlice.reducer;