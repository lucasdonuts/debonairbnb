import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getCurrentUser = createAsyncThunk('user/getCurrentUser', () => {
  return fetch('/current_user')
    .then( res => {
      if(res.ok){
        return res.json()
      } else {
        return null
      }
    })
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    isLoading: true
    // errors: [],
  },
  reducers: {
    setCurrentUser(state, action){
      state.currentUser = action.payload;
    },
    // setErrors(state, action){
    //   state.errors.push(action.payload);
    // },
    clearCurrentUser(state){
      state.currentUser = null;
    },
    updateCurrentUser(state, action){
      state.currentUser = action.payload;
    }
  },
  extraReducers: {
    [getCurrentUser.pending](state) {
      state.isLoading = true;
    },
    [getCurrentUser.fulfilled](state, action) {
      state.currentUser = action.payload;
      state.isLoading = false;
    }
    // [getCurrentUser.rejected](state, action) {
    //   state.isLoading = false;
    //   state.errors.push(action.error.message)
    // }
  }
})

export const {
  setCurrentUser,
  updateCurrentUser,
  clearCurrentUser,
  setErrors
} = userSlice.actions;

export default userSlice.reducer;