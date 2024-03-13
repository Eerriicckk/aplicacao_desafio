import React from 'react'

const EditarInterveniente = (props) => {
    const idProcess = props.idInterv;
    const handleDeletion = async (idDelete) => {
        console.log("teste");
        if (typeof idDelete === "string") {
            idDelete = parseInt(idDelete);
        }
        await fetch("api/Intervenientes/" + idDelete,
            {
                method: 'PUT',
                mode: 'cors',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    {
                        "ID": idDelete,
                        "Exportador": "Exportador"+Date.now(),
                        "Importador": "Importador",
                        "DataEmbarque": "2024-02-02T10:00:00",
                        "PrevisaoDeEmbarque": "2024-02-02T10:00:00",
                        "DataChegada": "2024-02-02T10:00:00",
                        "PrevisaoDeChegada": "2024-02-02T10:00:00",
                        "DI": "000456000",
                        "Navio": "Navio",
                        "Master": "Master",
                        "House": "House",
                        "Fatura": "Fatura",
                        "FreteModo": "FreteModo",
                        "Container": "Container",
                        "CanalParametrizacao": "CanalParametrizacao",
                        "Origem": "Origem",
                        "Destino": "Destino",
                        "LiberadoParaFaturamento": "2024-02-02T10:00:00"
                    }
                )
            }
        )
    }

    return (
        <div>
            <button onClick={() => handleDeletion(idProcess)}>editar {idProcess}</button>
        </div>
    )
}

export default EditarInterveniente