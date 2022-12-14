import {
    Address, Builder, Cell, Coins,
} from 'ton3-core';
import { JettonOperation } from './constants';

export class JettonWallet {
    public static createTransferRequest({
        queryId = 0,
        amount,
        destination,
        responseDestination = null,
        forwardAmount = new Coins(0),
        forwardPayload = null,
    }: {
        queryId: number | bigint,
        amount: Coins;
        destination: Address;
        responseDestination?: Address | null;
        forwardAmount: Coins;
        forwardPayload: Cell | null;
    }): Cell {
        /*
         transfer query_id:uint64 amount:(VarUInteger 16) destination:MsgAddress
         response_destination:MsgAddress custom_payload:(Maybe ^Cell)
         forward_ton_amount:(VarUInteger 16) forward_payload:(Either Cell ^Cell)
         = InternalMsgBody;
         */
        const builder = new Builder()
            .storeUint(JettonOperation.TRANSFER, 32)
            .storeUint(queryId, 64)
            .storeCoins(amount)
            .storeAddress(destination)
            .storeAddress(responseDestination)
            .storeBit(0)
            .storeCoins(forwardAmount);

        if (!forwardPayload || forwardPayload.bits.length <= builder.remainder) {
            builder.storeBit(0);
            if (forwardPayload) {
                builder.storeBits(forwardPayload.bits);
            }
        } else {
            builder.storeBit(1).storeRef(forwardPayload);
        }

        return builder.cell();
    }

    public static createBurnRequest({
        queryId = 0,
        amount,
        responseDestination = null,
    }: {
        queryId: number | bigint,
        amount: Coins;
        responseDestination?: Address | null;
    }): Cell {
        /*
         burn#595f07bc query_id:uint64 amount:(VarUInteger 16)
         response_destination:MsgAddress custom_payload:(Maybe ^Cell)
         = InternalMsgBody;
        */
        const builder = new Builder()
            .storeUint(JettonOperation.BURN, 32)
            .storeUint(queryId, 64)
            .storeCoins(amount)
            .storeAddress(responseDestination)
            .storeBit(0);
        return builder.cell();
    }
}
