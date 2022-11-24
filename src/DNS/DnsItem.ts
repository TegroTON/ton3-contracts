import { Address, Builder, Cell } from 'ton3-core';
import { DNSCategory, DNSOperation } from './constants';
import {
    categoryToBigInt,
    createAdnlAddressRecord,
    createNextResolverRecord,
    createSmartContractAddressRecord,
} from './utils';

export class DnsItem {
    public static createChangeContentRequest({
        category,
        value,
        queryId = 0,
    }:{
        category: string,
        value?: Cell
        queryId?: number | bigint
    }) {
        const builder = new Builder()
            .storeUint(DNSOperation.CHANGE_DNS_RECORD, 32)
            .storeUint(queryId, 64)
            .storeUint(categoryToBigInt(category), 256);
        if (value) {
            builder.storeRef(value);
        }
        return builder.cell();
    }

    public static createChangeWalletRequest(address?: Address, queryId: bigint | number = 0) {
        return DnsItem.createChangeContentRequest({
            category: DNSCategory.WALLET,
            value: address && createSmartContractAddressRecord(address),
            queryId,
        });
    }

    public static createChangeSiteRequest(adnlAddress?: bigint, queryId: bigint | number = 0) {
        return DnsItem.createChangeContentRequest({
            category: DNSCategory.SITE,
            value: typeof adnlAddress !== 'undefined' ? createAdnlAddressRecord(adnlAddress) : undefined,
            queryId,
        });
    }

    public static createChangeNextResolverRequest(address?: Address, queryId: bigint | number = 0) {
        return DnsItem.createChangeContentRequest({
            category: DNSCategory.NEXT_RESOLVER,
            value: address && createNextResolverRecord(address),
            queryId,
        });
    }
}
