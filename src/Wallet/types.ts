import {
    Address, Cell, Coins, Contracts,
} from 'ton3-core';

export interface StandardWalletContract extends Contracts.ContractBase {
    createTransferMessage(
        transfers: WalletTransfer[],
        opts: {
            seqno: number,
            timeout?: number
        }
    ): Contracts.MessageExternalIn;

    createDeployMessage (): Contracts.MessageExternalIn;
}

export interface HighloadWalletContract extends Contracts.ContractBase {
    createTransferMessage(
        transfers: WalletTransfer[],
        opts: {
            deploy?: boolean,
            timeout?: number
            queryId?: bigint
        }
    ): Contracts.MessageExternalIn;

    createDeployMessage (): Contracts.MessageExternalIn;
}

export interface WalletTransfer {
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
export const highloadWalletVersions = ['org.ton.wallets.highload'];

export type WalletSimpleVersionType = typeof walletSimpleVersions[number];
export type WalletV2VersionType = typeof walletV2Versions[number];
export type WalletV3VersionType = typeof walletV3Versions[number];
export type WalletV4VersionType = typeof walletV4Versions[number];

export type HighloadWalletVersionType = typeof highloadWalletVersions[number];

export type StandardWalletVersionType =
    (WalletSimpleVersionType
    | WalletV2VersionType
    | WalletV3VersionType
    | WalletV4VersionType);
export type WalletVersionType = HighloadWalletVersionType | StandardWalletVersionType;
