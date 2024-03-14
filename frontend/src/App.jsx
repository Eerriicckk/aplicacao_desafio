
import { Box, Container } from '@mui/material';
import './App.css';
import React, { useState } from 'react'
import PaginaHome from './PaginaHome';
import FormLogin from './components/FormLogin';
import theme from  './components/CustomThemes';

const App = () => {
	const [isLogged, setLogged] = useState(localStorage.getItem("logado") || false);

	function handleLogin(handleData) {
		setLogged(handleData);
		if (handleData) {
			localStorage.setItem("logado", handleData);
		} else {
			localStorage.removeItem("logado");
		}
	};

	const content = isLogged ? (
		<PaginaHome/>
	) : (
		<Container maxWidth="xs" >
			<FormLogin isLogged={handleLogin}/>
		</Container>
	)

	return (
		<Box sx={{ height: '100%', margin: 0 }}>
			{content}
		</Box>
	)
}

export default App