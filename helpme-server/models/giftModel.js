const mongoose=require("mongoose")
let giftSchema=new mongoose.Schema({
Cost:Number,
Description:String
})
const model=mongoose.model("gift",giftSchema)
module.exports=model