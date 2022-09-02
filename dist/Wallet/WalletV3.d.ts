import { Contracts } from 'ton3-core';
import { StandardWalletContract, StandardWalletTransfer, WalletV3Version } from './types';
export declare class WalletV3Contract extends Contracts.ContractBase implements StandardWalletContract {
    private publicKey;
    private subwalletId;
    private version;
    constructor(opts: {
        workchain?: number;
        publicKey: Uint8Array;
        subwalletId?: number;
        version?: WalletV3Version;
    });
    createTransferMessage(transfers: StandardWalletTransfer[], seqno: number, timeout?: number): Contracts.MessageExternalIn;
    createDeployMessage(): Contracts.MessageExternalIn;
}
