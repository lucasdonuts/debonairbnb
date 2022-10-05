import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getItems = createAsyncThunk("items/getItems", () => {
  return fetch("/items").then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return [];
    }
  });
});

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    entities: [],
    isLoading: true,
    categories: [],
  },
  reducers: {
    getCategories(state) {
      state.categories = [
        ...new Set(state.entities.map((item) => item.category)),
      ];
    },
    updateItems(state, action) {
      state.entities = state.entities.map(item => {
        if(item.id === action.payload.id){
          return {...item, ...action.payload}
        } else {
          return item
        }
      })
    },
  },
  extraReducers: {
    [getItems.pending](state) {
      state.isLoading = true;
    },
    [getItems.fulfilled](state, action) {
      state.isLoading = false;
      state.entities = action.payload;
    },
  },
});

export const { getCategories, updateItems } = itemsSlice.actions;

export default itemsSlice.reducer;
