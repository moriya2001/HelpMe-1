const mongoose=require("mongoose")
let messageSchema=new mongoose.Schema({
MessageContent:String,
Date:String,
Time:String,
Status:Boolean
   
    
})
const model=mongoose.model("message",messageSchema)
module.exports=model