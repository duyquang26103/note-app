import React, { useState } from "react";
import {Box, Grid, Typography} from "@mui/material";
import UserMenu from "../components/UserMenu";
import FolderList from "../components/FolderList";
import {Outlet, useLoaderData} from "react-router-dom";
import UploadImage from "../components/UploadImage";

export default function Home () {
    const { folders } = useLoaderData();
    const [bgImage, setBgImage] = useState('');
    const bg = bgImage? {backgroundImage: `url(${bgImage.imageUrl})`, borderRadius: '15px'} : {backgroundColor: '#fffae7', borderRadius: '15px'}

    return (
        <div style={bg}>
            <Typography variant='h3' sx={{mb: '20px', color: "#2882F8", textShadow: '10px 10px 10px hotpink'}}>
                Note App
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'right', mb: '10px'}}>
                <UserMenu />
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'right', mb: '10px'}}>
                <UploadImage setBgImage={setBgImage}/>
            </Box>

            <Grid container sx={{height: '50vh', boxShadow: '0 0 15px 0 rgb(193 193 193 / 60%)', borderRadius: '15px'}}>
                <Grid item xs={3} sx={{height: '100%'}}>
                    <FolderList folders={folders} />
                </Grid>
                <Grid item xs={9} sx={{height: '100%'}}>
                    <Outlet />
                </Grid>
            </Grid>
        </div>
    )
}