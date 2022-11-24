import {
    highloadWalletVersions, walletV3Versions, walletV4Versions, WalletVersionType,
} from './types';
import { WalletV3 } from './WalletV3';
import { WalletV4 } from './WalletV4';
import { HighloadWallet } from './HighloadWallet';
import { StandardSubwalletId, WalletVersion } from './constants';

export class Wallet {
    public static openByPubKey({
        workchain = 0,
        publicKey,
        subwalletId = StandardSubwalletId,
        version = WalletVersion.V3R2,
    }: {
        workchain?: number,
        publicKey: Uint8Array,
        subwalletId?: number,
        version?: WalletVersionType
    }) {
        switch (true) {
            case walletV3Versions.indexOf(version) > -1:
                return new WalletV3({
                    workchain, subwalletId, publicKey, version,
                });
            case walletV4Versions.indexOf(version) > -1:
                return new WalletV4({
                    workchain, subwalletId, publicKey, version,
                });
            case highloadWalletVersions.indexOf(version) > -1:
                return new HighloadWallet({
                    workchain, subwalletId, publicKey,
                });
            default: throw Error(`Unknown wallet version: ${version}`);
        }
    }
}
