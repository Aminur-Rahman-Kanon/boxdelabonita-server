const nodeMailer = require('nodemailer');
const https = require('https');

function cronJob (){
    setInterval(() => {
        https.get('https://boxdelabonita-server-13dd.onrender.com', (res) => {
            console.log('pinging...');
        })
    }, 840000);
}

async function sendOrderConfirmation (customerInfo, products, paymentMethod, totalPrice, deliveryCharge) {
    let productDetails;
    if (Object.values(products).length){
        productDetails = Object.values(products).map((item, idx) => `<div style="width: 100%;">
            <h3 style="margin: 5px 0; color: black;">${idx+1}</h3>
            <div style="width: 100%;">
                <img src=${item.product.img[0]} alt=${item.product.title} style="width: 100px; height: 100px;"/>
                <p style="margin: 5px 0; color: black;">Title: ${item.product.title}</p>
                <p style="margin: 5px 0; color: black;">Quantity: ${item.quantity}</p>
                <div style="color: black;">color: ${item.color.map(clr => `<span style="margin: 0 5px; color: black;">${clr}</span>`)}</div>
                <p style="margin: 5px 0; color: black;">Item Price: &#2547;${item.price}</p>
                <p style="margin: 5px 0; color: black;">Total Price: &#2547;${item.price * item.quantity}</p>
            </div>
        </div>`)
    }
    try {
        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'boxdelabonitaservice@gmail.com',
              pass: 'zyhnxoqclpuiwhub'
            }
        });
        
        const mailOptions = {
            from: 'boxdelabonitaservice@gmail.com',
            to: 'boxdelabonita@gmail.com',
            subject: 'New Order received',
            text: 'Here is the order details',
            html: `<div>
                <div>
                    <h2 style="margin: 5px 0; color: black;">Customer Details</h2>
                    <p style="margin: 5px 0; color: black;">Name: ${customerInfo.name}</p>
                    <p style="margin: 5px 0; color: black; text-decoration: none;">Email: ${customerInfo.email}</p>
                    <p style="margin: 5px 0; color: black;">Address: ${customerInfo.address}</p>
                    <p style="margin: 5px 0; color: black;">Phone: ${customerInfo.phone}</p>
                    <p style="margin: 5px 0; color: black;">City: ${customerInfo.city}</p>
                </div>
                <div>
                    <h2 style="margin: 5px 0">Order Details</h2>
                    <p style="margin: 5px 0; color: black;">Payment Method: ${paymentMethod}</p>
                    <p style="margin: 5px 0; color: black;">Delivery Charge: &#2547;${deliveryCharge}</p>
                    <p style="margin: 5px 0; color: black;">Total Price: &#2547;${deliveryCharge + totalPrice}</p>
                </div>
                <div style="width: 100%;">
                    <h2 style="margin: 5px 0; color: black;">Product Details</h2>
                    ${productDetails}
                </div>
            </div>`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error)
            } else {
                console.log(info.response);
            }
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    sendOrderConfirmation,
    cronJob
}