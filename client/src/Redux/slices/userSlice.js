import { createSlice } from '@reduxjs/toolkit';

const userObj = JSON.parse(localStorage.getItem("user"));

let userSlice = createSlice({
  name: 'user',
  initialState: {
    userObj: userObj ? { ...userObj } : {},
    userType: userObj ? userObj.userType : null,
    isLoggedIn: false,

  },
  reducers: {
    login: (state, action) => {

      state.isLoggedIn = true;
      // state.userType=action.payload.userType;
      state.userObj = action.payload;
      state.userType = action.payload?.userType;
      //api call to get cart
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userObj = null;
      state.userType = null;
      localStorage.clear();
      return state;
    }
  },

})

//export action creators
export const { login, logout } = userSlice.actions;
//export reducer
export default userSlice.reducer



