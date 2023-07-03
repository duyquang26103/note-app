import React, {useContext} from "react";
import {
    Avatar,
    Box,
    Button,
    createTheme,
    CssBaseline,
    Grid, Paper,
    ThemeProvider,
    Typography
} from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { AuthContext } from "../context/AuthProvider";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { graphQLRequest } from "../utils/request";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {authorLoader} from "../utils/AuthorUtils";
// const bcrypt = require('bcryptjs');

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export default function Login() {
    const auth = getAuth();
    const { user } = useContext(AuthContext);
    const defaultTheme = createTheme();
    const navigate = useNavigate();

    const handleLoginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();

        const {
            user: { uid, displayName }
        } = await signInWithPopup(auth, provider);
        const { data } = await graphQLRequest({
            query: `mutation register($uid: String!, $name: String!){
            register(uid: $uid, name: $name) {
                uid
                name
            }
        }`, variables: {
            uid,
                name: displayName,
            }});
    }

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     const username = data.get('username');
    //     const password = data.get('password');
    //
    //     const hash = bcrypt.hashSync(password,"$2a$10$m4NDunPOgN.5EXbQQfSqKO")
    //     const {author} = await authorLoader({
    //         username
    //     });
    //
    //     if (author && author.password === hash) {
    //         delete author.password
    //         // setCookie("accessToken",JSON.stringify(author));
    //         localStorage.setItem('accessToken', JSON.stringify(author))
    //         navigate('/folders');
    //     } else {
    //         console.log("login thất bại")
    //     }
    // };

    if (localStorage.getItem('accessToken')) {
        return <Navigate to='/'/>;
    }

    return (
        <>
            {/*<Typography variant='h5' sx={{marginBottom: '10px'}}>Welcome to Note App</Typography>*/}


            <ThemeProvider theme={defaultTheme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                {/*<TextField*/}
                                {/*    margin="normal"*/}
                                {/*    required*/}
                                {/*    fullWidth*/}
                                {/*    id="username"*/}
                                {/*    label="User Name"*/}
                                {/*    name="username"*/}
                                {/*    autoComplete="username"*/}
                                {/*    autoFocus*/}
                                {/*/>*/}
                                {/*<TextField*/}
                                {/*    margin="normal"*/}
                                {/*    required*/}
                                {/*    fullWidth*/}
                                {/*    name="password"*/}
                                {/*    label="Password"*/}
                                {/*    type="password"*/}
                                {/*    id="password"*/}
                                {/*    autoComplete="current-password"*/}
                                {/*/>*/}
                                {/*<FormControlLabel*/}
                                {/*    control={<Checkbox value="remember" color="primary" />}*/}
                                {/*    label="Remember me"*/}
                                {/*/>*/}
                                {/*<Button*/}
                                {/*    type="submit"*/}
                                {/*    fullWidth*/}
                                {/*    variant="contained"*/}
                                {/*    sx={{ mt: 3, mb: 2 }}*/}
                                {/*>*/}
                                {/*    Sign In*/}
                                {/*</Button>*/}

                                <Button variant='outlined' onClick={handleLoginWithGoogle}>
                                    Login with Google
                                </Button>

                                <Grid container justifyContent="flex-end">
                                    <Grid item sx={{mr: '15px'}}>
                                        <Link to="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link to='/signup' variant="body2">
                                            Don't have an account? Sign up
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    )
}