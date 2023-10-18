// const nodeMailer = require('nodemailer');

// export function sendOrderConfirmation (email, name, address, title, img, quantity, color, paymentMethod) {
//     try {
//         const transporter = nodeMailer.createTransport({
//             service: 'gmail',
//             auth: {
//               user: 'boxdelabonita@gmail.com',
//               pass: 'bpjtsxesfxzloetl'
//             }
//         });
        
//         const mailOptions = {
//             from: 'boxdelabonita@gmail.com',
//             to: email,
//             subject: `Thank you for your order, ${name}`,
//             text: `Your order is confirmed and we'll let you know when it's on the way. It will be sent to ${address}`,
//             html: `<div>
//                 <h3>Your order details</h3>
//                 <div>
//                     <img src='${img}' alt='${title}'/>
//                 </div>
//                 <div>
//                     <h3>Item: ${title}</h3>
//                     <p>Quantity: ${quantity}</p>
//                     <p>Color: ${color}</p>
//                     <p>Payment method: ${paymentMethod}</p>
//                 </div>
//             </div>`
//         };
        
//         transporter.sendMail(mailOptions, function(error, info){
//             if (error) {
//                 return 'failed';
//             } else {
//                 return 'success';
//             }
//         });
//     } catch (error) {
//         return 'server error';
//     }
// }