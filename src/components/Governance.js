import { useState, useEffect } from 'react';
import { useGovernance } from '@stakeordie/griptape.js';

export function Governance() {
  const gov = useGovernance();

  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    async function fetchProposals() {
      const res = await gov.queryProposals();
      setProposals(res.result);
    }

    fetchProposals();
  }, [gov]);

  function truncate(str) {
    return str.substring(0, 128) + '...';
  }

  return (
    <>
      <h3>Governance</h3>
      <ul>
        { proposals.map((it, idx) =>
          <li key={idx}>{truncate(it.content.value.title)}</li>) }
      </ul>
    </>
  );
}
