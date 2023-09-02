const Connectus = require("../model/connectUsModel")
const nodemailer = require('nodemailer')
require('dotenv').config()

const connectusController = {
    createConnectus: async (req,res) => {
        try {

            let connectUs = await Connectus.create(req.body);
            res.json({ msg: "User query registered successfully", user: connectUs });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    sendConnectusMail: async (req,res) => {
        let smtpTransport = nodemailer.createTransport({
            service: process.env.MAIL_SERVICE,
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: true,
              auth: {
                      user: process.env.MAIL_ID,
                      pass: process.env.MAIL_PASSWORD
              },
              tls:{rejectUnauthorized:false}
          })
          smtpTransport.sendMail({
            from: process.env.MAIL_ID,
            to: req.body.email,
            cc: 'sattonjanammatrimony@gmail.com',
            subject: "Query Message",
            html: `
                <div style="margin: 20px;">
                  <h3>Connect With Us Details</h3>
                  <p>Looking For : ${req.body.lookingFor}</p>
                  <p>Name : ${req.body.userName}</p>
                  <p>Email : ${req.body.email}</p>
                  <p>Mobile : ${req.body.phoneNumber}</p>
                  <p>Location : ${req.body.location}</p>
                  <p>Query Message : ${req.body.query}</p>
                </div>
            `
          },function(error,info){
            if(error){
               console.log(error);
            }  
            res.send("Mail has been sended to your email, Check your mail.")
          })
    }
}

module.exports = connectusController;