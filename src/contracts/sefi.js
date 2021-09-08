import {
    createContract,
    extendContract,
    snip20Def
} from '@stakeordie/griptape.js';

const sefiDef = {
    queries: {
        getTokenInfo() {
            return { token_info: { } };
        }
    },

    messages: {
        send({ padding }, recipient, amount) {
            const handleMsg = {
                send: {
                    recipient,
                    amount,
                    padding
                }
            }
            return { handleMsg };
        },

        stake(_, amount) {
            const handleMsg = { stake: { } };
            const transferAmount = [
              {
                amount: amount,
                denom: 'uscrt'
              }
            ];
            return {
                handleMsg,
                transferAmount
            };
        }
    }
};

const def = extendContract(snip20Def, sefiDef);

export const sefi = createContract({
    id: 'sefi',
    at: 'secret12q2c5s5we5zn9pq43l0rlsygtql6646my0sqfm',
    definition: def
});
