const User = require("../model/userModel");
const bcrypt = require("bcryptjs");

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
