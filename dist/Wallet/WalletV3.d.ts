import { Contracts } from 'ton3-core';
import { StandardWalletContract, WalletTransfer, WalletV3VersionType } from './types';
export declare class WalletV3 extends Contracts.ContractBase implements StandardWalletContract {
    private publicKey;
    private subwalletId;
    private version;
    constructor({ workchain, publicKey, version, subwalletId, }: {
        workchain?: number;
        publicKey: Uint8Array;
        subwalletId?: number;
        version?: WalletV3VersionType;
    });
    createTransferMessage(transfers: WalletTransfer[], { seqno, timeout, }: {
        seqno: number;
        timeout?: number;
    }): Contracts.MessageExternalIn;
    createDeployMessage(): Contracts.MessageExternalIn;
}
