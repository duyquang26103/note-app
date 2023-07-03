import React, { useState } from "react";
import { Box, Button, Grid, IconButton, Menu, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { styled, alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import UserMenu from "../components/UserMenu";
import FolderList from "../components/FolderList";
import PushNotification from "../components/PushNotification";
import { Outlet, useLoaderData } from "react-router-dom";
import UploadImage from "../components/UploadImage";
import { CSVLink } from "react-csv";
import * as XLSX from 'xlsx';


const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export default function Home () {
    const { folders } = useLoaderData();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [bgImage, setBgImage] = useState('');

    const open = Boolean(anchorEl);
    const bg = bgImage? {backgroundImage: `url(${bgImage.imageUrl})`, borderRadius: '15px'} : {backgroundColor: '#fffae7', borderRadius: '15px'}
    const data = JSON.parse(JSON.stringify(folders));
    data.map(item => {
        item['notes'] = JSON.stringify(item['notes']);
    });

    const exportXlsx = (data) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'note');
        XLSX.writeFile(workbook, `folders.xlsx`, { compression: true });
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div style={bg}>
            <Typography variant='h3' sx={{mb: '20px', color: "#2882F8", textShadow: '10px 10px 10px hotpink'}}>
                Note App
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'right', mb: '10px'}}>
                <UserMenu />
                <PushNotification />
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'right', mb: '10px'}}>
                <UploadImage setBgImage={setBgImage}/>

                <Button
                    id="demo-customized-button"
                    aria-controls={open ? 'demo-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    variant="contained"
                    disableElevation
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon />}
                >
                    Options
                </Button>
                <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose} disableRipple>
                        <IconButton size='large'>
                            <CSVLink id='export-csv' data={data}>
                                <FileDownloadIcon />
                                <span style={{fontSize: '14px', color: '#757575'}}>Export CSV File</span>
                            </CSVLink>
                        </IconButton>
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                        <IconButton onClick={()=>exportXlsx(data)} size='large'>
                            <FileDownloadIcon />
                            <span style={{fontSize: '14px'}}>Export Excel File</span>
                        </IconButton>
                    </MenuItem>
                </StyledMenu>
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