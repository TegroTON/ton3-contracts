"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletV3Contract = void 0;
const ton3_core_1 = require("ton3-core");
const constants_1 = require("./constants");
const Source_1 = require("../Source");
class WalletV3Contract extends ton3_core_1.Contracts.ContractBase {
    constructor(opts) {
        const code = opts.version === 'org.ton.wallets.v3' ? Source_1.Source.WalletV3() : Source_1.Source.WalletV3R2();
        const storage = new ton3_core_1.Builder()
            .storeUint(0, 32)
            .storeUint(opts.subwalletId ?? constants_1.StandardSubwalletId, 32)
            .storeBytes(opts.publicKey)
            .cell();
        super(opts.workchain ?? 0, code, storage);
        this.publicKey = opts.publicKey;
        this.subwalletId = opts.subwalletId ?? constants_1.StandardSubwalletId;
        this.version = opts.version === 'org.ton.wallets.v3' ? opts.version : 'org.ton.wallets.v3.r2';
    }
    createTransferMessage(transfers, seqno, timeout = 60) {
        if (!transfers.length || transfers.length > 4) {
            throw new Error('ContractWalletV3: can make only 1 to 4 transfers per operation.');
        }
        const body = new ton3_core_1.Builder()
            .storeUint(this.subwalletId, 32)
            .storeUint(~~(Date.now() / 1000) + timeout, 32)
            .storeUint(seqno, 32);
        transfers.forEach((transfer) => {
            const internal = new ton3_core_1.Contracts.MessageInternal({
                bounce: transfer.destination.bounceable,
                src: ton3_core_1.Address.NONE,
                dest: transfer.destination,
                value: transfer.amount,
            }, { body: transfer.body, state: transfer.init });
            body.storeUint(transfer.mode, 8).storeRef(internal.cell());
        });
        return new ton3_core_1.Contracts.MessageExternalIn({ dest: this.address }, { body: body.cell(), state: seqno === 0 ? this.state : undefined });
    }
    createDeployMessage() {
        const body = new ton3_core_1.Builder()
            .storeUint(this.subwalletId, 32)
            .storeInt(-1, 32)
            .storeUint(0, 32);
        return new ton3_core_1.Contracts.MessageExternalIn({ dest: this.address }, { body: body.cell(), state: this.state });
    }
}
exports.WalletV3Contract = WalletV3Contract;
//# sourceMappingURL=WalletV3.js.map