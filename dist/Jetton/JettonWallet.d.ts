import { Address, Cell, Coins } from 'ton3-core';
export declare class JettonWallet {
    static createTransferRequest({ queryId, amount, destination, responseDestination, forwardAmount, forwardPayload, }: {
        queryId: number | bigint;
        amount: Coins;
        destination: Address;
        responseDestination?: Address | null;
        forwardAmount: Coins;
        forwardPayload: Cell | null;
    }): Cell;
    static createBurnRequest({ queryId, amount, responseDestination, }: {
        queryId: number | bigint;
        amount: Coins;
        responseDestination?: Address | null;
    }): Cell;
}
