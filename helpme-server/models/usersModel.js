const mongoose=require("mongoose")
let userSchema=new mongoose.Schema({
    FirstName:String,
    LastName:String,
    Tz:String,
    BirthYear:String,
    Phone:String,
    Password:String,
    Status:Boolean,
    Coins:Number
    // idV: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Volunteer",
    //     required: true
    // },
   
    //לבדוק לגבי קישור לטבלת עמותה
})
const model=mongoose.model("user",userSchema)
module.exports=model