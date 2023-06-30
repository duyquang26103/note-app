import React, {useContext} from "react";
import {Button, Grid, Typography} from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { AuthContext } from "../context/AuthProvider";
import {Link, Navigate} from "react-router-dom";
import { graphQLRequest } from "../utils/request";

export default function Login() {
    const auth = getAuth();
    const { user } = useContext(AuthContext);

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

    if (localStorage.getItem('accessToken')) {
        return <Navigate to='/'/>;
    }

    return (
        <>
            <Typography variant='h5' sx={{marginBottom: '10px'}}>Welcome to Note App</Typography>
            <Button variant='outlined' onClick={handleLoginWithGoogle}>
                Login with Google
            </Button>
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link to='/signup' variant="body2">
                        Don't have an account? Sign up
                    </Link>
                </Grid>
            </Grid>
        </>
    )
}