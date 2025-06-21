// import * as dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import { SybullWalletModel } from '@lukeevo/sybull-models';

// async function connectAndPrintData() {
//     dotenv.config();

//     try {
//         await mongoose.connect(process.env.DB_CONN_STRING, {
//             // @ts-ignore
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         console.log('Connected to MongoDB');

// 		// temp data
//         const newData = new SybullWalletModel({
//             userId: 694026363992014898,
//             walletAddress: '0xf99046270dFC0eA373f35779b7c4A0B3E88b74ED',
//             walletName: 'Free Wallet yOs',
//             privateKey: '0x767d8e493a809de3afa93119b9ae4f45c407e01cd50914cc61d6bfa238988332',
//             chainId: 'x',
//             chainName: 'x',
//             activated: false,
//             farmingPaused: false,
//             isActivated: false,
//             activationTokenBalance: 0
//         });

//         const savedData = await newData.save();

//         // const allData = await SybullWalletModel.find();
//         // console.log('All Data:', allData);
//     } catch (error) {
//         console.error('Error:', error);
//     } finally {
//         mongoose.connection.close();
//         console.log('Disconnected from MongoDB');
//     }
// }

// connectAndPrintData();

import moment from 'moment-timezone';

const x = new Date('2023-08-21T23:22:06.735+00:00');
var myTimezone = 'America/Toronto';
var myDatetimeFormat = 'YYYY-MM-DD hh:mm:ssa z';
var myDatetimeString = moment(x).tz(myTimezone).format(myDatetimeFormat);

console.log(myDatetimeString);
