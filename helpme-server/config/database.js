const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/HelpMeDB", () => {
    console.log("connected to DB")})
