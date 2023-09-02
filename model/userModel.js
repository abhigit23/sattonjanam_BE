const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    registeredFor: {
      type: String,
      trim: true,
    },
    userName: {
      type: String,
      trim: true,
    },
    image: {
      type: Object,
      required: true,
    },
    religion: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: [true, "email already exists."],
    },
    phoneNumber: {
      type: String,
      trim: true,
      unique: [true, "mobile already exists."],
    },
    password: {
      type: String,
      trim: true,
    },
    age: {
      type: String,
      trim: true,
    },
    caste: {
      type: String,
      trim: true,
    },
    subCaste: {
      type: String,
      trim: true,
    },
    gotra: {
      type: String,
      trim: true,
    },
    hobbies: {
      type: String,
      trim: true,
    },
    height: {
      type: String,
      trim: true,
    },
    color: {
      type: String,
      trim: true,
    },
    createProfileFor: {
      type: String,
      trim: true,
    },
    motherTongue: {
      type: String,
      trim: true,
    },
    maritalStatus: {
      type: String,
      trim: true,
    },
    manglik: {
      type: String,
      trim: true,
    },
    smoking: {
      type: String,
      trim: true,
    },
    drinking: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    pinCode: {
      type: String,
      trim: true,
    },
    highestDegree: {
      type: String,
      trim: true,
    },
    employedIn: {
      type: String,
      trim: true,
    },
    occupation: {
      type: String,
      trim: true,
    },
    business: {
      type: String,
      trim: true,
    },
    job: {
      type: String,
      trim: true,
    },
    annualIncome: {
      type: String,
      trim: true,
    },
    myself: {
      type: Array,
      default: [],
    },
    familyType: {
      type: String,
      trim: true,
    },
    fatherOccupation: {
      type: String,
      trim: true,
    },
    motherOccupation: {
      type: String,
      trim: true,
    },
    brother: {
      type: String,
      trim: true,
    },
    sister: {
      type: String,
      trim: true,
    },
    familyLivingIn: {
      type: String,
      trim: true,
    },
    contactAddress: {
      type: Array,
      default: [],
    },
    aboutFamily: {
      type: Array,
      default: [],
    },
    query: {
      type: Array,
      default: [],
    },
    role: {
      type: String,
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    sjId: {
      type: Number,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    const maxCounter = await User.findOne({}).sort({ sjId: -1 }).select("sjId");
    if (!maxCounter) this.sjId = 5000;
    else this.sjId = maxCounter.sjId + 1;

    let encPass = await bcrypt.hash(this.password, 10);
    this.password = encPass;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
