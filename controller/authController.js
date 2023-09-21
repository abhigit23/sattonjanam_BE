const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createAccessToken } = require("../util/token");
const path = require("path");
const nodemailer = require("nodemailer");
const fs = require("fs");
require("dotenv").config();

const authController = {
  register: async (req, res) => {
    try {
      // const {
      //   registeredFor,
      //   userName,
      //   image,
      //   religion,
      //   gender,
      //   email,
      //   phoneNumber,
      //   password,
      //   age,
      //   caste,
      //   subCaste,
      //   gotra,
      //   hobbies,
      //   height,
      //   color,
      //   createProfileFor,
      //   motherTongue,
      //   maritalStatus,
      //   manglik,
      //   smoking,
      //   drinking,
      //   country,
      //   state,
      //   city,
      //   pinCode,
      //   highestDegree,
      //   employedIn,
      //   occupation,
      //   business,
      //   job,
      //   annualIncome,
      //   myself,
      //   familyType,
      //   fatherOccupation,
      //   motherOccupation,
      //   brother,
      //   sister,
      //   familyLivingIn,
      //   contactAddress,
      //   aboutFamily,
      // } = req.body;

      let newUser = await User.create(req.body);
      res.json({ msg: "User registered successfully", user: newUser });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      let extUser = await User.findOne({ email });
      if (!extUser)
        return res.status(400).json({ msg: "User doesn't exists." });

      const isMatch = await bcrypt.compare(password, extUser.password);
      if (!isMatch)
        return res.status(400).json({ msg: "passwords doesn't match" });

      if (!extUser.isActive)
        return res
          .status(400)
          .json({ msg: "Sorry, your account is blocked, contact Admin" });

      const accessToken = createAccessToken({ _id: extUser._id });

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        signed: true,
        path: `/api/v1/auth/authToken`,
        maxAge: 1 * 24 * 60 * 60 * 1000,
      });

      res.json({ token: accessToken, msg: "Login Successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    // res.json({msg : 'logout'})
    try {
      res.clearCookie("accessToken", { path: `/api/v1/auth/authToken` });
      res.status(200).json({ msg: "logout successfully.." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  authToken: async (req, res) => {
    try {
      const token = req.signedCookies.accessToken; //signed cookie => secured cookie
      // res.json({ token });
      if (!token)
        return res
          .status(400)
          .json({ msg: "Session Expired... Login Again.." });

      // reverse login to validate the userid
      jwt.verify(token, process.env.ACCESS_SECRET, (err, data) => {
        if (err) return res.status(400).json({ msg: "Invalid Access Token.." });
        // regenerate access data
        const accessToken = createAccessToken({ _id: data._id });
        res.json({ accessToken });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  currentUser: async (req, res) => {
    try {
      const cUser = await User.findById({ _id: req.user });
      res.json({ user: cUser });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAll: async (req, res) => {
    try {
      let data = await User.find({}).select({
        sjId: 1,
        image: 1,
        isVerified: 1,
      });

      return res.status(200).json({ length: data.length, users: data });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getSingle: async (req, res) => {
    try {
      let data = await User.findById({ _id: req.params.id });
      if (!data) return res.status(404).json({ msg: "User doesn't exists." });

      res.status(200).json({ user: data });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      let data = await User.findById({ _id: req.params.id });
      if (!data) return res.status(404).json({ msg: "User doesn't exists." });

      await User.findByIdAndDelete({ _id: req.params.id });

      return res.status(200).json({ msg: "User deleted succcessfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  sendMail: async (req, res) => {
    let smtpTransport = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE,
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: { rejectUnauthorized: false },
    });
    const sendingMail = smtpTransport.sendMail(
      {
        from: process.env.MAIL_ID,
        to: req.body.email,
        subject: "Thank you for contacting with sattonjanam.com",
        html: `
          <div style="margin: 20px;">
            <h3>Dear ${req.body.userName},</h3>
            <p>Thank you for contacting with sattonjanam.com</p>
            <p>You are very important to us, all information received will always remain confidential.</p>
            <p>We will contact you as soon as we review your message or you can reach us on 9773643677</p>
          </div>
      `,
      },
      function (error, info) {
        if (error) {
          console.log(error);
        }
        res.send("Mail has been sended to your email, Check your mail.");
      }
    );
    return sendingMail;
  },
  sendMailAdmin: async (req, res) => {
    let smtpTransport = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE,
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: { rejectUnauthorized: false },
    });
    const sendingMail = smtpTransport.sendMail(
      {
        from: process.env.MAIL_ID,
        to: 'info@sattonjanam.com',
        subject: "New User registered",
        html: `
          <div style="margin: 20px;">
            <h3>Hi ${process.env.MAIL_ID},</h3>
            <p>Got a new registration,</p>
            <p>Name: ${req.body.userName}</p>
            <p>Please open admin panel to check the details.</p>
          </div>
      `,
      },
      function (error, info) {
        if (error) {
          console.log(error);
        }
        res.send("Mail has been sended to your email, Check your mail.");
      }
    );
    return sendingMail;
  },
  allUsers: async (req, res) => {
    try {
      let data = await User.find().select("-password");

      let nonAdmin = data.filter((item) => item.role !== "superadmin");

      res.status(200).json({ length: nonAdmin.length, users: nonAdmin });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  update: async (req, res) => {
    try {
      const { userId } = req.params;
      const data = await User.findOne({ _id: userId });
      data.isVerified = true;
      await data.save();

      return res.status(200).json({ msg: "user updated succesfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateUser: async(req,res) => {
    try {
      let data = await User.findById({ _id: req.params.id })
            if(!data)
                return res.status(404).json({ msg: "User doesn't exists."})

      let updated = await User.findByIdAndUpdate({ _id: req.params.id }, req.body)
      res.status(200).json({ msg: "User updated successfully", user: updated })
    } catch (err) {
      return  res.status(500).json({ msg: err.message })
    }
  }
};

module.exports = authController;
