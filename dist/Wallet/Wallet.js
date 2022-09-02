"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const types_1 = require("./types");
const WalletV3_1 = require("./WalletV3");
const WalletV4_1 = require("./WalletV4");
class Wallet {
    static openByPubKey({ workchain, publicKey, subwalletId, version = 'org.ton.wallets.v3.r2', }) {
        switch (true) {
            case types_1.walletV3Versions.indexOf(version) > -1:
                return new WalletV3_1.WalletV3Contract({
                    workchain, subwalletId, publicKey, version,
                });
            case types_1.walletV4Versions.indexOf(version) > -1:
                return new WalletV4_1.WalletV4Contract({
                    workchain, subwalletId, publicKey, version,
                });
            default: throw Error(`Unknown wallet version: ${version}`);
        }
    }
}
exports.Wallet = Wallet;
//# sourceMappingURL=Wallet.js.map