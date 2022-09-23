import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getCurrentUser = createAsyncThunk('user/getCurrentUser', () => {
  return fetch('/current_user')
    .then( res => {
      if(res.ok){
        return res.json()
      } else {
        // res.status
        return Promise.reject(new Error(res.statusText))
      }
    })
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {}, // May be unnecessary
    currentUser: null,
    isLoading: true,
    errors: [],
  },
  reducers: {
    setCurrentUser(state, action){
      console.log(action);
      state.currentUser = action.payload;
    },
    setErrors(state, action){
      state.errors.push(action.payload);
    },
    clearCurrentUser(state){
      state.currentUser = null;
    }
    // addUsers (Does this need to be in state?)
    // getUsers (?)
    // updateUser
    // deleteUser
  },
  extraReducers: {
    [getCurrentUser.pending](state) {
      state.isLoading = true;
    },
    [getCurrentUser.fulfilled](state, action) {
      // console.log(action)
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    [getCurrentUser.rejected](state, action) {
      // console.log("🚀 ~ file: userSlice.js ~ line 51 ~ action", action)
      state.isLoading = false;
      state.errors.push(action.error.message)
    }
  }
})

export const { setCurrentUser, clearCurrentUser, setErrors } = userSlice.actions;

export default userSlice.reducer;