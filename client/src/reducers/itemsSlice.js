import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getItems = createAsyncThunk('items/getItems', () => {
    return Promise.all([
      fetch("https://fakestoreapi.com/products/category/women's clothing").then( res => res.json() ),
      fetch("https://fakestoreapi.com/products/category/men's clothing").then( res => res.json() )
    ])
      .then( data => [...data[0], ...data[1]])
})

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    entities: [],
    isLoading: true,
  },
  reducers: {
    // addItem(state, action){

    // }
  },
  extraReducers: {
    [getItems.pending](state){
      state.isLoading = true;
    },
    [getItems.fulfilled](state, action){
      state.isLoading = false;
      state.entities = [];
      state.entities = [ ...state.entities, ...action.payload]
      console.log("🚀 ~ file: itemsSlice.js ~ line 37 ~ entities", state.entities)
    }
  }
})

// export const { addItem, updateItem } = itemsSlice.actions;

export default itemsSlice.reducer;