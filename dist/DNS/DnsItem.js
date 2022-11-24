"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DnsItem = void 0;
const ton3_core_1 = require("ton3-core");
const constants_1 = require("./constants");
const utils_1 = require("./utils");
class DnsItem {
    static createChangeContentRequest({ category, value, queryId = 0, }) {
        const builder = new ton3_core_1.Builder()
            .storeUint(constants_1.DNSOperation.CHANGE_DNS_RECORD, 32)
            .storeUint(queryId, 64)
            .storeUint((0, utils_1.categoryToBigInt)(category), 256);
        if (value) {
            builder.storeRef(value);
        }
        return builder.cell();
    }
    static createChangeWalletRequest(address, queryId = 0) {
        return DnsItem.createChangeContentRequest({
            category: constants_1.DNSCategory.WALLET,
            value: address && (0, utils_1.createSmartContractAddressRecord)(address),
            queryId,
        });
    }
    static createChangeSiteRequest(adnlAddress, queryId = 0) {
        return DnsItem.createChangeContentRequest({
            category: constants_1.DNSCategory.SITE,
            value: typeof adnlAddress !== 'undefined' ? (0, utils_1.createAdnlAddressRecord)(adnlAddress) : undefined,
            queryId,
        });
    }
    static createChangeNextResolverRequest(address, queryId = 0) {
        return DnsItem.createChangeContentRequest({
            category: constants_1.DNSCategory.NEXT_RESOLVER,
            value: address && (0, utils_1.createNextResolverRecord)(address),
            queryId,
        });
    }
}
exports.DnsItem = DnsItem;
//# sourceMappingURL=DnsItem.js.map