"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JettonWallet = void 0;
const ton3_core_1 = require("ton3-core");
const constants_1 = require("./constants");
class JettonWallet {
    static createTransferRequest({ queryId = 0, amount, destination, responseDestination = null, forwardAmount = new ton3_core_1.Coins(0), forwardPayload = null, }) {
        const builder = new ton3_core_1.Builder()
            .storeUint(constants_1.JettonOperation.TRANSFER, 32)
            .storeUint(queryId, 64)
            .storeCoins(amount)
            .storeAddress(destination)
            .storeAddress(responseDestination)
            .storeBit(0)
            .storeCoins(forwardAmount);
        if (!forwardPayload || forwardPayload.bits.length <= builder.remainder) {
            builder.storeBit(0);
            if (forwardPayload) {
                builder.storeBits(forwardPayload.bits);
            }
        }
        else {
            builder.storeBit(1).storeRef(forwardPayload);
        }
        return builder.cell();
    }
}
exports.JettonWallet = JettonWallet;
//# sourceMappingURL=JettonWallet.js.map