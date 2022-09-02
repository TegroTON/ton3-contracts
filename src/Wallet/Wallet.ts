import {
    StandardWalletVersion, walletV3Versions, walletV4Versions,
} from './types';
import { WalletV3Contract } from './WalletV3';
import { WalletV4Contract } from './WalletV4';

export class Wallet {
    public static openByPubKey({
        workchain,
        publicKey,
        subwalletId,
        version = 'org.ton.wallets.v3.r2',
    }: {
        workchain?: number,
        publicKey: Uint8Array,
        subwalletId?: number,
        version?: StandardWalletVersion
    }) {
        switch (true) {
        case walletV3Versions.indexOf(version) > -1:
            return new WalletV3Contract({
                workchain, subwalletId, publicKey, version,
            });
        case walletV4Versions.indexOf(version) > -1:
            return new WalletV4Contract({
                workchain, subwalletId, publicKey, version,
            });
        default: throw Error(`Unknown wallet version: ${version}`);
        }
    }
}
