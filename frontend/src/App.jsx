import './App.css';
import CriarInterveniente from './components/CriarInterveniente';
import TabelaIntevenientes from './components/TabelaIntevenientes';

function App() {

  return (
    <div>
      <h1 id="tabelLabel">Teste</h1>
      <p>Tabela de teste</p>
      <CriarInterveniente/>
      <TabelaIntevenientes/>
    </div>
  );
}

export default App;