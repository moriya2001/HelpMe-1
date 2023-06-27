const mongoose = require("mongoose")
let volunteeringSchema = new mongoose.Schema({
    // VolunteeringLocation:String,
    Address: String,
    SDate: Date,
    NDate: Date,
    Description: String,
    Status: Number,
    idVolunteerUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    idVolunteerType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "volunteerType",

    },
    idCity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "city",

    }
})

const model = mongoose.model("volunteering", volunteeringSchema)
module.exports = model

