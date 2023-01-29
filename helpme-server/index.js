const express = require('express')
const cors = require('cors');
const app = express()
const port = 8000
const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/HelpMeDB", () => {
    console.log("connected to DB")})
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/getUserName',(req,res)=>{
    res.send('Liel');
})
app.listen(port, () => {
  console.log(`helpme app listening on port ${port}`)
})