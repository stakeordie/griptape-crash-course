import { useEffect, useState } from 'react';
import { sefi } from '../contracts/sefi';

export function Send() {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount]       = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setRecipient('secret1vppheqkkzray9ayxusee5fdhde56723f2y0027');
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
        try {
            setIsLoading(true);
            await sefi.send(recipient, amount);
        } catch (e) {
            // ignore
            console.error(e);
        } finally {
            setIsLoading(false);
            setAmount(0);
        }
    }

    return (
      <>
        <h2>Send</h2>
        <form onSubmit={send}>
          <input type="text"
            placeholder="recipient"
            onChange={onRecipientChange}
            value={recipient}
          />
          <input type="number"
            placeholder="amount"
            onChange={onAmountChange}
            value={amount}
          />
          <button disabled={isLoading}>Send</button>
        </form>
      </>
    );
};
