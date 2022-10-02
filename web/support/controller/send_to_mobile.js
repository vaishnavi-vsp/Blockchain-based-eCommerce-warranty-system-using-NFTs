// import twilio from 'twilio';
// import nodemailer from 'nodemailer';


// require('dotenv').config();

// const accountSid = process.env.TWILIO_ACCOUNT_SID; 
// const authToken = process.env.TWILIO_AUTH_TOKEN;  

// const client = new twilio(accountSid, authToken);
// let mailTransporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.EMAIL_PASS
//     }
// });


// export const sendSMS = async(req,res) => {
//     try {
//     client.messages.create({
//         body: req.body.content,
//         to: req.body.phone, 
//         from: '+15017122661' 
//     })
//     .then((message) => res.status(200).json(message.sid));
//     }catch(error) {
//         res.status(409).json({message:error.message});
//     }
// }

// export const sendMail = async(req,res) => {
//     try {
//         let mailDetails = {
//             from:  process.env.EMAIL,
//             to: req.body.sender_email,
//             subject: req.body.sub,
//             text: req.body.html
//         };
         
//         mailTransporter.sendMail(mailDetails, function(err, data) {
//             if(err) {
//                 console.log('Error Occurs');
//             } else {
//                 console.log('Email sent successfully');
//                 res.status(200).json({'message':'Email sent successfully'})
//             }
//         });
//     }
//     catch(error) {
//         res.status(409).json({message:error.message});
//     }
// }