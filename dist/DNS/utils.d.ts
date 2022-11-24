import { Address, Cell } from 'ton3-core';
export declare function categoryToBigInt(category: string | undefined): bigint;
export declare function createSmartContractAddressRecord(smartContractAddress: Address): Cell;
export declare function createAdnlAddressRecord(adnlAddress: bigint): Cell;
export declare function createNextResolverRecord(smartContractAddress: Address): Cell;
