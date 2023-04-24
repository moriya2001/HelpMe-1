import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    currentUser: {
      Id: '',
      IsAdmin: false
    }
  },
  reducers: {
    setCurrentUser(state, action) {
      console.log(action.payload)
      state.currentUser = action.payload;
    }
  }
})

export const { setCurrentUser } = usersSlice.actions;
export default usersSlice.reducer;