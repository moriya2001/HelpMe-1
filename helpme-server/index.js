const express = require('express')
const cors = require('cors');
const app = express()


const port = 8000
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