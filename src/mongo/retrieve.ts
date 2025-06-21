import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { SybullWalletModel, TransactionModel } from '@lukeevo/sybull-models';

export const fetchWalletById = async (userId: number) => {
    dotenv.config();

    await mongoose.connect(process.env.DB_CONN_STRING, {
        // @ts-ignore
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const allData = await SybullWalletModel.find();
    const wallets = allData.filter(wallet => wallet.userId === userId);

    mongoose.connection.close();
    return wallets;
};

export const fetchTransactionsByWalletId = async (walletId: number) => {
    dotenv.config();

    await mongoose.connect(process.env.DB_CONN_STRING, {
        // @ts-ignore
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const allData = await TransactionModel.find();
    const transactions = allData.filter(wallet => wallet.userId === walletId);

    mongoose.connection.close();
    return transactions;
};
