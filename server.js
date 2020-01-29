require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');

const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
// app.use(bodyParser.json());
app.use(express.static('./'))

let { EMAIL_ADDRESS, EMAIL_PASSWORD } = process.env

var transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: `${EMAIL_ADDRESS}`,
        pass: `${EMAIL_PASSWORD}`
    }
});

app.post("/api/contact", (req, res) => {
    let {name, email, message} = req.body;
    console.log(name, email, message)
    const mailOptions = {
        from: 'Portfolio Contact',
        to: 'jshmccann@gmail.com',
        subject: `${name} reached out from your portfolio!`,
        html: `<p style='font-family: Sans-serif; color: #bada55; background-color: grey; font-size: 14px; text-align: center'>${message}<br>Name: ${name}<br>Email: ${email}</p>`
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            console.log(err)
        } else {
            console.log(info)
        }
    })
    res.status(200).redirect('https://www.josh-mccann.com')
})

app.listen(4545, () => {
    console.log("Listening on port 4545")
})