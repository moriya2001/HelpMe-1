const mongoose=require("mongoose")
let userSchema=new mongoose.Schema({
    FirstName:String,
    LastName:String,
    Tz:String,
    BirthYear:String,
    Phone:String,
    Password:String,
    Status:Boolean,
    Coins:Number,
    Email:String
 })
const model=mongoose.model("user",userSchema)
module.exports=model