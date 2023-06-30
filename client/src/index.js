import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from "react-router-dom";
import router from "./router";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container } from "@mui/material";
import './firebase/config'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
      <Container maxWidth='lg' sx={{ textAlign: 'center', marginTop: '50px'}}>
          <RouterProvider router={router} />
      </Container>
  </>
);

reportWebVitals();
