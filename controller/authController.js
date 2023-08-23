const User = require("../model/userModel");
const bcrypt = require("bcryptjs");

const authController = {
  register: async (req, res) => {
    try {
      const {
        registeredFor,
        userName,
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
};

module.exports = authController;
