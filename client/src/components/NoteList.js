import React, {useEffect, useState} from 'react';
import {Box, Card, CardContent, Grid, IconButton, List, Tooltip, Typography} from "@mui/material";
import {Link, Outlet, useLoaderData, useParams, useSubmit, useNavigate} from "react-router-dom";
import {NoteAddOutlined} from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import {deleteNote} from "../utils/noteUtils";

export default function NoteList() {
    const {noteId, folderId} = useParams();
    const {folder} = useLoaderData();
    const [folderState, setFolderState] = useState(folder);
    const [activeNoteId, setActiveNoteId] = useState(noteId);
    const submit = useSubmit();
    const navigate = useNavigate();

    useEffect( () => {
        setFolderState(folder);

        if (noteId) {
            setActiveNoteId(noteId);
            return;
        }

        if (folder?.notes?.[0]) {
            navigate(`note/${folder.notes[0].id}`)
        }

    }, [folder, noteId, folder.notes])

    const handleAddNewNote = () => {
        submit({
            content: '',
            folderId
        }, {method: 'post', action: `/folders/${folderId}`})
    }

    const handleDeleteNote = async (id) => {
        const noteId = id.toString();
        const notes = [...folderState.notes]
        const index = notes.findIndex(item => item.id === noteId);
        notes.splice(index, 1);
        setFolderState({...folderState, notes});
        await deleteNote({noteId});
    }

    const convertDate = (time) => {
        const newDate = new Date(time);
        const hour = newDate.getHours();
        let minutes = newDate.getMinutes();
        minutes = minutes < 10 ? `0${minutes}` : minutes
        return `${time.split('T')[0]}, ${hour}:${minutes}`;
    }

    return (
        <Grid container height='100%'>
            <Grid item xs={4} sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: '#F0EBE3',
                height: '100%',
                overflowY: 'auto',
                padding: '10px',
                textAlign: 'left'
            }}>
                <List
                    subheader={
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Typography sx={{fontWeight: 'bold'}}>Notes</Typography>
                            <Tooltip title='Add Note' onClick={handleAddNewNote}>
                                <IconButton size='small'>
                                    <NoteAddOutlined/>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    }>
                    {
                        folderState.notes.map(({id, content, updatedAt}) => {
                            return (
                                <div
                                    key={id}
                                    style={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                                >
                                    <Link
                                        to={`note/${id}`}
                                        style={{textDecoration: 'none', width: '100%'}}
                                        onClick={() => setActiveNoteId(id)}>
                                        <Card sx={{
                                            mb: '5px',
                                            backgroundColor: id === activeNoteId ? 'rgb(255 211 140)' : null,
                                        }}>
                                            <CardContent sx={{'&:last-child': {pb: '10px'}, padding: '10px'}}>
                                                <div style={{fontSize: 14, fontWeight: 'bold'}}
                                                     dangerouslySetInnerHTML={{__html: `${content.substring(0, 30) || 'Empty'}`}}
                                                />
                                                <div style={{fontSize: 11}}>{convertDate(updatedAt)}</div>
                                            </CardContent>

                                        </Card>
                                    </Link>
                                    <Tooltip title='Delete Note' onClick={() => handleDeleteNote(id)}>
                                        <IconButton size='small'>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            )
                        })
                    }
                </List>
            </Grid>
            <Grid item xs={8}>
                <Outlet/>
            </Grid>
        </Grid>
    );
}
