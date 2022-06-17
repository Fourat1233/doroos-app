import {createSlice} from '@reduxjs/toolkit';
export const generalSlice = createSlice({
  name: 'general',
  initialState: {
    drawerOpen: false,
  },
  reducers: {
    setDrawerOpen: (state, action) => {
      state.drawerOpen = action.payload;
    },
  },
});

export const {setDrawerOpen} = generalSlice.actions;
export const selectDrawerOpen = state => state.general.drawerOpen;
export default generalSlice.reducer;
