const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    registeredFor: {
        type: String,
        required: true,
        trim: true
    },
    userName:{
        type: String,
        required:[true, "name field must be filled"],
        trim: true
    },
    religion:{
        type: String,
        required: true,
        trim: true
    },
    gender:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: [true, "email field must be filled"],
        trim: true,
        unique: [true, "email already exists."]
    },
    phoneNumber:{
        type: String,
        required: [true, "mobile field must be filled"],
        trim: true,
        unique: [true, "mobile already exists."]
    },
    password:{
        type: String,
        required: [true, "password field must be filled"],
        trim: true
    },
    age:{
        type: String,
        required: true,
        trim: true
    },
    caste:{
        type: String,
        required: true,
        trim: true
    },
    subCaste:{
        type: String,
        required: true,
        trim: true
    },
    gotra:{
        type: String,
        required: true,
        trim: true
    },
    hobbies:{
        type: String,
        required: true,
        trim: true
    },
    height:{
        type: String,
        required: true,
        trim: true
    },
    color:{
        type: String,
        required: true,
        trim: true
    },
    createProfileFor:{
        type: String,
        required: true,
        trim: true
    },
    motherTongue:{
        type: String,
        required: true,
        trim: true
    },
    maritalStatus:{
        type: String,
        required: true,
        trim: true
    },
    manglik:{
        type: String,
        required: true,
        trim: true
    },
    smoking:{
        type: String,
        required: true,
        trim: true
    },
    drinking:{
        type: String,
        required: true,
        trim: true
    },
    country:{
        type: String,
        required: true,
        trim: true
    },
    state:{
        type: String,
        required: true,
        trim: true
    },
    city:{
        type: String,
        required: true,
        trim: true
    },
    pinCode:{
        type: String,
        required: true,
        trim: true
    },
    highestDegree:{
        type: String,
        required: true,
        trim: true
    },
    employedIn:{
        type: String,
        required: true,
        trim: true
    },
    occupation:{
        type: String,
        required: true,
        trim: true
    },
    business:{
        type: String,
        required: true,
        trim: true
    },
    job:{
        type: String,
        required: true,
        trim: true
    },
    annualIncome:{
        type: String,
        required: true,
        trim: true
    },
    myself:{
        type: Array,
        default: []
    },
    familyType:{
        type: String,
        required: true,
        trim: true
    },
    fatherOccupation:{
        type: String,
        required: true,
        trim: true
    },
    motherOccupation:{
        type: String,
        required: true,
        trim: true
    },
    brother:{
        type: String,
        required: true,
        trim: true
    },
    sister:{
        type: String,
        required: true,
        trim: true
    },
    familyLivingIn:{
        type: String,
        required: true,
        trim: true
    },
    contactAddress:{
        type: Array,
        default: []
    },
    aboutFamily:{
        type: Array,
        default: []
    }
},{
    collection: 'users',
    timestamps: true
})

module.exports = mongoose.model("User", userSchema)