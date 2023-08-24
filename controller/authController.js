const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const { createAccessToken } = require('../util/token')

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

            const isMatch = await bcrypt.compare(password,extUser.password)
                if(!isMatch)
                    return res.status(400).json({ msg: "passwords doesn't match"})

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
  }
};

module.exports = authController;
