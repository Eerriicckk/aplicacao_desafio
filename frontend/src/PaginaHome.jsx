import { useState } from 'react';
import CriarInterveniente from './components/CriarInterveniente';
import TabelaIntevenientes from './components/TabelaIntevenientes';
import { Box, Grid} from '@mui/material';
import PainelLateral from './components/PainelLateral';
import theme from  './components/CustomThemes';

function PaginaHome() {
	const [activeIndex, setActiveIndex] = useState(0);

	function handleIndexChange(handleData) {
		setActiveIndex(handleData);
	};

	return (
		<Box sx={{ height: '100%', margin: 0 }}>
			<Grid container spacing={0}
				sx={(theme) => ({
					height: '100%',
					bgcolor: 'yellow',
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
						
						<CriarInterveniente isActive={activeIndex === 0} onShow={() => setActiveIndex(0)} title="Criar registro" btnSubmitText="Criar Registro"/>
						<TabelaIntevenientes isActive={activeIndex === 1} onShow={() => setActiveIndex(1)} />

					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}

export default PaginaHome;