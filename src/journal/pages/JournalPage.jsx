import { IconButton } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView } from "../views/NoteView"
import { NothigSelectedView } from "../views/NothigSelectedView"
import { AddOutlined } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { dispatch_addNotes } from "../../store/journal/thunk"


export const JournalPage = () => {

    const dispatch = useDispatch();
    const {active:noteActive,isLoad} = useSelector(state=>state.journal);

    const onAddNewNote =()=>{
        dispatch( dispatch_addNotes() )
    }

    return (
        <JournalLayout>

            {
                !noteActive 
                ? <NothigSelectedView/>
                :<NoteView/>
            }
           
            

            <IconButton
            disabled={isLoad}
                size="large"
                sx={{
                    color:'white',
                    backgroundColor:'error.main',
                    ':hover':{backgroundColor:'error.main',opacity:0.9},
                    position:'fixed',
                    right:50,
                    bottom:50
                }}
                onClick={onAddNewNote}
            >
            <AddOutlined sx={{fontSize:30}} />
            </IconButton>
        </JournalLayout>
    )
}
    