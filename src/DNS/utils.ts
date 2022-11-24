import { sha256 } from 'ton3-core/dist/utils/hash';
import { stringToBytes } from 'ton3-core/dist/utils/helpers';
import { Address, Builder, Cell } from 'ton3-core';

export function categoryToBigInt(category: string | undefined): bigint {
    if (!category) return BigInt(0); // all categories
    const categoryBytes = stringToBytes(category);
    const categoryHash = sha256(categoryBytes);
    return BigInt(`0x${categoryHash}`);
}

export function createSmartContractAddressRecord(smartContractAddress: Address): Cell {
    return new Builder()
        .storeUint(0x9fd3, 16) // https://github.com/ton-blockchain/ton/blob/7e3df93ca2ab336716a230fceb1726d81bac0a06/crypto/block/block.tlb#L827
        .storeAddress(smartContractAddress)
        .storeUint(0, 8)
        .cell();
}

export function createAdnlAddressRecord(adnlAddress: bigint): Cell {
    return new Builder()
        .storeUint(0xad01, 16) // https://github.com/ton-blockchain/ton/blob/7e3df93ca2ab336716a230fceb1726d81bac0a06/crypto/block/block.tlb#L821
        .storeUint(adnlAddress, 256)
        .storeUint(0, 8)
        .cell();
}

export function createNextResolverRecord(smartContractAddress: Address): Cell {
    return new Builder()
        .storeUint(0xba93, 16) // https://github.com/ton-blockchain/ton/blob/7e3df93ca2ab336716a230fceb1726d81bac0a06/crypto/block/block.tlb#L819
        .storeAddress(smartContractAddress)
        .cell();
}
