import { Contracts } from 'ton3-core';
import { HighloadWalletContract, WalletTransfer } from './types';
export declare class HighloadWallet extends Contracts.ContractBase implements HighloadWalletContract {
    private publicKey;
    private subwalletId;
    constructor({ workchain, publicKey, subwalletId, }: {
        workchain?: number;
        publicKey: Uint8Array;
        subwalletId?: number;
    });
    private static generateQueryId;
    createTransferMessage(transfers: WalletTransfer[], { deploy, timeout, queryId, }: {
        deploy?: boolean;
        timeout?: number;
        queryId?: number | bigint;
    }): Contracts.MessageExternalIn;
    createDeployMessage(): Contracts.MessageExternalIn;
}
