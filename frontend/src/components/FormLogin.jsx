import { Box, Button, Container, TextField } from '@mui/material'
import React, { useState } from 'react'

const FormLogin = ({ isActive, isLogged }) => {

    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [isErrName, setIsErrName] = useState(false);
    const [isErrPwd, setIsErrPwd] = useState(false);
    const [infoErr, setInfoErr] = useState("Campo não pode estar vazio");

    const handleName = (inputEvent) => {
        setInfoErr("Campo não pode estar vazio");
        var newName = inputEvent.target.value.trim();
        if (!newName) {
            setIsErrName(true);
        } else {
            setIsErrName(false);
        }
        setName(newName);
    }

    const handlePassword = (inputEvent) => {

        setInfoErr("Campo não pode estar vazio");
        var newPwd = inputEvent.target.value.trim();
        if (!newPwd) {
            setIsErrPwd(true);
        } else {
            setIsErrPwd(false);
        }
        setPassword(newPwd)
    }

    async function handleSubmit(e) {

        e.preventDefault();

        const response = await fetch("api/Users/login",
            {
                method: 'POST',
                mode: 'cors',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    {
                        "Name": name,
                        "Password": password
                    }
                )
            }
        )
        if (!response.ok) {

            setIsErrName(true);
            setIsErrPwd(true);
            setInfoErr("Nome ou senha incorretos");
        } else {

            const data = await response.json();

            if (data[0]) {
                if (data[0].name === name && data[0].password === password) {
                    isLogged(true);
                    setName("");
                    setPassword("");
                }
            }
        }
        //limpa form
        // setName("");
        // setPassword("");
    }

    return (
        <Container>
            <Box sx={{ border: '3px solid #bfbfbf', boxShadow: '0px 10px 15px #888888', marginTop: '3em', borderRadius: '4px' }}>
                <img src="https://idata.com.br/wp-content/uploads/2021/07/cropped-logotipo_idata-software-02-1-e1678106358607.png"
                    alt="Logo Idata"
                    style={{ width: "100%" }} />
                <div style={{ color: 'grey' }}>
                    <h3>Sistema de visualização de intervenientes</h3>
                    <h3>Login</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <TextField
                        error={isErrName}
                        type="text"
                        name="name"
                        label="Nome"
                        size="small"
                        variant="outlined"
                        helperText={isErrName ? infoErr : ""}
                        required={true}
                        onChange={handleName} value={name}
                    />
                    <br />
                    <br />
                    <TextField
                        error={isErrPwd}
                        type="password"
                        name='password'
                        label="Senha"
                        size="small"
                        variant="outlined"
                        helperText={isErrName ? infoErr : ""}
                        required={true}
                        onChange={handlePassword} value={password}
                    />
                    <br />
                    <br />
                    <Button type="submit" variant='contained' sx={{ margin: '10px 0px 30px 0px' }}>Entrar</Button>
                </form>
            </Box>
        </Container>
    )
}

export default FormLogin