import { Contracts } from 'ton3-core';
import { StandardWalletContract, StandardWalletTransfer, WalletV4Version } from './types';
export declare class WalletV4Contract extends Contracts.ContractBase implements StandardWalletContract {
    private publicKey;
    private subwalletId;
    private version;
    constructor(opts: {
        workchain?: number;
        publicKey: Uint8Array;
        subwalletId?: number;
        version?: WalletV4Version;
    });
    createTransferMessage(transfers: StandardWalletTransfer[], seqno: number, timeout?: number): Contracts.MessageExternalIn;
    createDeployMessage(): Contracts.MessageExternalIn;
}
