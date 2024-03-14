import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import React from 'react'
import CriarInterveniente from './CriarInterveniente';

const EditarInterveniente = ({ regInfo }) => {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = () => {
        setOpen(true);
    }

    return (
        <div>
            <Button onClick={handleChange} variant='outlined' size='small' color='primary' >editar</Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogContent>
                    <DialogContentText>
                        <CriarInterveniente isActive={true} isAtualizacao={true} atuInfo={regInfo.data} title="Atualizar registro" btnSubmitText="Atualizar Registro"/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fechar sem salvar</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditarInterveniente
