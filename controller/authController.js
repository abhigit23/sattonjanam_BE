const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const { createAccessToken } = require('../util/token')
const path = require('path')
const nodemailer = require('nodemailer')
const fs = require('fs')
require('dotenv').config()

const authController = {
  register: async (req, res) => {
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
      } = req.body;

      let encPass = await bcrypt.hash(password, 10);

      let newUser = await User.create(req.body);

      res.json({ msg: "User registered successfully", user: newUser });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req,res) => {
        try {
            const { email, password } = req.body;

            let extUser = await User.findOne({ email })
                if(!extUser)
                    return res.status(400).json({ msg: "User doesn't exists."})

            const isMatch = bcrypt.compare(password,extUser.password)
                if(!isMatch)
                    return res.status(400).json({ msg: "passwords doesn't match"})

            if(!extUser.isActive)
                    return res.status(400).json({ msg: "Sorry, your account is blocked, contact Admin"})

            const accessToken = createAccessToken({ _id: extUser._id })

            res.cookie('accessToken', accessToken, {
                        httpOnly: true,
                        signed: true,
                        path: `/api/v1/auth/authToken`,
                        maxAge: 1 * 24 * 60 *60* 1000
            });
        

            res.json({token: accessToken,  msg: "Login Successfully" })
        } catch (err) {
            return res.status(500).json({ msg: err.message});
        }
  },
  logout: async (req, res) => {
    // res.json({msg : 'logout'})
      try {
          res.clearCookie("accessToken", { path : `/api/v1/auth/authToken`})
          res.status(200).json({ msg : "logout successfully.."})
      } catch (err) {
          return res.status(500).json({ msg : err.message })
      }
  },
  authToken: async (req, res) => {
    try {
    
      const token = req.signedCookies.accessToken //signed cookie => secured cookie
      // res.json({ token });
      if (!token)
        return res.status(400).json({ msg: "Session Expired... Login Again.." });

      // reverse login to validate the userid
      jwt.verify(token, process.env.ACCESS_SECRET, (err,data) => {
        if (err) 
          return res.status(400).json({ msg: "Invalid Access Token.." });
        // regenerate access data
        const accessToken = createAccessToken({ _id : data._id})
        res.json({ accessToken });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  currentUser : async (req, res)=>{
    try {
        const cUser = await User.findById({ _id : req.user})
        res.json({ user : cUser})
    } catch (err) {
        return res.status(500).json({ msg : err.message})
    }
  },
  getAll: async (req,res) => {
    try {
        let data = await User.find()

        return res.status(200).json({ length: data.length, users: data })
    } catch (err) {
        return  res.status(500).json({ msg: err.message })
    }
  },
  getSingle: async (req,res) => {
      try {
        let data = await User.findById({ _id: req.params.id })
              if(!data)
                  return res.status(404).json({ msg: "User doesn't exists."})

              data.isVerified = true;
              await user.save();
              res.status(200).json({ user: data })
      } catch (err) {
          return  res.status(500).json({ msg: err.message })
      }
  },
  delete: async (req,res) => {
      try {
          let data = await User.findById({ _id: req.params.id })
              if(!data)
                  return res.status(404).json({ msg: "User doesn't exists."})

              await User.findByIdAndDelete({ _id: req.params.id })

              return res.status(200).json({ msg: "User deleted succcessfully"})
          
      } catch (err) {
          return  res.status(500).json({ msg: err.message })
      }
  },
  sendMail: async (req,res) => {
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
      subject: "Thank you for contacting with sattonjanam.com",
      html: `
          <div style="margin: 20px;">
            <h3>Dear ${req.body.userName},</h3>
            <p>Thank you for contacting with sattonjanam.com</p>
            <p>You are very improtant to us, all information received will always remain confidential.</p>
            <p>We will contact you as soon as we review your message or you can reach us on 9773643677</p>
          </div>
      `
    },function(error,info){
      if(error){
         console.log(error);
      }  
      res.send("Mail has been sended to your email, Check your mail.")
    })
  },
  allUsers: async (req,res) => {
    try {
      
        let data = await User.find().select('-password')

        let nonAdmin = data.filter((item) => item.role !== 'superadmin')
        
        res.status(200).json({ length: nonAdmin.length, users: nonAdmin })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
},
update: async (req,res) => {
  try {
    const { _id } = req.body
    const data = await User.findOne({ _id: req.params.id })
      data.isVerified = true;
      await data.save();
  
      return res.status(200).json({ msg: "user updated succesfully"})
    
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}
};

module.exports = authController;
