import {
    Address, Cell, Coins, Contracts,
} from 'ton3-core';

export interface StandardWalletContract extends Contracts.ContractBase {
    createTransferMessage(
        transfers: StandardWalletTransfer[],
        seqno: number,
        timeout?: number
    ): Contracts.MessageExternalIn;

    createDeployMessage (): Contracts.MessageExternalIn;
}

export interface StandardWalletTransfer {
    destination: Address
    amount: Coins
    body: Cell
    init?: Cell
    mode: number
}

export const walletSimpleVersions = ['org.ton.wallets.simple', 'org.ton.wallets.simple.r2', 'org.ton.wallets.simple.r3'];
export const walletV2Versions = ['org.ton.wallets.v2', 'org.ton.wallets.v2.r2'];
export const walletV3Versions = ['org.ton.wallets.v3', 'org.ton.wallets.v3.r2'];
export const walletV4Versions = ['org.ton.wallets.v4', 'org.ton.wallets.v4.r2'];

export type WalletSimpleVersion = typeof walletSimpleVersions[number];
export type WalletV2Version = typeof walletV2Versions[number];
export type WalletV3Version = typeof walletV3Versions[number];
export type WalletV4Version = typeof walletV4Versions[number];

export type StandardWalletVersion = WalletSimpleVersion | WalletV2Version | WalletV3Version | WalletV4Version;
