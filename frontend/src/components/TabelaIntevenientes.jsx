import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Box, Button, ButtonGroup, ThemeProvider} from '@mui/material';
import theme from  './CustomThemes';

const TabelaIntevenientes = ({ isActive }) => {

    const [intervenientes, setIntervenientes] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [lastPage, setlastPage] = useState(1);
    const [totalReg, setTotalReg] = useState(0);
    const [disPrevBtn, setDisPrevBtn] = useState(true);
    const [disNextBtn, setDisNextBtn] = useState(false);
    const [headerData, setHeaderData] = useState([
        { field: "canalParametrizacao" },
        { field: "container" },
        { field: "dataChegada" },
        { field: "dataEmbarque" },
        { field: "destino" },
        { field: "di" },
        { field: "exportador" },
        { field: "fatura" },
        { field: "freteModo" },
        { field: "house" },
        { field: "importador" },
        { field: "liberadoParaFaturamento" },
        { field: "master" },
        { field: "navio" },
        { field: "origem" },
        { field: "previsaoDeChegada" },
        { field: "previsaoDeEmbarque" }
    ]);

    useEffect(() => {
        populateIntervenienteData(pageNumber);
    }, [isActive]);

    const handlePageShift = async (pNewPageNumber) => {
        if (pNewPageNumber <= 1) {
            pNewPageNumber = 1;
            setDisPrevBtn(true);
        } else {
            setDisPrevBtn(false);
        }
        if (pNewPageNumber >= lastPage) {
            setDisNextBtn(true);
            pNewPageNumber = lastPage;
        } else {
            setDisNextBtn(false);
        }
        setPageNumber(pNewPageNumber);
        populateIntervenienteData(pNewPageNumber);

    }

    const contents = intervenientes === undefined
        ? (<p>Carregando...</p>)
        : (
            <div className='ag-theme-quartz' style={{ height: '500px' }}>
                <AgGridReact rowData={intervenientes} columnDefs={headerData} />
            </div>
        );
    //

    async function populateIntervenienteData(pageNumber) {

        const fetchString = 'api/Intervenientes/ShowInterv?page=' + pageNumber
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
        <Box>
            {isActive ? (
                <div>
                    <div id="testediv">
                        <p style={{marginTop:0}}>pagina atual: {pageNumber}</p>
                        <p>ultima pagina: {lastPage}</p>
                        <p>total registros: {totalReg}</p>
                    </div>

                    <ThemeProvider theme={theme}>
                        <ButtonGroup variant="contained">
                            <Button onClick={() => handlePageShift(pageNumber - 1)} color='primary' disabled={disPrevBtn}>Pag anterior</Button>
                            <Button onClick={() => handlePageShift(pageNumber + 1)} color='secondary' disabled={disNextBtn}>Pag seguinte</Button>
                        </ButtonGroup>
                    </ThemeProvider>

                    <div className='divTableIntervenientes'>
                        <br />
                        {contents}
                    </div>
                </div>
            ) : (
                <div></div>
            )}

        </Box>)

}

export default TabelaIntevenientes