import { useState, useEffect } from 'react';
import { useSupply, coinConvert } from '@stakeordie/griptape.js';

export function Supply() {
  const supply = useSupply();

  const [total, setTotal] = useState();


  useEffect(() => {
    async function getTotal() {
      const res = await supply.getTotal();
      const [{amount}] = res.result;
      const total = coinConvert(amount, 6, 'human', 2);
      setTotal(total);
    }

    getTotal();
  }, [supply]);

  return (
    <>
      <h3>Supply</h3>
      <p><b>Total Supply: </b><span className="number">{total}</span> SCRT</p>
    </>
  );
}
