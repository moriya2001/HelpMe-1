const mongoose=require("mongoose")
let volunteeringSchema= new mongoose.volunteeringSchema({
    // VolunteeringLocation:String,
    Address:String,
    City:String,
    SDate:Date,
    NDate:Date,
    Description:String,
    idVolunteerType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "volunteerType",
        
    }
   
})

const model=mongoose.model("volunteering",volunteeringSchema)
module.exports=model

