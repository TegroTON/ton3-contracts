import { Address, Cell } from 'ton3-core';
export declare class DnsItem {
    static createChangeContentRequest({ category, value, queryId, }: {
        category: string;
        value?: Cell;
        queryId?: number | bigint;
    }): Cell;
    static createChangeWalletRequest(address?: Address, queryId?: bigint | number): Cell;
    static createChangeSiteRequest(adnlAddress?: bigint, queryId?: bigint | number): Cell;
    static createChangeNextResolverRequest(address?: Address, queryId?: bigint | number): Cell;
}
