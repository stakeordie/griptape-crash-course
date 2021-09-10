import { useEffect, useState } from 'react';
import {
  onAccountAvailable,
  viewingKeyManager,
  coinConvert
} from '@stakeordie/griptape.js';
import { Send } from './components/Send';
import { Governance } from './components/Governance';
import { Supply } from './components/Supply';
import { sefi } from './contracts/sefi';

const decoder = new TextDecoder('utf-8');

function App() {
  const [tokenName, setTokenName] = useState();
  const [balance, setBalance]     = useState();

  async function getTokenInfo() {
    const res = await sefi.getTokenInfo();
    if (res) {
      setTokenName(res.token_info.name);
    }
  }

  async function getBalance() {
    const res = await sefi.getBalance();
    if (res) {
      setBalance(res.balance.amount);
    }
  }

  async function createViewingKey() {
    const raw     = await sefi.createViewingKey('string');
    const decoded = decoder.decode(raw.data);
    if (decoded) {
      const res = JSON.parse(decoded);
      viewingKeyManager.add(sefi, res.create_viewing_key.key);
    }
  }

  function updateBalance(event) {
    event.preventDefault();
    getBalance();
  }

  useEffect(() => {
    onAccountAvailable(() => {
      getBalance();
    });

    getTokenInfo();
  }, []);

  return (
    <div className="App">
      <h1>Griptape.js Release</h1>
      { tokenName ?
          <div>
            <span><b>{tokenName} balance:</b> <span className="number">{coinConvert(balance, 6, 'humna', 2)}</span></span>
            <a href="/" onClick={updateBalance}>Update balance</a>
          </div>
        :
        <div><b>...</b></div>
      }

      <br/>

      <button onClick={createViewingKey}>Create VK</button>

      <Send/>

      <h2>Modules</h2>

      <Governance/>

      <Supply/>
    </div>
  );
}

export default App;
