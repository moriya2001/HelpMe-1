const express=require("express")
const router=express.Router()
const volunteeringBL=require("../models/volunteeringBL")
router.get("/",async function (req,res){
    try{
        let data=await volunteeringBL.getVolunteer()
        res.status(200).json(data)
    }
    catch (err) {
        res.status(500).json({msg:err})
    }
})
router.post("/",async function (req,res){
    let volunteer=req.body
    await volunteeringBL.createVolunteer(volunteer)
    res.send("created!!!")
})
router.put("/:id",async function (req,res){
    let id=req.params.id
    let volunteer=req.body
    let status=await volunteeringBL.updateVolunteer(id,volunteer)
    res.status(200).json({msg:status})
})
router.delete("/:id",async function(req,res){
    let id=req.params.id
    let status=await volunteeringBL.deleteVolunteer(id)
    res.status(200).json({msg:status})
})

module.exports = router
