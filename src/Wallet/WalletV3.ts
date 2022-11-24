import { Address, Builder, Contracts } from 'ton3-core';
import {
    StandardWalletContract, WalletTransfer, WalletV3VersionType,
} from './types';
import { StandardSubwalletId, WalletVersion } from './constants';
import { Source } from '../Source';

export class WalletV3 extends Contracts.ContractBase implements StandardWalletContract {
    private publicKey: Uint8Array;

    private subwalletId: number;

    private version: WalletV3VersionType;

    constructor({
        workchain = 0,
        publicKey,
        version = WalletVersion.V3R2,
        subwalletId = StandardSubwalletId,
    }: {
        workchain?: number,
        publicKey: Uint8Array,
        subwalletId?: number,
        version?: WalletV3VersionType
    }) {
        const code = version === WalletVersion.V3 ? Source.WalletV3() : Source.WalletV3R2();

        const storage = new Builder()
            .storeUint(0, 32)
            .storeUint(subwalletId, 32)
            .storeBytes(publicKey)
            .cell();

        super({ workchain, code, storage });

        this.publicKey = publicKey;
        this.subwalletId = subwalletId;
        this.version = version;
    }

    public createTransferMessage(
        transfers: WalletTransfer[], // array of transfers
        {
            seqno,
            timeout = 60,
        }: {
            seqno: number, // sequence transfer number
            timeout?: number // timeout in seconds
        },
    ): Contracts.MessageExternalIn {
        if (!transfers.length || transfers.length > 4) {
            throw new Error('ContractWalletV3: can make only 1 to 4 transfers per operation.');
        }
        const body = new Builder()
            .storeUint(this.subwalletId, 32)
            .storeUint(~~(Date.now() / 1000) + timeout, 32) // valid until
            .storeUint(seqno, 32);

        transfers.forEach((transfer) => {
            const internal = new Contracts.MessageInternal({
                bounce: transfer.destination.bounceable,
                src: Address.NONE,
                dest: transfer.destination,
                value: transfer.amount,
            }, { body: transfer.body, state: transfer.init });

            body.storeUint(transfer.mode, 8).storeRef(internal.cell());
        });

        return new Contracts.MessageExternalIn(
            { dest: this.address },
            { body: body.cell(), state: seqno === 0 ? this.state : undefined },
        );
    }

    public createDeployMessage(): Contracts.MessageExternalIn {
        const body = new Builder()
            .storeUint(this.subwalletId, 32)
            .storeInt(-1, 32) // valid until
            .storeUint(0, 32); // seqno

        return new Contracts.MessageExternalIn(
            { dest: this.address },
            { body: body.cell(), state: this.state },
        );
    }
}
