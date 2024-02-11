import {  createSlice } from '@reduxjs/toolkit'
export const userSlice = createSlice({
    name: 'user',
    initialState:[],
    reducers: {
        login: (state, action) => { 
            
            if(state.length) state.pop()  
            state.push(action.payload)
        },
        logout:(state,action)=>{

            state.pop()
            
        }
    },
})

//create action creator functions
export const { login,logout } = userSlice.actions

//export reducer
export default userSlice.reducer