const mongoose=require("mongoose")
let volunteeringSchema= new mongoose.volunteeringSchema({
    VolunteeringLocation:String,
    Address:String,
    Time:String
    //Do I have to add foreign key to society num?
})

const model=mongoose.model("volunteering",volunteeringSchema)
module.exports=model

