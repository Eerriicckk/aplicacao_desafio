import { useState } from "react"

const CriarInterveniente = () => {

    const handleCreation = () => {
        fetch("api/IntervenientesDump",
            {
                method: 'POST',
                mode: 'cors',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    {
                        "Exportador": "Exportador" + Date.now(),
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
            <p>{Date.now()}</p>
            <button onClick={() => handleCreation()}>Criar registro</button>
        </div>
    )
}

export default CriarInterveniente