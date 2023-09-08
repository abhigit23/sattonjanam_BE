const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer')
require('dotenv').config()

const queryController = {
    createQuery: async (req,res) => {
        try {
            const {
              registeredFor,
              userName,
              image,
              religion,
              gender,
              email,
              phoneNumber,
              password,
              age,
              caste,
              subCaste,
              gotra,
              hobbies,
              height,
              color,
              createProfileFor,
              motherTongue,
              maritalStatus,
              manglik,
              smoking,
              drinking,
              country,
              state,
              city,
              pinCode,
              highestDegree,
              employedIn,
              occupation,
              business,
              job,
              annualIncome,
              myself,
              familyType,
              fatherOccupation,
              motherOccupation,
              brother,
              sister,
              familyLivingIn,
              contactAddress,
              aboutFamily,
              query
            } = req.body;
      
            let encPass = await bcrypt.hash(password, 10);
      
            let newUser = await User.create(req.body);
      
            res.json({ msg: "User query registered successfully", user: newUser });
          } catch (err) {
            return res.status(500).json({ msg: err.message });
          }
    },
    sendQueryMail: async (req,res) => {
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
          to: req.body.email ,
          cc: 'info@sattonjanam.com',
          subject: "Enquery Message",
          html: `
              <div style="margin: 20px;">
                <h3>Query Details</h3>
                <p>Name : ${req.body.userName}</p>
                <p>Email : ${req.body.email}</p>
                <p>Mobile : ${req.body.phoneNumber}</p>
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

module.exports = queryController;