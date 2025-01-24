import { Box, Toolbar } from "@mui/material"
import { NavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";

export const JournalLayout = ({children}) => {

    const drawerWidth = 240;

  return (
    <Box display={'flex'}
    className="animate__animated animate__fadeIn animated__faster "

    >
        <NavBar
            drawerWidth={drawerWidth}
        />
        <SideBar drawerWidth={drawerWidth} />
        <Box 
            component={'main'}
            sx={{flexGrow:1,p:3}}
        >
            <Toolbar/>
        {children}
        </Box>
    </Box>
  )
}
