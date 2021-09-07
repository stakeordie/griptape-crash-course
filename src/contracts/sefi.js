import {
    createContract,
    snip20Def
} from '@stakeordie/griptape.js';

export const sefi = createContract({
    id: 'sefi',
    at: 'secret12q2c5s5we5zn9pq43l0rlsygtql6646my0sqfm',
    definition: snip20Def
});
