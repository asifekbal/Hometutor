var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        xoauth2 : xoauth2.createXOAuth2Generator({
            user : 'asif.sunny678@gmail.com',
            clientId :'407549751217-qg5e5imcjgbeiidi319nd26oadescjob.apps.googleusercontent.com',
            clientSecret : 'YEBYlWL8VuQaMGFG-k9TcrK6',
            refreshToken :'sasasa'
        })
    }
});

// setup email data with unicode symbols
var mailOptions = {
    from: '"Support | HomeTutor" <support@hometutor.com>', // sender address
    to: 'aekbal@sapient.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world; ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
// transporter.sendMail(mailOptions, function(error, response){
//     if(error){
//         console.log(error);
//     }else{
//         console.log("Message sent: " + response.message);
//     }
// });
