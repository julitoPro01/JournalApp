import { Box, Divider, Drawer, IconButton, List,  Toolbar, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { SideBarItem } from "./SideBarItem";
import { openDrawer } from "../../store/journal/journalSlice";
import { useState } from "react";

import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';


export const SideBar = ({ drawerWidth }) => {

    const { displayName } = useSelector(state => state.auth);
    const { notes,isOpenDrawer } = useSelector(state => state.journal);

    const dispatch = useDispatch()
  
    const onCloseSideBar=()=>{
        dispatch( openDrawer(true) )
    }

 
    return (
        <Box
            component={'nav'}
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, 
             }  }

        >
            <Drawer
                variant="permanent"
                // onClose={onCloseSideBar}
                open
                sx={{
                    display:{sm:'block',xs: isOpenDrawer? 'none':'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                <Toolbar  sx={{display:'flex',justifyContent:'space-between'  }} >
                    <Typography variant="h6" noWrap component={'div'}  >
                        {displayName}


                    </Typography>
                    
                        <IconButton sx={{ display:{xs:'block',sm:'none'} } }
                            onClick={onCloseSideBar}
                        >

                        <KeyboardReturnIcon  />

                        </IconButton>

                  
                </Toolbar>
                <Divider />
                <List>

                    {
                        notes.map(item => (
                            <SideBarItem key={item.id} {...item} />
                        ))
                    }
                </List>

            </Drawer>
        </Box>
    )
}
