import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import React, { useMemo } from 'react'
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunk';


const dateForm ={
    displayName:"Ploper",
    email:"ploper@gmail.com",
    password:"123456"
}

const formValid ={
    email:[(value)=>!value.includes("@"),"inserta un email valido."],
    password:[ (state)=>state.trim().length<=6,"la contraseña tiene que ser mayor a 6 caracteres." ],
    displayName:[(state)=>!state.trim()," Inserte su nombre completo."]
}

export const RegisterPage = () => {

    const {onInputChange,displayName,email,password,
        formStateValid,isValidForm
    }= useForm(dateForm,formValid);

    const { status,errorMessage }=useSelector(state=>state.auth);
    const dispatch = useDispatch();

    const isChecking = useMemo(() => status==='cheking', [status]);
    
    const {displayNameValid,emailValid,passwordValid} = formStateValid;


    const onSubmit =(e)=>{
        e.preventDefault();
        // console.log(formState)
        if(isValidForm) return;
        dispatch( startCreatingUserWithEmailPassword({email,password,displayName}) )
    }

    return (

        <AuthLayout title='Login'>
            <form onSubmit={onSubmit}  
            className="animate__animated animate__fadeIn animated__faster "

>
                <Grid container >
                    <Grid item sx={{ mb: 1 }} sm={12} xs={12}>
                        <TextField
                            label="Nombre Completo"
                            type='text'
                            placeholder='Nombre completo'
                            fullWidth
                            autoComplete='off'
                            name='displayName'
                            value={displayName}
                            onChange={onInputChange}
                            error={ displayNameValid[0] }
                            helperText={displayNameValid[1]}
                        />
                    </Grid>
                    <Grid item sx={{ mb: 1 }} sm={12} xs={12}>
                        <TextField
                            label="Correo"
                            type='email'
                            placeholder='correo@goole.com'
                            fullWidth
                            autoComplete='off'
                            name='email'
                            value={email}
                            onChange={onInputChange}
                            error={ emailValid[0] }
                            helperText={emailValid[1]}
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
                            value={password}
                            onChange={onInputChange}
                            error={passwordValid[0]}
                            helperText={passwordValid[1]}
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
                        <Button variant='contained' fullWidth
                        type='submit' disabled={isValidForm || isChecking}
                        
                        >
                            Crear cuenta
                        </Button>
                    </Grid>

                    <Grid container direction={'row'} 
                    marginTop={2}
                    justifyContent={'end'} >
                        <Typography mr={1} > ¿Ya tienes una cuenta? </Typography>
                        <Link component={RouterLink} color={'inherit'} to='/auth/login' >
                            ingresar
                        </Link>

                    </Grid>

                </Grid>

            </form>

        </AuthLayout>
    )
}
