import { Alert, Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { DateTimePicker, LocalizationProvider, deDE, renderTimeViewClock } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import theme from './CustomThemes';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import tz from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(tz)

import "dayjs/locale/pt-br";
import moment from 'moment';


const CustomTextField = ({ name, label, required, pOnChange, value }) => {

    const handleOnChange = (e) => {
        pOnChange(e.target.value);
    }
    return (
        <TextField type="text"
            sx={(theme) => ({
                "&.MuiTextField-root": {
                    backgroundColor: "#ffffff",
                    borderRadius: '4px'
                },
                ":hover": {
                    backgroundColor: "#bfbfbf"
                }
            })}
            theme={theme} value={value ?? ""}
            name={name} label={label} size="small" variant="filled" required={required} onChange={handleOnChange} color='primary' />
    )

}

const CustomDateTimePicker = ({ name, label, required, pOnChange, placement = 'top-start', value }) => {

    var dataOk = dayjs(value).tz('America/Sao_Paulo');
    // alert(dataOk.tz('America/Sao_Paulo'));
    const handleOnChange = (event) => {
        pOnChange(event);
    }
    return (
        <DateTimePicker
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
                },
                popper: { placement: placement }
            }}
            viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
            }}
            defaultValue={dataOk}
            value={dataOk ?? dayjs().tz('America/Sao_Paulo')}
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

const CriarInterveniente = ({ isActive, atuInfo, isAtualizacao, title, btnSubmitText }) => {

    ///-------------------------------------------------\\\
    const [canalParame, setCanalParame] = useState("")
    const [container, setContainer] = useState("")
    const [dataChegada, setDataChegada] = useState(dayjs().tz('America/Sao_Paulo'))
    const [dataEmbarque, setDataEmbarque] = useState(dayjs().tz('America/Sao_Paulo'))
    const [destino, setDestino] = useState("")
    const [di, setDi] = useState("")
    const [exportador, setExportador] = useState("")
    const [fatura, setFatura] = useState("")
    const [freteModo, setFreteModo] = useState("")
    const [house, setHouse] = useState("")
    const [importador, setImportador] = useState("")
    const [libFat, setLibFat] = useState(dayjs().tz('America/Sao_Paulo'))
    const [master, setMaster] = useState("")
    const [navio, setNavio] = useState("")
    const [origem, setOrigem] = useState("")
    const [prevChegada, setPrevChegada] = useState(dayjs().tz('America/Sao_Paulo'))
    const [prevEmbarque, setPrevEmbarque] = useState(dayjs().tz('America/Sao_Paulo'))
    const [isAtu, setIsAtu] = useState(isAtualizacao ?? false);

    const handleChgCanalParame = (newValue) => {
        setCanalParame(newValue);
    }
    const handleChgContainer = (newValue) => {
        setContainer(newValue);
    }
    const handleChgDataChegada = (newValue) => {
        setDataChegada(newValue);
    }
    const handleChgDataEmbarque = (newValue) => {
        setDataEmbarque(newValue);
    }
    const handleChgDestino = (newValue) => {
        setDestino(newValue);
    }
    const handleChgDi = (newValue) => {
        setDi(newValue);
    }
    const handleChgExportador = (newValue) => {
        setExportador(newValue);
    }
    const handleChgFatura = (newValue) => {
        setFatura(newValue);
    }
    const handleChgHouse = (newValue) => {
        setHouse(newValue);
    }
    const handleChgImportador = (newValue) => {
        setImportador(newValue);
    }
    const handleChgLibFat = (newValue) => {
        var valueOk = dayjs(newValue).tz('America/Sao_Paulo');
        setLibFat(valueOk);
    }
    const handleChgMaster = (newValue) => {
        setMaster(newValue);
    }
    const handleChgNavio = (newValue) => {
        setNavio(newValue);
    }
    const handleChgOrigem = (newValue) => {
        setOrigem(newValue);
    }
    const handleChgPrevChegada = (newValue) => {
        setPrevChegada(newValue);
    }
    const handleChgPrevEmbarque = (newValue) => {
        setPrevEmbarque(newValue);
    }
    const handleChangeFreteModo = (modoFrete) => {
        setFreteModo(modoFrete);
    }

    ///-------------------------------------------------\\\

    if (isAtu) {
        useEffect(() => {
            handleChgCanalParame(atuInfo.canalParametrizacao);
            handleChgContainer(atuInfo.container);
            handleChgDataChegada(atuInfo.dataChegada);
            handleChgDataEmbarque(atuInfo.dataEmbarque);
            handleChgDestino(atuInfo.destino);
            handleChgDi(atuInfo.di);
            handleChgExportador(atuInfo.exportador);
            handleChgFatura(atuInfo.fatura);
            handleChgHouse(atuInfo.house);
            handleChgImportador(atuInfo.importador);
            handleChgLibFat(atuInfo.liberadoParaFaturamento);
            handleChgMaster(atuInfo.master);
            handleChgNavio(atuInfo.navio);
            handleChgOrigem(atuInfo.origem);
            handleChgPrevChegada(atuInfo.previsaoDeChegada);
            handleChgPrevEmbarque(atuInfo.previsaoDeEmbarque);
            handleChangeFreteModo(atuInfo.freteModo);

        }, [isAtu]);
    }

    async function handleSubmit(e) {

        e.preventDefault();
        handleCreation();
    }

    const handleCreation = () => {

        if (isAtu) {
            const strJsonFetch = JSON.stringify(
                {
                    "ID": atuInfo.id,
                    "Exportador": exportador,
                    "Importador": importador,
                    "DataEmbarque": dateToJsonString(dataEmbarque),
                    "PrevisaoDeEmbarque": dateToJsonString(prevEmbarque),
                    "DataChegada": dateToJsonString(dataChegada),
                    "PrevisaoDeChegada": dateToJsonString(prevChegada),
                    "DI": di,
                    "Navio": navio,
                    "Master": master,
                    "House": house,
                    "Fatura": fatura,
                    "FreteModo": freteModo,
                    "Container": container,
                    "CanalParametrizacao": canalParame,
                    "Origem": origem,
                    "Destino": destino,
                    "LiberadoParaFaturamento": dateToJsonString(libFat)
                })
            fetch("api/Intervenientes/" + atuInfo.id,
                {
                    method: 'PUT',
                    mode: 'cors',
                    headers: { "Content-Type": "application/json" },
                    body: strJsonFetch
                }
            )
        } else {

            handleChgCanalParame("");
            handleChgContainer("");
            handleChgDataChegada(dayjs().tz('America/Sao_Paulo'));
            handleChgDataEmbarque(dayjs().tz('America/Sao_Paulo'));
            handleChgDestino("");
            handleChgDi("");
            handleChgExportador("");
            handleChgFatura("");
            handleChgHouse("");
            handleChgImportador("");
            handleChgLibFat(dayjs().tz('America/Sao_Paulo'));
            handleChgMaster("");
            handleChgNavio("");
            handleChgOrigem("");
            handleChgPrevChegada(dayjs().tz('America/Sao_Paulo'));
            handleChgPrevEmbarque(dayjs().tz('America/Sao_Paulo'));
            handleChangeFreteModo("");

            fetch("api/Intervenientes",
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(
                        {
                            "Exportador": exportador,
                            "Importador": importador,
                            "DataEmbarque": dateToJsonString(dataEmbarque),
                            "PrevisaoDeEmbarque": dateToJsonString(prevEmbarque),
                            "DataChegada": dateToJsonString(dataChegada),
                            "PrevisaoDeChegada": dateToJsonString(prevChegada),
                            "DI": di,
                            "Navio": navio,
                            "Master": master,
                            "House": house,
                            "Fatura": fatura,
                            "FreteModo": freteModo,
                            "Container": container,
                            "CanalParametrizacao": canalParame,
                            "Origem": origem,
                            "Destino": destino,
                            "LiberadoParaFaturamento": dateToJsonString(libFat)
                        })
                }
            )
        }

        alert("Dados salvos!")
    }

    return (
        <Box sx={{ overflowY: 'auto' }}>
            {isActive ? (
                <div>
                    <h1>{title}</h1>
                    <form onSubmit={handleSubmit}>
                        <br />

                        {isAtu ? <Button type="submit" variant='contained' sx={{ marginTop: "15px", marginBottom: "20px" }}>{btnSubmitText}</Button> :
                            <div />
                        }

                        <Grid container rowSpacing={1} columnSpacing={0} columns={12}>

                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>

                                <Grid item lg={isAtu ? 0 : 1.5} theme={theme} />
                                <Grid item xxs={12} smd={6} lg={isAtu ? 6 : 3} theme={theme}>
                                    <CustomTextField name='container' label="Container" required={true} value={container} pOnChange={handleChgContainer} />
                                </Grid>
                                <Grid item xxs={12} smd={6} lg={isAtu ? 6 : 3} theme={theme}>
                                    <CustomTextField name='destino' label="Destino" required={true} value={destino} pOnChange={handleChgDestino} />
                                </Grid>
                                <Grid item xxs={12} smd={6} lg={isAtu ? 6 : 3} theme={theme}>
                                    <CustomTextField name='navio' label="Navio" required={true} value={navio} pOnChange={handleChgNavio} />
                                </Grid><Grid item lg={isAtu ? 0 : 1.5} theme={theme} />

                                <Grid item lg={isAtu ? 0 : 1.5} theme={theme} />
                                <Grid item xxs={12} smd={6} lg={isAtu ? 6 : 3} theme={theme} >
                                    <CustomTextField name='exportador' label="Exportador" required={true} value={exportador} pOnChange={handleChgExportador} />
                                </Grid>
                                <Grid item xxs={12} smd={6} lg={isAtu ? 6 : 3} theme={theme}>
                                    <CustomTextField name='importador' label="Importador" required={true} value={importador} pOnChange={handleChgImportador} />
                                </Grid>
                                <Grid item xxs={12} theme={theme} />



                                <Grid item lg={isAtu ? 0 : 1.5} theme={theme} />
                                <Grid item xxs={12} smd={6} lg={isAtu ? 6 : 3} theme={theme}>
                                    <CustomTextField name='fatura' label="Fatura" required={false} value={fatura} pOnChange={handleChgFatura} />
                                </Grid>
                                <Grid item xxs={12} smd={6} lg={isAtu ? 6 : 3} theme={theme}>
                                    <CustomDateTimePicker name='libFat' label='Liberado para faturar' required={false} value={libFat} pOnChange={handleChgLibFat} placement='bottom-start' />
                                </Grid>
                                <Grid item xxs={12} theme={theme}> <hr /> </Grid>



                                <Grid item lg={isAtu ? 0 : 1.5} theme={theme} />
                                <Grid item xxs={12} smd={6} lg={isAtu ? 6 : 3} theme={theme}>
                                    <CustomTextField name='house' label="House" required={true} value={house} pOnChange={handleChgHouse} />
                                </Grid>
                                <Grid item xxs={12} smd={6} lg={isAtu ? 6 : 3} theme={theme}>
                                    <CustomTextField name='master' label="Master" required={true} value={master} pOnChange={handleChgMaster} />
                                </Grid>
                                <Grid item xxs={12} smd={6} lg={isAtu ? 6 : 3} theme={theme}>
                                    <CustomTextField name='origem' label="Origem" required={true} value={origem} pOnChange={handleChgOrigem} />
                                </Grid>

                                <Grid item xxs={12} theme={theme} />

                                <Grid item lg={isAtu ? 0 : 1.5} theme={theme} />
                                <Grid item xxs={12} smd={6} lg={isAtu ? 6 : 3} theme={theme}>
                                    <CustomTextField name='di' label="Declaração de importação" required={false} value={di} pOnChange={handleChgDi} />
                                </Grid>
                                <Grid item xxs={12} smd={6} lg={isAtu ? 6 : 3} theme={theme}>
                                    <CustomTextField name='canalParame' label="Canal parametrizacao" required={false} value={canalParame} pOnChange={handleChgCanalParame} />
                                </Grid>
                                <Grid item xxs={12} smd={6} lg={isAtu ? 6 : 3} theme={theme}>
                                    <CustomSelect name="freteModo" label="Modo de frete" required={true} value={freteModo} pOnChange={handleChangeFreteModo}>
                                        <MenuItem value={"Aereo"}>Aereo</MenuItem>
                                        <MenuItem value={"Maritimo"}>Maritimo</MenuItem>
                                    </CustomSelect>
                                </Grid>

                                <Grid item xxs={12} theme={theme}> <hr /> </Grid>
                                <Grid item lg={isAtu ? 0 : 1.5} theme={theme} />
                                <Grid item xxs={12} smd={6} lg={isAtu ? 6 : 3} theme={theme}>
                                    <CustomDateTimePicker name='dataChegada' label='Data de chegada' required={true} value={dataChegada} pOnChange={handleChgDataChegada} />
                                </Grid>

                                <Grid item xxs={12} smd={6} lg={isAtu ? 6 : 3} theme={theme}>
                                    <CustomDateTimePicker name='prevChegada' label='Previsão de chegada' required={false} value={prevChegada} pOnChange={handleChgPrevChegada} />
                                </Grid>

                                <Grid item xxs={12} smd={6} lg={isAtu ? 6 : 3} theme={theme}>
                                    <CustomDateTimePicker name='dataEmbarque' label='Data de embarque' required={true} value={dataEmbarque} pOnChange={handleChgDataEmbarque} />
                                </Grid>

                                <Grid item xxs={12} smd={6} lg={12} theme={theme}>
                                    <CustomDateTimePicker name='prevEmbarque' label='Previsão de embarque' required={false} value={prevEmbarque} pOnChange={handleChgPrevEmbarque} />
                                </Grid>

                            </LocalizationProvider>
                        </Grid>

                        {isAtu ? <div /> :
                            <Button type="submit" variant='contained' sx={{ marginTop: "15px", marginBottom: "20px" }}>{btnSubmitText}</Button>
                        }
                    </form>
                </div >
            ) : (
                <div></div>
            )
            }
        </Box >
    )
}

function dateToJsonString(data) {
    return moment(new Date(data)).format()
}

export default CriarInterveniente
