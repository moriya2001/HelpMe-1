const mongoose=require("mongoose")
let volunteeringSchema= new mongoose.volunteeringSchema({
    VolunteeringLocation:String,
    Address:String,
    City:String,
    SDate:Date,
    NDate:Date,
    STime:Number,
    NDate:Number,
    idVolunteerType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "volunteerType",
        
    }
    //Do I have to add foreign key to society num?
})

const model=mongoose.model("volunteering",volunteeringSchema)
module.exports=model

