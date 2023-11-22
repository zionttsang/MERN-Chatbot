import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'

import axios from "axios";
axios.defaults.baseURL = "http://localhost:5001/api/v1";
axios.defaults.withCredentials = true;


// set theme
const theme = createTheme({
	typography: { fontFamily: 'Robot Slab, serif', allVariants: { color: 'white' } }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<AuthProvider>
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<App />
				</ThemeProvider>
			</BrowserRouter>
		</AuthProvider>
	</React.StrictMode>,
)
