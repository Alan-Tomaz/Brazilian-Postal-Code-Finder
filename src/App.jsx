import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';
import api from './services/api';

function App() {

  const [input, setInput] = useState();
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === '') {
      alert("Fill Some CEP")
      return
    }
    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data);
      setInput("");
    } catch {
      alert("Error in Search!")
      setInput("");
    }
  }

  return (
    <div className="App">
      <h1 className="title">CEP Finder</h1>

      <div className="app-input">
        <input type="text" name="" id="" placeholder="Write Your CEP..." value={input} onChange={(e) => setInput(e.target.value)} />

        <button className="app-search"><FiSearch size={25} color='#FFF' onClick={handleSearch} /></button>
      </div>

      <main className='main'>
        {Object.keys(cep).length > 0 &&
          <>
            <h2>CEP: {cep.cep}</h2>

            <span>Logradouro: {cep.logradouro}</span>
            <span>Complemento: {cep.complemento}</span>
            <span>{cep.bairro}</span>
            <span>{cep.localidade} - {cep.uf}</span>
          </>
        }
      </main>
    </div>
  );
}

export default App;
