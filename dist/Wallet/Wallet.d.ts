import { WalletVersionType } from './types';
import { WalletV3 } from './WalletV3';
import { WalletV4 } from './WalletV4';
import { HighloadWallet } from './HighloadWallet';
export declare class Wallet {
    static openByPubKey({ workchain, publicKey, subwalletId, version, }: {
        workchain?: number;
        publicKey: Uint8Array;
        subwalletId?: number;
        version?: WalletVersionType;
    }): WalletV3 | WalletV4 | HighloadWallet;
}
