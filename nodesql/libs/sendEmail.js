const nodemailer = require("nodemailer");
const { dbquery } = require('..');
// module.exports.sendMail = 
async function sendMail(data) {
    try{
        var transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: '',
                pass: ''
            }
          });
          
          var mailOptions = {
            from: 'sujithaofficial45@gmail.com',
            to: data.email,
            subject: 'Sending Email using Node.js',
            text: 'OTP 12345'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        });

        await dbquery(`UPDATE employee SET otp = 12345 WHERE email = ${data.email}`)



    }catch(error){
        console.log("error.............:", error)
    }
}

sendMail("data")