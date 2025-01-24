
import { signInWithPopup,GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "./firebaseApp";

const provider = new GoogleAuthProvider();

export const signInWithGoogle= async()=>{
    try{

    const result = await signInWithPopup(firebaseAuth,provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const {displayName,photoURL,email,emailVerified,uid} = result.user;
    
        return {
            displayName,photoURL,email,emailVerified,ok:true
        }
    }
    catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        const credential = GoogleAuthProvider.credentialFromError(error);
        return {
            errorMessage,ok:false
        }
    }

}


export const registerUserWithEmailPassword= async({email,password,displayName})=>{
    try{

        
        const resp = await createUserWithEmailAndPassword(firebaseAuth,email,password)
        const { uid,photoURL } = resp.user;
       await updateProfile(firebaseAuth.currentUser,{displayName})
        return {
            ok:true,
            uid,photoURL,email,displayName
        }
    }catch(e){
        
        return {ok:false,errorMessage:e.message}
    }
}

export const loginWithEmialPassword= async(email,password)=>{
    try{

        const {user}= await signInWithEmailAndPassword(firebaseAuth,email,password);

        const { displayName,uid,photoURL } = user;
        
        return { ok:true,displayName,uid,photoURL };
    }catch(e){
        return {ok:false,errorMessage:e.message}

    }
}

export const logoutFirebse = async()=>{
    return await firebaseAuth.signOut()
}

