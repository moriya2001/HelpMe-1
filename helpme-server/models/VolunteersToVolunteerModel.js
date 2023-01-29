const mongoose=require("mongoose")
let volunteerTovolunteer=new mongoose.Schema({
    Status:Boolean,
    StartTime:String,
    EndTime:String,
   
})
const model=mongoose.model("volunteerTovolunteer",volunteerTovolunteer)
module.exports=model