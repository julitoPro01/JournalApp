// import { doc, setDoc } from "firebase/firestore"
import { firebaseDB } from "./firebaseApp"
import { collection,doc,getDocs,setDoc, updateDoc, deleteDoc } from "firebase/firestore/lite"

/**
 * 
 * @param {String} uidUser 
 * @returns {Object < date > }
*/

export const addNewNoteDB = async (uidUser) => {
    try {

    const data = {
        title: `${ new Date().toDateString() }`,
        body: '',
        date:new Date().getTime(),
        images:[]
    }
     const newDoc = doc( collection( firebaseDB,`${uidUser}/journal/notes` ) )

    await setDoc(newDoc,data);
    
    data.id =newDoc.id ;    

    return {ok:true,...data};

    } catch (e) {
        console.log(e);
        return {ok:false}
    }

}

export const getAllNotesDB = async(uidUser)=>{
    try{
        let data=[];
        const querySnapshot =await getDocs(collection(firebaseDB,`${uidUser}/journal/notes`))

        querySnapshot.forEach(doc=>{
            data.push({id:doc.id,...doc.data()})
        })

        return {ok:true,data}

    }catch(e){
        console.log(e);
        return {ok:false}
        
    }
}

/**
 * 
 * @param {String} uidUser 
 * @param {String} idNote 
 * @returns {Object}
 */
export const updateNoteDB=async (uidUser,data)=>{
    try{
        
        const oneNoteRef = doc(firebaseDB,`${uidUser}/journal/notes/${data.id}`);

        const {id,...newData} = data;

        await updateDoc( oneNoteRef, newData);
        return {ok:true}
    }catch(e){
        console.log(e);
        return {ok:false}
    }
}


export const deleteNoteDB = async(uidUser,idNote)=>{

    try{

        await deleteDoc(doc(firebaseDB,`${uidUser}/journal/notes/${idNote}`));
        return{
            ok:true
        }

    }
    catch(e){

        console.log(e);
        return {ok:false}
    }
}
