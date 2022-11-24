"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const types_1 = require("./types");
const WalletV3_1 = require("./WalletV3");
const WalletV4_1 = require("./WalletV4");
const HighloadWallet_1 = require("./HighloadWallet");
const constants_1 = require("./constants");
class Wallet {
    static openByPubKey({ workchain = 0, publicKey, subwalletId = constants_1.StandardSubwalletId, version = constants_1.WalletVersion.V3R2, }) {
        switch (true) {
            case types_1.walletV3Versions.indexOf(version) > -1:
                return new WalletV3_1.WalletV3({
                    workchain, subwalletId, publicKey, version,
                });
            case types_1.walletV4Versions.indexOf(version) > -1:
                return new WalletV4_1.WalletV4({
                    workchain, subwalletId, publicKey, version,
                });
            case types_1.highloadWalletVersions.indexOf(version) > -1:
                return new HighloadWallet_1.HighloadWallet({
                    workchain, subwalletId, publicKey,
                });
            default: throw Error(`Unknown wallet version: ${version}`);
        }
    }
}
exports.Wallet = Wallet;
//# sourceMappingURL=Wallet.js.map