import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/router/AuthRoutes"
import { JournalRoutes } from "../journal/router/JournalRoutes"
import { useDispatch, useSelector } from "react-redux"
import { CheckingAuth } from "../ui/component/CheckingAuth"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { firebaseAuth } from "../store/firebase/firebaseApp"
import { logOut, login } from "../store/auth/authSlice"
import { dispatch_getAllNotes } from "../store/journal/thunk"

export const AppRoutes = () => {

  const  {status}= useSelector(state=>state.auth);
  const dispatch = useDispatch()

  useEffect(() => {
  
    onAuthStateChanged(firebaseAuth ,async(user)=>{
      if(!user) return dispatch(logOut());
      const {uid,email,displayName,photoURL  } = user;
      dispatch( login({uid,email,displayName,photoURL }) );
      dispatch( dispatch_getAllNotes() )
    });
  }, []);
  

  if(status==='cheking'){
    return(
      <CheckingAuth/>
    )
  }
  

  return (
    <Routes>

    {
      (status === "authenticated" )
      ? <Route path="/*" element={ <JournalRoutes/> } />
      :<Route path="auth/*" element={ <AuthRoutes/> } />
    }

        <Route path="/*" element={ <Navigate to={"/auth/login"} /> } />
        
    </Routes>
  )
}
