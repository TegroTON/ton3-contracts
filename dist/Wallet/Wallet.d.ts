import { StandardWalletVersion } from './types';
import { WalletV3Contract } from './WalletV3';
import { WalletV4Contract } from './WalletV4';
export declare class Wallet {
    static openByPubKey({ workchain, publicKey, subwalletId, version, }: {
        workchain?: number;
        publicKey: Uint8Array;
        subwalletId?: number;
        version?: StandardWalletVersion;
    }): WalletV3Contract | WalletV4Contract;
}
