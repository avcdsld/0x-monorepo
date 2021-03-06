import 'mocha';
import * as R from 'ramda';
import 'reflect-metadata';

import { ExchangeCancelEvent } from '../../src/entities';
import { AssetType } from '../../src/types';
import { createDbConnectionOnceAsync } from '../db_setup';
import { chaiSetup } from '../utils/chai_setup';

import { testSaveAndFindEntityAsync } from './util';

chaiSetup.configure();

const baseCancelEvent = {
    contractAddress: '0x4f833a24e1f95d70f028921e27040ca56e09ab0b',
    logIndex: 1234,
    blockNumber: 6276262,
    rawData: '0x000000000000000000000000f6da68519f78b0d0bc93c701e86affcb75c92428',
    transactionHash: '0x6dd106d002873746072fc5e496dd0fb2541b68c77bcf9184ae19a42fd33657fe',
    makerAddress: '0xf6da68519f78b0d0bc93c701e86affcb75c92428',
    takerAddress: '0xf6da68519f78b0d0bc93c701e86affcb75c92428',
    feeRecipientAddress: '0xc370d2a5920344aa6b7d8d11250e3e861434cbdd',
    senderAddress: '0xf6da68519f78b0d0bc93c701e86affcb75c92428',
    orderHash: '0xab12ed2cbaa5615ab690b9da75a46e53ddfcf3f1a68655b5fe0d94c75a1aac4a',
    rawMakerAssetData: '0xf47261b0000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    makerAssetProxyId: '0xf47261b0',
    makerTokenAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    rawTakerAssetData: '0xf47261b0000000000000000000000000e41d2489571d322189246dafa5ebde1f4699f498',
    takerAssetProxyId: '0xf47261b0',
    takerTokenAddress: '0xe41d2489571d322189246dafa5ebde1f4699f498',
};

const erc20CancelEvent = R.merge(baseCancelEvent, {
    makerAssetType: 'erc20' as AssetType,
    makerTokenId: null,
    takerAssetType: 'erc20' as AssetType,
    takerTokenId: null,
});

const erc721CancelEvent = R.merge(baseCancelEvent, {
    makerAssetType: 'erc721' as AssetType,
    makerTokenId: '19378573',
    takerAssetType: 'erc721' as AssetType,
    takerTokenId: '63885673888',
});

// tslint:disable:custom-no-magic-numbers
describe('ExchangeCancelEvent entity', () => {
    it('save/find', async () => {
        const connection = await createDbConnectionOnceAsync();
        const events = [erc20CancelEvent, erc721CancelEvent];
        const cancelEventRepository = connection.getRepository(ExchangeCancelEvent);
        for (const event of events) {
            await testSaveAndFindEntityAsync(cancelEventRepository, event);
        }
    });
});
