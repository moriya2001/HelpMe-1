import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    currentUser: {
      Name: '',
      Adress: ''
    }
  },
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    }
  }
})

export const { setCurrentUser } = usersSlice.actions;
export default usersSlice.reducer;