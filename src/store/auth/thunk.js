import { loginWithEmialPassword, logoutFirebse, registerUserWithEmailPassword, signInWithGoogle } from "../firebase/googleProvider"
import { checkingCredenciales, logOut, login } from "./authSlice"

export const checkingAuthentication =()=>{
    return async(dispatch)=>{
        dispatch(checkingCredenciales())
        
    }
}

export const startGoogleSignIn=()=>{
    return async(dispatch)=>{
        
        dispatch(checkingCredenciales())
        
        const payload = await signInWithGoogle();
        
        if(!payload.ok) return dispatch(logOut(payload.errorMessage))
        
        dispatch(login(payload))
        
    
        
    }
}


export const startCreatingUserWithEmailPassword=({email,password,displayName})=>{
    return async(dispatch)=>{
        dispatch(checkingCredenciales())
        const {ok,...resp} = await registerUserWithEmailPassword({email,password,displayName});
        
        if(!ok) return dispatch( logOut(resp.errorMessage) );

        dispatch(login( resp ));
        
    }
}

export const startLoginWithEmailPassword=(email,password)=>{
    return async(dispatch)=>{
        dispatch(checkingCredenciales());

       const {ok,...user} =await loginWithEmialPassword(email,password);       

       if(!ok) return dispatch(logOut(user.errorMessage))

        dispatch(login( {...user,email} ));

    }
}


export const startLogout =()=>{
    return async(dispatch)=>{
        await logoutFirebse();
        dispatch( logOut("") );
    }
}