import {
  createContract,
  extendContract,
  snip20Def,
  ErrorHandler
} from '@stakeordie/griptape.js';

const sefiDef = {
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
    }
  }
};

const def = extendContract(snip20Def, sefiDef);

export const sefi = createContract({
  id: 'sefi',
  at: 'secret12q2c5s5we5zn9pq43l0rlsygtql6646my0sqfm',
  definition: def
});

export class ServerNotAvailableErrorHandler extends ErrorHandler {
  constructor(handler) {
    super(
      (e) => e.toString().match(/502/ig),
      handler
    );
  }
}
