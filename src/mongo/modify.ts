import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { SybullWalletModel, SybullWalletType, TransactionModel } from '@lukeevo/sybull-models';

export const updateWalletById = async (wallet: SybullWalletType, userId: number) => {
    dotenv.config();

    await mongoose.connect(process.env.DB_CONN_STRING, {
        // @ts-ignore
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log(wallet);

    await SybullWalletModel.updateOne({ userId: userId }, wallet);
    mongoose.connection.close();
};
