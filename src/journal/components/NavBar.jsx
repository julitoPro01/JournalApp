import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, CircularProgress, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { startLogout } from "../../store/auth/thunk";
import { openDrawer } from "../../store/journal/journalSlice";

export const NavBar = ({drawerWidth=240}) => {


    const dispatch = useDispatch();
   const { isLoad }= useSelector(state=>state.journal)

    const onLogout =()=>{
        dispatch( startLogout() )
    }

    const onOpenSideBar=()=>{
        dispatch(openDrawer(false))
    }

  return (
    <AppBar position="fixed"
        sx={{
            width:{sm:`calc(100% - ${drawerWidth}px)`},
            ml:{sm:`${drawerWidth}px`}
        }}
    >
        <Toolbar>
            <IconButton
                color="inherit"
                edge='start'
                sx={{mr:2,display:{sm:'none'}}}
                onClick={onOpenSideBar}
            >
                <MenuOutlined/>
            </IconButton>
            <Grid container
                direction={'row'}
                justifyContent={'space-between'}
            > 
            <Typography variant="h6" noWrap component={'div'} >JournalApp</Typography>
            
                {
                    isLoad &&  <Grid item 
                    zIndex={1}
                    display={'flex'}
                    justifyContent={'center'}
                    position={'absolute'} style={{
                        left:0,
                        width:"100%", backgroundColor:'rgba(4, 67, 35, 0.236)',
                        }} >
                <CircularProgress color="info"  />
                </Grid>
                }

               

            <IconButton color="error" 
            onClick={onLogout}
            >
                <LogoutOutlined/>

            </IconButton>
            </Grid>
        </Toolbar>
    </AppBar>
  )
}
