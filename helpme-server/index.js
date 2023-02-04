const express = require('express')
const cors = require('cors');
const app = express()
require("./config/database")

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/getUserName',(req,res)=>{
    res.send('Liel');
})
const userRoute=require("./Routes/usersRoutes")
app.use("/users",userRoute)
const port = 8000
app.listen(port, () => {
  console.log(`helpme app listening on port ${port}`)
})