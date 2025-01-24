import { PostFileImage } from "../../helper/PostFileImag";
import { addNewNoteDB, getAllNotesDB, updateNoteDB, deleteNoteDB } from "../firebase/DbProvider"
import { activeNote, addNotes, loadNotes, msgResult, saveUpdate, updateImage, deleteNote,setLoad } from "./journalSlice";

export const dispatch_addNotes=()=>{
    return async(dispatch,getState)=>{
    const {ok,...data} =  await  addNewNoteDB( getState().auth.uid );
    
    if(!ok) return dispatch ( msgResult('Error al crear( note )') )

    dispatch( addNotes(data)  )
    dispatch( activeNote(data) )

    }
}

export const dispatch_getAllNotes=()=>{
    return async(dispatch,getState)=>{
      const {ok,data} = await getAllNotesDB( getState().auth.uid );
        dispatch(setLoad(true))
      if(!ok) return dispatch(msgResult('Error al obtener( notes )'));
        dispatch( loadNotes(data) )
        dispatch(setLoad(false))

    }
}

export const dispatch_updateNote=(data)=>{
    return async(dispatch,getState)=>{
        const uid = getState().auth.uid;
        dispatch(setLoad(true))

      const {ok} = await updateNoteDB( uid,data );
      if(!ok) return dispatch( msgResult('Error al actualizar ( note )') );
        dispatch( saveUpdate(data) );
        dispatch(setLoad(false))

    }
}


export const dispatch_saveFile=(files)=>{
    return async(dispatch,getState)=>{
        dispatch(setLoad(true))

        
        const MultipleFile =[];
        
        for (let file of files){
            MultipleFile.push( PostFileImage(file));
        }
        
        const list = await Promise.all( MultipleFile);

        dispatch( updateImage(list) );

        const data = getState().journal.active;
        
        dispatch(dispatch_updateNote(data))
        dispatch(setLoad(false))
        
    }
}

export const dispatch_deleteNote= ()=>{
    return async(dispatch,getState)=>{
        dispatch(setLoad(true))

        const uid = getState().auth.uid;
        const {id} = getState().journal.active;
       const {ok} = await deleteNoteDB(uid,id)
       
       if(!ok) return dispatch( msgResult('Error al Eliminar ( note )') );

       dispatch( deleteNote(id) );
       dispatch(setLoad(false))

    }
}