"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HighloadWallet = void 0;
const ton3_core_1 = require("ton3-core");
const constants_1 = require("./constants");
const Source_1 = require("../Source");
class HighloadWallet extends ton3_core_1.Contracts.ContractBase {
    constructor({ workchain = 0, publicKey, subwalletId = constants_1.StandardSubwalletId, }) {
        const code = Source_1.Source.HighloadWallet();
        const storage = new ton3_core_1.Builder()
            .storeUint(subwalletId, 32)
            .storeUint(0, 64)
            .storeBytes(publicKey)
            .storeUint(0, 1)
            .cell();
        super({ workchain, code, storage });
        this.publicKey = publicKey;
        this.subwalletId = subwalletId;
    }
    static generateQueryId(timeout, randomId) {
        const now = Math.floor(Date.now() / 1000);
        const random = randomId || Math.floor(Math.random() * 2 ** 30);
        return (BigInt(now + timeout) << 32n) | BigInt(random);
    }
    createTransferMessage(transfers, { deploy = false, timeout = 60, queryId = HighloadWallet.generateQueryId(timeout), }) {
        if (!transfers.length || transfers.length > 255) {
            throw new Error('ContractHighloadWalletV2: can make only 1 to 255 transfers per operation.');
        }
        const body = new ton3_core_1.Builder()
            .storeUint(this.subwalletId, 32)
            .storeUint(queryId, 64);
        const serializers = {
            key: (k) => new ton3_core_1.Builder().storeInt(k, 16).bits,
            value: (v) => {
                const internal = new ton3_core_1.Contracts.MessageInternal({
                    bounce: v.destination.bounceable,
                    src: ton3_core_1.Address.NONE,
                    dest: v.destination,
                    value: v.amount,
                }, { body: v.body, state: v.init });
                return new ton3_core_1.Builder()
                    .storeUint(v.mode, 8)
                    .storeRef(internal.cell())
                    .cell();
            },
        };
        const dict = new ton3_core_1.HashmapE(16, { serializers });
        transfers.forEach((transfer, i) => dict.set(i, transfer));
        body.storeDict(dict);
        return new ton3_core_1.Contracts.MessageExternalIn({ dest: this.address }, { body: body.cell(), state: deploy ? this.state : undefined });
    }
    createDeployMessage() {
        const queryId = HighloadWallet.generateQueryId(2 ** 16);
        const body = new ton3_core_1.Builder()
            .storeUint(this.subwalletId, 32)
            .storeUint(queryId, 64)
            .storeDict(new ton3_core_1.HashmapE(16));
        return new ton3_core_1.Contracts.MessageExternalIn({ dest: this.address }, { body: body.cell(), state: this.state });
    }
}
exports.HighloadWallet = HighloadWallet;
//# sourceMappingURL=HighloadWallet.js.map