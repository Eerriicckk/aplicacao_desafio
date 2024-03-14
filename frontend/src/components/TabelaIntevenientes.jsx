import { useCallback, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Box, Button, ButtonGroup, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import theme from './CustomThemes';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import "dayjs/locale/pt-br";
import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from '@mui/icons-material';
import EditarInterveniente from './EditarInterveniente';

const CustomButtonComponent = (props) => {
    return (
        <EditarInterveniente regInfo={props}/>
    );
};

const CustomDateTimePicker = ({ name, label, required, pOnChange, dtInicial, value }) => {

    const handleOnChange = (event) => {
        pOnChange(event);
    }
    var dateTeste = "";
    if (dtInicial !== undefined) {
        dateTeste = dayjs(dtInicial);
    }

    return (
        <DatePicker
            sx={(theme) => ({
                backgroundColor: "#ffffff",
                borderRadius: '4px',
                width: 219,
                ":hover": {
                    backgroundColor: "#bfbfbf"
                }
            })}
            slotProps={{
                textField: {
                    required: required,
                }
            }}
            format="DD/MM/YYYY"
            defaultValue={dayjs(value)}
            value={dayjs(value) ?? dayjs()}
            minDate={dateTeste}
            theme={theme} name={name} label={label} onChange={handleOnChange} color='primary' />
    )

}

const CustomSelect = ({ name, label, pOnChange, required, value, children }) => {

    const handleOnChange = (event) => {
        pOnChange(event.target.value);
    }
    return (
        <FormControl
            sx={(theme) => ({
                m: 1,
                minWidth: 219,
                borderRadius: '4px'
            })}
            theme={theme}
            required={required}
        >
            <InputLabel id="custom-select-label">{label}</InputLabel>
            <Select
                labelId="custom-select-label"
                id="custom-select"
                label={label}
                name={name}
                value={value}
                onChange={handleOnChange}
                variant="outlined"
                sx={(theme) => ({
                    backgroundColor: "#ffffff",
                    borderRadius: '4px',
                    ":hover": {
                        backgroundColor: "#bfbfbf"
                    }
                })}
                theme={theme}
            >
                {children}
            </Select>
        </FormControl>
    )

}

const TabelaIntevenientes = ({ isActive, onShow }) => {

    const [intervenientes, setIntervenientes] = useState();
    const tableRef = useRef();
    // new Date(Date.now() - 1*(24*60*60*1000)) subtrai um dia da data
    const [dtInicial, setDtInicial] = useState(new Date(Date.now() - 30 * (24 * 60 * 60 * 1000)));
    const [dtFinal, setDtFinal] = useState(new Date());
    const [searchField, setSearchField] = useState("DataChegada");
    const [tableHeight, setTableHeight] = useState("480px");
    const [headerData, setHeaderData] = useState([
        { field: "ações", cellRenderer: CustomButtonComponent, suppressMovable: true, lockPosition: 'left', initialWidth: 120 },
        { field: "di", headerName: "Declaração de importação", initialWidth: 220, filter: 'agNumberColumnFilter', },
        { field: "container", headerName: "Container", initialWidth: 120, filter: 'agTextColumnFilter', },
        { field: "destino", headerName: "Destino", initialWidth: 100, filter: 'agTextColumnFilter', },
        { field: "navio", headerName: "Navio", initialWidth: 100, filter: 'agTextColumnFilter', },
        { field: "exportador", headerName: "Exportador", initialWidth: 120, filter: 'agTextColumnFilter', },
        { field: "importador", headerName: "Importador", initialWidth: 130, filter: 'agTextColumnFilter', },
        { field: "fatura", headerName: "Fatura", initialWidth: 100, filter: 'agTextColumnFilter', },
        { field: "liberadoParaFaturamento", headerName: "Liberado para faturamento", initialWidth: 180, valueFormatter: (v) => jsonDateToString(v.value), filter: 'agDateColumnFilter', },
        { field: "house", headerName: "House", initialWidth: 100, filter: 'agTextColumnFilter', },
        { field: "master", headerName: "Master", initialWidth: 100, filter: 'agTextColumnFilter', },
        { field: "origem", headerName: "Origem", initialWidth: 100, filter: 'agTextColumnFilter', },
        { field: "canalParametrizacao", headerName: "Canal parametrizacao", initialWidth: 220, filter: 'agTextColumnFilter', },
        { field: "freteModo", headerName: "Modo de frete", initialWidth: 150, filter: 'agTextColumnFilter', },
        { field: "dataChegada", headerName: "Data de chegada", initialWidth: 180, valueFormatter: (v) => jsonDateToString(v.value), filter: 'agDateColumnFilter', },
        { field: "previsaoDeChegada", headerName: "Previsao de chegada", initialWidth: 180, valueFormatter: (v) => jsonDateToString(v.value), filter: 'agDateColumnFilter', },
        { field: "dataEmbarque", headerName: "Data de embarque", initialWidth: 180, valueFormatter: (v) => jsonDateToString(v.value), filter: 'agDateColumnFilter', },
        { field: "previsaoDeEmbarque", headerName: "Previsao de embarque", initialWidth: 180, valueFormatter: (v) => jsonDateToString(v.value), filter: 'agDateColumnFilter', },
    ]);

    const handleChgSetDtFinal = (newValue) => {
        setDtFinal(newValue);
    }

    const handleChgSetDtInicial = (newValue) => {
        setDtInicial(newValue);
    }

    const handleChgSearchField = (newValue) => {
        setSearchField(newValue);
    }

    async function handleSubmit(e) {

        e.preventDefault();
        populateIntervenienteData(dtInicial, dtFinal, searchField);
    }

    // useEffect(() => {
    //     populateIntervenienteData(pageNumber, dtInicial, dtFinal);
    // }, []);

    const onBtnUpdate = useCallback(() => {
        tableRef.current.api.exportDataAsCsv();
    }, []);

    const onBtFirst = useCallback(() => {
        tableRef.current.api.paginationGoToFirstPage();
    }, []);

    const onBtLast = useCallback(() => {
        tableRef.current.api.paginationGoToLastPage();
    }, []);

    const onBtNext = useCallback(() => {
        tableRef.current.api.paginationGoToNextPage();
    }, []);

    const onBtPrevious = useCallback(() => {
        tableRef.current.api.paginationGoToPreviousPage();
    }, []);

    const onPaginationChanged = useCallback(() => {
        if (tableRef.current.api) {
            setText(
                '#lbCurrentPage',
                tableRef.current.api.paginationGetCurrentPage() + 1
            );
            setText('#lbTotalPages', tableRef.current.api.paginationGetTotalPages());
            setLastButtonDisabled(!tableRef.current.api.paginationIsLastPageFound());
        }
    }, []);

    const contents = intervenientes === undefined
        ? (<div></div>)
        : (
            <Box>
                <div className='ag-theme-quartz' style={{ height: tableHeight }}>
                    <AgGridReact
                        ref={tableRef}
                        rowData={intervenientes}
                        columnDefs={headerData}
                        pagination={true}
                        suppressPaginationPanel={true}
                        onPaginationChanged={onPaginationChanged}
                        paginationPageSize={20}
                    />
                </div>
                <br />
                <Grid container rowSpacing={1} columns={12}>
                    <Grid item xxs={12} theme={theme}>
                        <Button onClick={onBtnUpdate} variant='contained'>exportar tabela</Button>
                    </Grid>
                    <Grid item sm={6} lg={8} theme={theme} >
                    </Grid>
                    <Grid item xxs={12} sm={3} lg={2} theme={theme} >
                        pag: <span id="lbCurrentPage" style={{ color: 'black' }} /> de <span id="lbTotalPages" style={{ color: 'black' }} />
                    </Grid>
                    <Grid item xxs={12} sm={3} lg={2} theme={theme}>
                        <Box>
                            <ButtonGroup>
                                <Button onClick={onBtFirst} variant='outlined' size="small" ><FirstPage /></Button>
                                <Button onClick={onBtNext} variant='outlined' size="small"><KeyboardArrowLeft /></Button>
                                <Button onClick={onBtPrevious} variant='outlined' size="small" ><KeyboardArrowRight /></Button>
                                <Button onClick={onBtLast} id='btLast' variant='outlined' size="small"><LastPage /></Button>
                            </ButtonGroup>
                        </Box>
                    </Grid>

                </Grid>
            </Box>
        );
    //

    async function populateIntervenienteData(dtInicial, dtFinal, searchField) {

        const fetchString = 'api/Intervenientes/ShowInterv?page=1'
            + '&sort=a'
            + '&dtInicial=' + dateToJsonString(dtInicial)
            + '&dtFinal=' + dateToJsonString(dtFinal)
            + '&sortField=' + searchField
            + '&perPage=10000';

        const response = await fetch(fetchString);
        const data = await response.json();
        if (data.total < 10) {
            setTableHeight((data.total * 40) + 135 + "px")
        }
        setIntervenientes(data.data);
    }

    return (
        <Box>
            {isActive ? (
                <div>
                    <Box>
                        <h1 style={{ color: "grey" }}>Tabela de intervenientes</h1>
                        <form onSubmit={handleSubmit}>
                            <Grid container rowSpacing={1} columnSpacing={0} >
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
                                    <Grid item xxs={12} lg={4} theme={theme}>
                                        <CustomSelect name="freteModo" label="Pesquisar" defaulValue={searchField} required={true} value={searchField} pOnChange={handleChgSearchField}>
                                            <MenuItem value={"DataChegada"}>Data de chegada</MenuItem>
                                            <MenuItem value={"PrevisaoDeChegada"}>Previsão de chegada</MenuItem>
                                            <MenuItem value={"DataEmbarque"}>Data de embarque</MenuItem>
                                            <MenuItem value={"PrevisaoDeEmbarque"}>Previsão de embarque</MenuItem>
                                            <MenuItem value={"LiberadoParaFaturamento"}>Liberado para faturamento</MenuItem>
                                        </CustomSelect>
                                    </Grid>
                                    <Grid item xxs={12} smd={6} lg={4} theme={theme}>
                                        <CustomDateTimePicker name="dtInicial" label="De" required={true} value={dtInicial} pOnChange={handleChgSetDtInicial} />
                                    </Grid>
                                    <Grid item xxs={12} smd={6} lg={4} theme={theme}>
                                        <CustomDateTimePicker name="dtFinal" label="Até" required={true} value={dtFinal} dtInicial={dtInicial} pOnChange={handleChgSetDtFinal} />
                                    </Grid>

                                    <Grid item xxs={12} theme={theme}>
                                        <Button type="submit" variant='contained' sx={{ marginTop: "15px", marginBottom: "20px" }}>Pesquisar</Button>
                                    </Grid>

                                </LocalizationProvider>
                            </Grid>
                        </form>

                    </Box>
                    <hr />
                    <div className='divTableIntervenientes'>
                        <br />
                        {contents}
                        <br />
                        <br />
                        <br />
                    </div>
                </div >
            ) : (
                <div></div>
            )}

        </Box >)

}

const setText = (selector, text) => {
    document.querySelector(selector).innerHTML = text;
};

const setLastButtonDisabled = (disabled) => {
    document.querySelector('#btLast').disabled = disabled;
};

function dateToJsonString(data) {
    return data.toISOString().split('.')[0] + "Z".replace('Z', '')
}

function jsonDateToString(dataJson) {
    const data = new Date(dataJson);
    // const data = dayjs(dataJson).tz('America/Sao_Paulo');

    return data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear() + " " + data.getHours() + ":" + data.getMinutes()
}

export default TabelaIntevenientes