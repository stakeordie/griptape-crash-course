import { useEffect, useState } from 'react';
import { sefi, ServerNotAvailableErrorHandler } from '../contracts/sefi';
import {
  onContractError,
  OutOfGasErrorHandler,
  DefaultErrorHandler
} from '@stakeordie/griptape.js';

export function Send() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount]       = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState('');
  const [success, setSuccess]     = useState('');

  useEffect(() => {
    setRecipient('secret1vppheqkkzray9ayxusee5fdhde56723f2y0027');

    onContractError(sefi, new ServerNotAvailableErrorHandler(() => setError('This was a 502')))
    onContractError(sefi, new OutOfGasErrorHandler(() => setError('Out gas error')))
    onContractError(sefi, new DefaultErrorHandler(() => setError('Default error handler')))
  }, []);

  function onRecipientChange(event) {
    const value = event.target.value;
    setRecipient(value);
  }

  function onAmountChange(event) {
    const value = event.target.value;
    setAmount(value);
  }

  async function send(event) {
    event.preventDefault();
    if (!recipient || !amount) return;
    setIsLoading(true);
    await sefi.send(recipient, amount);
    setIsLoading(false);
  }

  function closeError(event) {
    event.preventDefault();
    setError('');
  }

  function closeSuccess(event) {
    event.preventDefault();
    setSuccess('');
  }

  return (
    <>
    <h2>Send SEFI</h2>
    <form onSubmit={send}>
      { error ?
        <div className="error">{error} <a href="/" onClick={closeError}>x</a></div>
        :
        <></>
      }
      { success ?
        <div className="success">{success} <a href="/" onClick={closeSuccess}>x</a></div>
        :
        <></>
      }
      <input
        type="text"
        placeholder="recipient"
        onChange={onRecipientChange}
        value={recipient}
      />
      <input
        type="number"
        placeholder="amount"
        onChange={onAmountChange}
        value={amount}
      />
      <button disabled={isLoading}>Send</button>
    </form>
    </>
  );
};
