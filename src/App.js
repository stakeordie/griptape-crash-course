import './App.css';
import { sefi } from './contracts/sefi';
import { useEffect, useState } from 'react';
import {
    onAccountAvailable,
    viewingKeyManager
} from '@stakeordie/griptape.js';

const decoder = new TextDecoder('utf-8');

function App() {
    const [tokenName, setTokenName] = useState();
    const [balance, setBalance]     = useState();
    const [key, setKey]             = useState();

    async function getTokenInfo() {
        const res = await sefi.getTokenInfo();
        if (res) {
            setTokenName(res.token_info.name);
        }
    }

    async function getBalance() {
        const res = await sefi.getBalance();

        if (res) {
            if (res.hasOwnProperty('viewing_key_error')) return;

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

    function getViewingKey() {
        const key = viewingKeyManager.get(sefi.id);
        setKey(key);
    }

    useEffect(() => {
        getTokenInfo();
    }, []);

    onAccountAvailable(() => {
        getBalance();
    });

    return (
      <div className="App">
        <h1>Hello, World! from Griptape.js</h1>
        <p>{tokenName}</p>
        <p>{balance}</p>
        <p>{key}</p>

        <button onClick={createViewingKey}>Create VK</button>
        <button onClick={getViewingKey}>Get Key</button>
      </div>
    );
}

export default App;
