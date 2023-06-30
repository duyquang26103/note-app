import React from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();

    return (
        <div id='error-page'>
            <h1>Oops! This link is not valid.</h1>
            <p>Code: {error.status} {error.statusText || error.message}</p>
        </div>
    )
}