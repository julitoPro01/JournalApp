           import { createSlice } from '@reduxjs/toolkit';
    export const authSlice = createSlice({
        name: 'auth',
            initialState: {
                status:'cheking', // 'cheking', 'authenticated'
                uid:null,
                email:null,
                displayName:null,
                photoURL:null,
                errorMessage:null
            },
            reducers: {
               login:(state,action)=>{

                state.status='authenticated', // 'cheking', 'authenticated'
                state.uid=action.payload.uid;
                state.email=action.payload.email;
                state.displayName=action.payload.displayName;
                state.photoURL=action.payload.photoURL;

               },
               logOut:(state,action)=>{
                
                state.status='not-authenticated', // 'cheking', 'authenticated'
                state.uid=null;
                state.email=null;
                state.displayName=null;
                state.photoURL=null;
                state.errorMessage=action.payload;          
                 },
               checkingCredenciales:(state)=>{
                state.status="cheking"
               },


            }
        });
        // Action creators are generated for each case reducer function
        export const { login,logOut,checkingCredenciales,checkingCredencialesError } = authSlice.actions;