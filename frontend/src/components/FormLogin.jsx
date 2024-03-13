import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'

const FormLogin = ({ isActive, isLogged }) => {

    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [isErrName, setIsErrName] = useState(false);
    const [isErrPwd, setIsErrPwd] = useState(false);
    const [infoErr, setInfoErr] = useState("Campo não pode estar vazio");

    const handleName = (inputEvent) => {
        var newName = inputEvent.target.value.trim();
        if (!newName) {
            setIsErrName(true);
        } else {
            setIsErrName(false);
        }
        setName(newName);
    }

    const handlePassword = (inputEvent) => {
        
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

        const data = await response.json();

        if (data[0]) {
            if (data[0].name === name && data[0].password === password){
                isLogged(true);
                setName("");
                setPassword("");
            }
        }
        //limpa form
        // setName("");
        // setPassword("");
    }

    return (
        <Box>
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
                <Button type="submit" variant='contained'>Entrar</Button>
            </form>
        </Box>
    )
}

export default FormLogin