import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {},
  currentUser: null,
  isLoading: true,
  errors: [],
}

export const getCurrentUser = createAsyncThunk('user/getCurrentUser', () => {
  return fetch('/current_user')
    // .then( res => res.json() )
    .then( res => {
      if(res.ok){
        res.json()
      } else {
        Promise.reject()
      }
    })
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // addUser(state, action) {

    // }
    // getUsers (?)
    // updateUser
    // deleteUser
  },
  extraReducers: {
    [getCurrentUser.pending](state) {
      console.log(state)
      state.isLoading = true;
    },
    [getCurrentUser.fulfilled](state, action) {
      console.log("Fulfilled state: ", state, "Fulfilled action: ", action)
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    [getCurrentUser.rejected](state, action) {
      console.log(action)
      state.isLoading = false;
    }
  }
})

console.log(userSlice)

export default userSlice.reducer;