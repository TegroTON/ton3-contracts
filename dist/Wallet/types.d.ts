import { Address, Cell, Coins, Contracts } from 'ton3-core';
export interface StandardWalletContract extends Contracts.ContractBase {
    createTransferMessage(transfers: StandardWalletTransfer[], seqno: number, timeout?: number): Contracts.MessageExternalIn;
    createDeployMessage(): Contracts.MessageExternalIn;
}
export interface StandardWalletTransfer {
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
export declare type WalletSimpleVersion = typeof walletSimpleVersions[number];
export declare type WalletV2Version = typeof walletV2Versions[number];
export declare type WalletV3Version = typeof walletV3Versions[number];
export declare type WalletV4Version = typeof walletV4Versions[number];
export declare type StandardWalletVersion = WalletSimpleVersion | WalletV2Version | WalletV3Version | WalletV4Version;
