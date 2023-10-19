const mongoose=require("mongoose")
const volunteerToVolunteer=new mongoose.Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    idVolunteer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "volunteering"
    }

})
const model=mongoose.model("volunteerTovolunteer",volunteerToVolunteer)
module.exports=model