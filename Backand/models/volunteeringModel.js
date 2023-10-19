const mongoose = require("mongoose")
let volunteeringSchema = new mongoose.Schema({
    Address: String,
    SDate: Date,
    NDate: Date,
    Description: String,
    Users: {
        type: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            },
            Status: Number,
        }],
        default: []
    },
    idVolunteerType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VolunteerType",
    },
    idCity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "city",
    }
})
console.log("pre remove")
volunteeringSchema.pre('remove', function (next) {
    const usersToDelete = this.Users.map(user => user.user);
    this.model('user').deleteMany({_id: {$in: usersToDelete}}, (err) => {
        if (err) {
            next(err);
        } else {
            next();
        }
    });
});
const model = mongoose.model("volunteering", volunteeringSchema)
module.exports = model

