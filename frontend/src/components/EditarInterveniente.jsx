import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react'
import theme from './CustomThemes';
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
                <DialogTitle>Atualizar registro</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <CriarInterveniente isActive={true} isAtualizacao={true} atuInfo={regInfo.data} title="Atualizar registro" btnSubmitText="Atualizar Registro"/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fechar</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditarInterveniente



// if (typeof idChange === "string") {
//     idChange = parseInt(idChange);
// }
// await fetch("api/Intervenientes/" + idChange,
//     {
//         method: 'PUT',
//         mode: 'cors',
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(
//             {
//                 "ID": idChange,
//                 "Exportador": "Exportador"+Date.now(),
//                 "Importador": "Importador",
//                 "DataEmbarque": "2024-02-02T10:00:00",
//                 "PrevisaoDeEmbarque": "2024-02-02T10:00:00",
//                 "DataChegada": "2024-02-02T10:00:00",
//                 "PrevisaoDeChegada": "2024-02-02T10:00:00",
//                 "DI": "000456000",
//                 "Navio": "Navio",
//                 "Master": "Master",
//                 "House": "House",
//                 "Fatura": "Fatura",
//                 "FreteModo": "FreteModo",
//                 "Container": "Container",
//                 "CanalParametrizacao": "CanalParametrizacao",
//                 "Origem": "Origem",
//                 "Destino": "Destino",
//                 "LiberadoParaFaturamento": "2024-02-02T10:00:00"
//             }
//         )
//     }
// )