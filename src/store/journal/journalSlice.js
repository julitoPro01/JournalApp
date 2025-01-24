           import { createSlice } from '@reduxjs/toolkit';
    export const journalSlice = createSlice({
        name: 'journal',
            initialState: {
                isSaving:true,
                messageSaved:'',
                notes:[],
                active:null,
                isOpenDrawer:true,
                isLoad:false
            },
            reducers: {
               addNotes:(state,action)=>{
                state.notes.push(action.payload)
               },
               activeNote:(state,action)=>{
                state.active = action.payload;
               },
               msgResult:(state,action)=>{
                state.messageSaved =action.payload 
                state.isLoad = false
               },
               loadNotes:(state,action)=>{
                state.notes = action.payload
               },
               saveUpdate:(state,action)=>{
                state.notes = state.notes.map(item=>{
                    if(item.id===action.payload.id){
                        item={...action.payload}
                    }
                    return item
                })
               },
               
               updateImage:(state,action)=>{

                state.active.images = [...action.payload,...state.active.images]
               },
               deleteNote:(state,action)=>{
                        
                state.notes = state.notes.filter(item=>item.id!=action.payload);
                state.active = null;
               },
               openDrawer:(state,action)=>{
                state.isOpenDrawer=action.payload
               },
               setLoad:(state,action)=>{
                    state.isLoad=action.payload
               }
            }
        });
        // Action creators are generated for each case reducer function
        export const { addNotes,activeNote, msgResult
            ,loadNotes,saveUpdate,updateImage,deleteNote,openDrawer,setLoad
         } = journalSlice.actions;