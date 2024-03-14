import { useState } from 'react';
import CriarInterveniente from './components/CriarInterveniente';
import TabelaIntevenientes from './components/TabelaIntevenientes';
import { Box, Grid, ThemeProvider} from '@mui/material';
import PainelLateral from './components/PainelLateral';
import theme from  './components/CustomThemes';

function PaginaHome() {
	const [activeIndex, setActiveIndex] = useState(1);

	function handleIndexChange(handleData) {
		setActiveIndex(handleData);
	};

	return (
		<ThemeProvider theme={theme}>
		<Box sx={{ height: '100%', margin: 0 }}>
			<Grid container spacing={0}
				sx={(theme) => ({
					height: '100%',
					overflow: "auto"
				})}
				theme={theme}>

				<Grid item xxs={1.5} theme={theme}>
					<PainelLateral onChangeIndex={handleIndexChange} pageIndex={activeIndex}/>
				</Grid>
				<Grid item xxs={10} theme={theme}>
					<Box
						sx={(theme) => ({
							height: '100%',
							margin: 0,
							bgcolor: '#ffffff'
						})}
						theme={theme}
					>
						
						<CriarInterveniente isActive={activeIndex === 0} title="Criar registro" btnSubmitText="Criar Registro"/>
						<TabelaIntevenientes isActive={activeIndex === 1} onShow={setActiveIndex} />

					</Box>
				</Grid>
			</Grid>
		</Box>
		</ThemeProvider>
	);
}

export default PaginaHome;