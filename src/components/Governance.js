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

  return (
    <>
      <h3>Governance</h3>
      <ul>
        { proposals.map((it, idx) =>
          <li key={idx}>{it.content.value.title}</li>) }
      </ul>
    </>
  );
}
