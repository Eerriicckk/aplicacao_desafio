import { useEffect, useState } from 'react';
import RemoverInterveniente from './RemoverInterveniente';
import EditarInterveniente from './EditarInterveniente';

const TabelaIntevenientes = () => {

    const [intervenientes, setIntervenientes] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [lastPage, setlastPage] = useState(1);
    const [totalReg, setTotalReg] = useState(0);

    useEffect(() => {
        populateIntervenienteData(pageNumber);
    }, []);

    const handlePageShift = async (pNewPageNumber) => {
        if (pNewPageNumber <= 0) {
            pNewPageNumber = 1;
        }else if(pNewPageNumber > lastPage){
            pNewPageNumber = lastPage;
        }
        setPageNumber(pNewPageNumber);
        populateIntervenienteData(pNewPageNumber);

    }

    const contents = intervenientes === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    {/* <th>opções</th> */}
                    <th>canalParametrizacao</th>
                    <th>container</th>
                    <th>dataChegada</th>
                    <th>dataEmbarque</th>
                    <th>destino</th>
                    <th>di</th>
                    <th>exportador</th>
                    <th>fatura</th>
                    <th>freteModo</th>
                    <th>house</th>
                    <th>importador</th>
                    <th>liberadoParaFaturamento</th>
                    <th>master</th>
                    <th>navio</th>
                    <th>origem</th>
                    <th>previsaoDeChegada</th>
                    <th>previsaoDeEmbarque</th>
                </tr>
            </thead>
            <tbody>
                {intervenientes.map(interveniente =>
                    <tr key={interveniente.id}>
                        {/* <td>
                            id:{interveniente.id}
                            <EditarInterveniente idInterv={interveniente.id} />
                            <RemoverInterveniente idInterv={interveniente.id} />
                        </td> */}
                        <td>{interveniente.canalParametrizacao}</td>
                        <td>{interveniente.container}</td>
                        <td>{interveniente.dataChegada}</td>
                        <td>{interveniente.dataEmbarque}</td>
                        <td>{interveniente.destino}</td>
                        <td>{interveniente.di}</td>
                        <td>{interveniente.exportador}</td>
                        <td>{interveniente.fatura}</td>
                        <td>{interveniente.freteModo}</td>
                        <td>{interveniente.house}</td>
                        <td>{interveniente.importador}</td>
                        <td>{interveniente.liberadoParaFaturamento}</td>
                        <td>{interveniente.master}</td>
                        <td>{interveniente.navio}</td>
                        <td>{interveniente.origem}</td>
                        <td>{interveniente.previsaoDeChegada}</td>
                        <td>{interveniente.previsaoDeEmbarque}</td>
                    </tr>
                )}
            </tbody>
        </table>;
    //

    async function populateIntervenienteData(pageNumber) {

        const fetchString = 'api/IntervenientesDump/ShowInterv?page=' + pageNumber
            + '&sort=a'
            + '&fieldSort=1'
            + '&perPage=10';

        const response = await fetch(fetchString);
        const data = await response.json();

        setlastPage(data.last_page);
        setTotalReg(data.total);
        setIntervenientes(data.data);
    }

    return (
        <div>

            <p>pagina atual: {pageNumber}</p>
            <p>ultima pagina: {lastPage}</p>
            <p>total registros: {totalReg}</p>
            <div id="testediv">
                <button onClick={() => handlePageShift(pageNumber - 1)}>Pag anterior</button>
                <button onClick={() => handlePageShift(pageNumber + 1)}>Pag seguinte</button>
            </div>
            <div className='divTableIntervenientes'>
                {contents}
            </div>
        </div>
    )

}

export default TabelaIntevenientes