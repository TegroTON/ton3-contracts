import { Address, Cell, Coins, Contracts } from 'ton3-core';
export interface StandardWalletContract extends Contracts.ContractBase {
    createTransferMessage(transfers: WalletTransfer[], opts: {
        seqno: number;
        timeout?: number;
    }): Contracts.MessageExternalIn;
    createDeployMessage(): Contracts.MessageExternalIn;
}
export interface HighloadWalletContract extends Contracts.ContractBase {
    createTransferMessage(transfers: WalletTransfer[], opts: {
        deploy?: boolean;
        timeout?: number;
        queryId?: bigint;
    }): Contracts.MessageExternalIn;
    createDeployMessage(): Contracts.MessageExternalIn;
}
export interface WalletTransfer {
    destination: Address;
    amount: Coins;
    body: Cell;
    init?: Cell;
    mode: number;
}
export declare const walletSimpleVersions: string[];
export declare const walletV2Versions: string[];
export declare const walletV3Versions: string[];
export declare const walletV4Versions: string[];
export declare const highloadWalletVersions: string[];
export declare type WalletSimpleVersionType = typeof walletSimpleVersions[number];
export declare type WalletV2VersionType = typeof walletV2Versions[number];
export declare type WalletV3VersionType = typeof walletV3Versions[number];
export declare type WalletV4VersionType = typeof walletV4Versions[number];
export declare type HighloadWalletVersionType = typeof highloadWalletVersions[number];
export declare type StandardWalletVersionType = (WalletSimpleVersionType | WalletV2VersionType | WalletV3VersionType | WalletV4VersionType);
export declare type WalletVersionType = HighloadWalletVersionType | StandardWalletVersionType;
