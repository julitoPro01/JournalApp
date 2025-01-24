import { SaveOutlined } from "@mui/icons-material"
import { useMemo, useRef } from 'react';

import { useForm01 } from "../../auth/hooks/useForm01";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components/ImageGallery"
import { dispatch_saveFile, dispatch_updateNote, dispatch_deleteNote } from "../../store/journal/thunk";

import UpgradeIcon from '@mui/icons-material/Upgrade';
import DeleteIcon from '@mui/icons-material/Delete';


export const NoteView = () => {

    const { active: activeNote,isLoad } = useSelector(state => state.journal);
    const refFile = useRef();

    const { onInputChange, title, body, date, formState } = useForm01(activeNote)

    const dateString = useMemo(() => new Date(date).toDateString(), [date]);

    const dispatch = useDispatch();
    const onSaveNote = () => {
        dispatch(dispatch_updateNote(formState));
    }

    const onChangeFile = () => {
        const files = refFile.current.files;
        if (!files.length) return;
        dispatch(dispatch_saveFile(files))
    }

    const onDeleteNote = () => {
        dispatch(dispatch_deleteNote())
    }


    return (
        <Grid container direction={'row'} justifyContent={'space-between'}
            sx={{ mb: 1 }}
        >
            
            <Grid item>
                <Typography fontSize={39} fontWeight={'light'}>
                    {dateString}
                </Typography>
            </Grid>
            <Grid item style={{ display: 'none' }}  >
                <input type="file" multiple ref={refFile} onChange={onChangeFile} name="files[]" />
            </Grid>

            <Grid item>
                <Button onClick={onDeleteNote} disabled={isLoad} >
                    <DeleteIcon sx={{ fontSize: 30, mr: 1 }} />
                </Button>
                <Button onClick={() => refFile.current.click()} disabled={isLoad} >
                    <UpgradeIcon sx={{ fontSize: 30, mr: 1 }} />
                </Button>

                <Button onClick={onSaveNote} disabled={isLoad} >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>

            </Grid>
            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un título"
                    label='Título'
                    sx={{ border: 'none', mb: 1 }}
                    name="title"
                    value={title}
                    onChange={onInputChange}
                // error
                // helperText='plop'
                />
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Qué sucedio el día de hoy?"
                    label='body'
                    sx={{ border: 'none', mb: 1 }}
                    name="body"
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            <ImageGallery itemData={activeNote.images} />

        </Grid>
    )
}
