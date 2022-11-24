"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNextResolverRecord = exports.createAdnlAddressRecord = exports.createSmartContractAddressRecord = exports.categoryToBigInt = void 0;
const hash_1 = require("ton3-core/dist/utils/hash");
const helpers_1 = require("ton3-core/dist/utils/helpers");
const ton3_core_1 = require("ton3-core");
function categoryToBigInt(category) {
    if (!category)
        return BigInt(0);
    const categoryBytes = (0, helpers_1.stringToBytes)(category);
    const categoryHash = (0, hash_1.sha256)(categoryBytes);
    return BigInt(`0x${categoryHash}`);
}
exports.categoryToBigInt = categoryToBigInt;
function createSmartContractAddressRecord(smartContractAddress) {
    return new ton3_core_1.Builder()
        .storeUint(0x9fd3, 16)
        .storeAddress(smartContractAddress)
        .storeUint(0, 8)
        .cell();
}
exports.createSmartContractAddressRecord = createSmartContractAddressRecord;
function createAdnlAddressRecord(adnlAddress) {
    return new ton3_core_1.Builder()
        .storeUint(0xad01, 16)
        .storeUint(adnlAddress, 256)
        .storeUint(0, 8)
        .cell();
}
exports.createAdnlAddressRecord = createAdnlAddressRecord;
function createNextResolverRecord(smartContractAddress) {
    return new ton3_core_1.Builder()
        .storeUint(0xba93, 16)
        .storeAddress(smartContractAddress)
        .cell();
}
exports.createNextResolverRecord = createNextResolverRecord;
//# sourceMappingURL=utils.js.map