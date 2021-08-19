const path = require('path');
const express = require('express')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')

dotenv.config();

const app = express()

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).sendFile('index.html')
})

app.post('/', (req, res) => {

  console.log(req.body);

  
    // 1) create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    })
  
    // 2 define the email options
    const mailOptions = {
      from: `${req.body.name} <${req.body.email}>`,
      to: 'debowale01@gmail.com',
      subject: `Contact Message From ${req.body.name}`,
      text: req.body.message,
      // html:
    };
  
    //3 send the mail
    transporter.sendMail(mailOptions, (error, info)=> {
      if(error){
        console.log(error);
        res.send('error')
      }else{
        console.log('Email Sent:' + info.response);
        res.send('success')
      }
    })
    // alert(info.messageId)
  
})

const port = process.env.PORT || 1234

app.listen(port, '127.0.0.1', () => { 
  console.log(`Server running on port ${port}`);
})