import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const getItems = createAsyncThunk('items/getItems', () => {
//     return Promise.all([
//       fetch("https://fakestoreapi.com/products/category/women's clothing").then( res => res.json() ),
//       fetch("https://fakestoreapi.com/products/category/men's clothing").then( res => res.json() )
//     ])
//       .then( data => [...data[0], ...data[1]])
// })

export const getItems = createAsyncThunk('items/getItems', () => {
  return fetch('/items')
    .then(res => {
      if(res.ok){
        return res.json()
      } else {
        return []
      }
    })
})

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    entities: [],
    isLoading: true,
    categories: []
  },
  reducers: {
    getCategories(state) {
      state.categories = [...new Set(state.entities.map( item => item.category ))]
    }
  },
  extraReducers: {
    [getItems.pending](state){
      state.isLoading = true;
    },
    [getItems.fulfilled](state, action){
      state.isLoading = false;
      state.entities = action.payload
    }
  }
})

export const { getCategories } = itemsSlice.actions;

export default itemsSlice.reducer;