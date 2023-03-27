const mongoose=require("mongoose")
let volunteerTypeSchema= new mongoose.Schema({
    Name:String,
    Url:String
    
})
const model=mongoose.model("volunteerType",volunteerTypeSchema)
module.exports=model


