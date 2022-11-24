export const StandardSubwalletId = 698983191;
// why 698983191?? -> https://github.com/ton-blockchain/ton/blob/4b940f8bad9c2d3bf44f196f6995963c7cee9cc3/tonlib/tonlib/TonlibClient.cpp#L2420

export enum WalletVersion {
    V1 = 'org.ton.wallets.simple',
    V1R2 = 'org.ton.wallets.simple.r2',
    V1R3 = 'org.ton.wallets.simple.r3',
    V2 = 'org.ton.wallets.v2',
    V2R2 = 'org.ton.wallets.v2.r2',
    V3 = 'org.ton.wallets.v3',
    V3R2 = 'org.ton.wallets.v3.r2',
    V4 = 'org.ton.wallets.v4',
    V4R2 = 'org.ton.wallets.v4.r2',
    HIGHLOAD = 'org.ton.wallets.highload',
}
