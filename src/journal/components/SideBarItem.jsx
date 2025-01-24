import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { memo, useMemo } from "react"
import { useDispatch } from "react-redux"
import { activeNote } from "../../store/journal/journalSlice"

export const SideBarItem = memo( ({id,title,body,date,images}) => {

    const dispatch = useDispatch();

    const subTitle = useMemo(()=>{
        return title.length>28? title.substring(0,28)+'...':title
    },[title]);

    const subBody=useMemo(()=>{
        return body.length > 10 ? body.substring(0,10)+'...':body
    },[body]);

    const onSelectItem=()=>{
        
        dispatch(activeNote({id,title,body,date,images}));
    }


  return (
  
            <ListItem id={id} disablePadding
            onClick={onSelectItem}
             >
                <ListItemButton  >
                    <ListItemIcon>
                        <TurnedInNot/>
                    </ListItemIcon>
                    <Grid container >
                        <ListItemText primary={subTitle} />
                        <ListItemText secondary={subBody} />
                    </Grid>
                </ListItemButton>
            </ListItem>

  )
})
