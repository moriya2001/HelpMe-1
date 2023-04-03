const express=require("express")
const router=express.Router()
const usersBL=require("../controller/usersBL")
router.get("/",async function (req,res){
    try{
        let data=await usersBL.getUsers()
        res.status(200).json(data)
    }
    catch (err) {
        res.status(500).json({msg:err})
    }
})
router.get("/:id", async function (req, res) {
    let id = req.params.id
    let user = await usersBL.getUsersByName(id)
    res.json(user)
})
router.post("/",async function (req,res){
    let user=req.body
    await usersBL.createUser(user)
    res.send("created!!!")
})
router.put("/:id",async function (req,res){
    let id=req.params.id
    let user=req.body
    let status=await usersBL.updateUser(id,user)
    res.status(200).json({msg:status})
})
router.delete("/:id",async function(req,res){
    let id=req.params.id
    let status=await usersBL.deleteUser(id)
    res.status(200).json({msg:status})
})

module.exports = router