import {
    Address,
    Bit, Builder, Cell, Contracts, HashmapE,
} from 'ton3-core';
import { HighloadWalletContract, WalletTransfer } from './types';
import { StandardSubwalletId } from './constants';
import { Source } from '../Source';

export class HighloadWallet extends Contracts.ContractBase implements HighloadWalletContract {
    private publicKey: Uint8Array;

    private subwalletId: number;

    constructor({
        workchain = 0,
        publicKey,
        subwalletId = StandardSubwalletId,
    }: {
        workchain?: number,
        publicKey: Uint8Array,
        subwalletId?: number
    }) {
        const code = Source.HighloadWallet();

        const storage = new Builder()
            .storeUint(subwalletId, 32) // stored_subwallet
            .storeUint(0, 64) // last_cleaned
            .storeBytes(publicKey) // public_key
            .storeUint(0, 1) // old_queries
            .cell();

        super({ workchain, code, storage });

        this.publicKey = publicKey;
        this.subwalletId = subwalletId;
    }

    private static generateQueryId(timeout: number, randomId?: number): bigint {
        const now = Math.floor(Date.now() / 1000);
        const random = randomId || Math.floor(Math.random() * 2 ** 30);

        return (BigInt(now + timeout) << 32n) | BigInt(random);
    }

    public createTransferMessage(
        transfers: WalletTransfer[],
        {
            deploy = false,
            timeout = 60,
            queryId = HighloadWallet.generateQueryId(timeout),
        }: {
            deploy?: boolean,
            timeout?: number
            queryId?: number | bigint
        },
    ): Contracts.MessageExternalIn {
        if (!transfers.length || transfers.length > 255) {
            throw new Error('ContractHighloadWalletV2: can make only 1 to 255 transfers per operation.');
        }

        const body = new Builder()
            .storeUint(this.subwalletId, 32)
            .storeUint(queryId, 64);

        const serializers = {
            key: (k: number): Bit[] => new Builder().storeInt(k, 16).bits,
            value: (v: WalletTransfer): Cell => {
                const internal = new Contracts.MessageInternal({
                    bounce: v.destination.bounceable,
                    src: Address.NONE,
                    dest: v.destination,
                    value: v.amount,
                }, { body: v.body, state: v.init });

                return new Builder()
                    .storeUint(v.mode, 8) // send mode
                    .storeRef(internal.cell())
                    .cell();
            },
        };

        const dict = new HashmapE<number, WalletTransfer>(16, { serializers });
        transfers.forEach((transfer, i) => dict.set(i, transfer));
        body.storeDict(dict);

        return new Contracts.MessageExternalIn(
            { dest: this.address },
            { body: body.cell(), state: deploy ? this.state : undefined },
        );
    }

    public createDeployMessage(): Contracts.MessageExternalIn {
        const queryId = HighloadWallet.generateQueryId(2 ** 16);
        const body = new Builder()
            .storeUint(this.subwalletId, 32) // subwallet_id
            .storeUint(queryId, 64) // query_id
            .storeDict(new HashmapE(16));

        return new Contracts.MessageExternalIn(
            { dest: this.address },
            { body: body.cell(), state: this.state },
        );
    }
}
