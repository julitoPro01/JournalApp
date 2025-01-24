import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import React, { useMemo } from 'react'
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../hooks/useForm';
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunk';

const formValid ={
    email:[(value)=>!value.includes("@"),"inserta un email valido."],
    password:[ (state)=>state.trim().length<=6,"la contraseña tiene que ser mayor a 6 caracteres." ],

}

const date={
    email:"ploper@gmail.com",
    password:"123456"
};

export const LoginPage = () => {

    const dispatch = useDispatch();
   const {status,errorMessage} = useSelector(state=>state.auth);
    const isChecking = useMemo(()=> status==="cheking" ,[status]) ;
    

    const {email,password,onInputChange} = useForm(date,formValid);

    const onSubmit =(event)=>{
        event.preventDefault();
        dispatch( startLoginWithEmailPassword(email,password) )
    }

    const onGoolgeSing = async()=>{
        dispatch(startGoogleSignIn());

        
    }

    return (

        <AuthLayout title='Login'>
            <form onSubmit={onSubmit} 
            className="animate__animated animate__fadeIn animated__faster "
             >
                <Grid container >
                    <Grid item sx={{ mb: 1 }} sm={12} xs={12}>
                        <TextField
                            label="Correo"
                            type='email'
                            placeholder='correo@goole.com'
                            fullWidth
                            autoComplete='off'
                            name='email'
                            onChange={onInputChange}
                            value={email}
                        />
                    </Grid>
                    <Grid item sx={{ mb: 1 }} sm={12} xs={12}>
                        <TextField
                            label="Contraseña"
                            type='password'
                            placeholder='Contraseña'
                            fullWidth
                            autoComplete='off'
                            name='password'
                            onChange={onInputChange}
                            value={password}
                        />
                    </Grid>

                </Grid>
                <Grid 
                    display={ !!errorMessage ? 'block': 'none' }
                >  
                        <Alert severity='error' > {errorMessage}  </Alert>
                    </Grid>
                <Grid container spacing={2} sx={{ mb: 2, mt: 1 }} >
                    <Grid item xs={12} sm={6}>
                        <Button type='submit' variant='contained' fullWidth
                        disabled={isChecking}
                        >
                            Login
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button variant='contained'
                            fullWidth
                            onClick={onGoolgeSing}
                        disabled={isChecking}

                        >
                            <Google />
                            <Typography sx={{ ml: 1 }} > Google </Typography>
                        </Button>
                    </Grid>

                    <Grid container
                        marginTop={2}
                        direction={'row'} justifyContent={'end'} >
                        <Link component={RouterLink} color={'inherit'} to='/auth/register' >
                            Crear una Cuenta
                        </Link>

                    </Grid>

                </Grid>

            </form>

        </AuthLayout>
    )
}
