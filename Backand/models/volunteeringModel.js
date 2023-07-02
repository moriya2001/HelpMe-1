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
volunteeringSchema.pre('remove', function(next) {
    // Remove all the assignment docs that reference the removed person.
    this.model('user').remove({ idVolunteerUser: this._id }, next);
});
const model = mongoose.model("volunteering", volunteeringSchema)
module.exports = model

