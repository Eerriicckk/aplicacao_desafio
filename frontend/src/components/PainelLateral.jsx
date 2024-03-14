import { useState } from 'react';
import React from 'react'

import { Box, Drawer, Grid, List, ListItemButton, Tab, Tabs, Typography, createTheme } from '@mui/material';
import { AddCircle, Close, Logout, TableChart, Update, Widgets } from '@mui/icons-material';
import theme from  './CustomThemes';


const CustomListButton = ({ onListClick, isSelected, children}) => {

    return (
        <ListItemButton sx={(theme) => ({
            [theme.breakpoints.down('sm')]: {
                paddingLeft: 0.5,
                paddingRight: 0.5,
            },
            [theme.breakpoints.up('sm')]: {
                paddingLeft: 1,
                paddingRight: 1,
            },
            [theme.breakpoints.up('lg')]: {
                paddingLeft: 2,
                paddingRight: 2,
            },
            "&.Mui-selected": {
                backgroundColor: "#3F5768"
            },
            "&.Mui-focusVisible": {
                backgroundColor: "#3F5768"
            },
            ":hover": {
                backgroundColor: "#336"
            },
            "&.Mui-selected:hover": {
                backgroundColor: "#336"
            },
        })}
            theme={theme} onClick={onListClick} selected={isSelected} color='secondary'
        >
            {children}
        </ListItemButton>
    )
}

const PainelLateral = ({ onChangeIndex, pageIndex }) => {

    const [value, setValue] = useState(pageIndex);
    const [open, setOpen] = useState(false);

    function toggleDrawer(newOpen) {
        setOpen(newOpen);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleListButton = (index) => {
        onChangeIndex(index);
        setValue(index);
    }

    const handleLogOut = () => {
        localStorage.removeItem("logado");
        window.location.reload();
    }

    return (
        <div>
            <Box sx={(theme) => ({
                height: '100%',
                bgcolor: '#F69231',
                top: 0,
                position: 'fixed',
                zIndex: 3,
            })}
                theme={theme}
            >
                <List sx={{ padding: 0 }}>
                    <CustomListButton onListClick={() => toggleDrawer(true)} isSelected={false}>
                        <Widgets />
                    </CustomListButton>
                    <CustomListButton onListClick={() => handleListButton(0)} isSelected={value === 0}>
                        <AddCircle />
                    </CustomListButton>
                    <CustomListButton onListClick={() => handleListButton(1)} isSelected={value === 1}>
                        <TableChart />
                    </CustomListButton>
                </List>

                <Drawer open={open} onClose={() => toggleDrawer(false)}>

                    <Grid container spacing={0}>
                        <Grid item xs={9}>
                            <ListItemButton sx={{ float: 'left' }} onClick={handleLogOut}><Logout sx={{transform:'scaleX(-1)'}} /> 
                            <br />
                            <Typography  variant="caption" >
                                Sair
                            </Typography>
                            </ListItemButton>
                        </Grid>

                        <Grid item xs={3}>
                            <ListItemButton sx={{ float: 'right' }} onClick={() => toggleDrawer(false)}><Close /></ListItemButton>
                        </Grid>
                        <Grid item xs={12}>
                            <Tabs value={value} onChange={handleChange} orientation="vertical">
                                <Tab icon={<AddCircle />} iconPosition='start' label="Criar registro" onClick={() => onChangeIndex(0)} />
                                <Tab icon={<TableChart />} iconPosition='start' label="Planilha de intervenientes" onClick={() => onChangeIndex(1)} />
                            </Tabs>
                        </Grid>
                    </Grid>


                </Drawer>
            </Box>
        </div >

    )
}

export default PainelLateral