const mongoose = require('mongoose')

const connectusSchema = new mongoose.Schema({
    lookingFor: {
        type: String,
        trim: true
    },
    userName:{
        type: String,
        trim: true
    },
    email:{
        type: String,
        trim: true,
        unique: [true, "email already exists."]
    },
    phoneNumber:{
        type: String,
        trim: true,
        unique: [true, "mobile already exists."]
    },
    location:{
        type: String,
        trim: true
    },
    query:{
        type: Array,
        default: []
    }
},{
    collection: 'connectWithUs',
    timestamps: true
})

module.exports = mongoose.model("Connectus", connectusSchema)