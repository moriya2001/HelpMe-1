const express = require("express")
const router = express.Router()
const volunteeringBL = require("../controller/volunteeringBL")
router.get("/", async function (req, res) {
    try {
        let data = await volunteeringBL.getVolunteering()
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json({msg: err})
    }
})


router.get("/getVolunteeringsByUserId/:userId", async function (req, res) {
    try {
        let userId = req.params.userId;
        let data = await volunteeringBL.getVolunteeringsByUserId(userId);
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json({msg: err})
    }
})
router.get("/getPendingVolunteerings", async function (req, res) {
    try {
        console.log("getPendingVolunteerings")
        let data = await volunteeringBL.getPendingVolunteerings();
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json({msg: err})
    }
})
router.get("/search", async function (req, res) {
    // res.send(req.query)
    // res.send(req.query.hasOwnProperty("city"))
    // console.log(req.params)

    // let Sdate = req.query.hasOwnProperty("Sdate") ? req.query.Sdate : null
    // let Edate = req.query.hasOwnProperty("Edate") ? req.query.Edate : null
    // let city = req.query.hasOwnProperty("city") ? req.query.city : null
    // let idVolunteerType = req.query.hasOwnProperty("idVolunteerType") ? req.query.idVolunteerType : null

    let data = await volunteeringBL.getSearch()
    res.status(200).json({msg: data})
})
router.post("/", async function (req, res) {
    try {
        let volunteer = req.body
        await volunteeringBL.createVolunteering(volunteer)
        res.send("created!!!")
    } catch (err) {
        res.status(500).json({msg: err})
    }
})
router.put("/updateStatus/:id", async function (req, res) {
    try {
        const {id} = req.params;
        const {idVolunteerUser, status} = req.body
        const response = await volunteeringBL.updateVolunteeringStatus(id, idVolunteerUser, status)
        res.status(200).json({msg: response})
    } catch (err) {
        res.status(500).json({msg: err.message})
    }
})
router.put("/updateVolunteeringRemoveUser/:id", async function (req, res) {
    let id = req.params.id;
    const userId = req.body.userId;
    let status = await volunteeringBL.updateVolunteeringRemoveUser(id, userId)
    res.status(200).json({msg: status})
})

router.put("/addUser/:id", async (req, res) => {
    const {id} = req.params;
    const {userId, status} = req.body;
    const resStatus = await volunteeringBL.addUserToVolunteering(id, userId, status)
    res.status(200).json({msg: resStatus})
})
router.put("/updateVolunteeringApprove/:id", async function (req, res) {
    console.log("routing updateVolunteeringApprove")
    let id = req.params.id;
    let status = await volunteeringBL.updateVolunteeringApprove(id)
    res.status(200).json({msg: status})
})
//update volunteer
router.put("/updateVolunteer/:id", async (req, res) => {
    let id = req.params.id;
    console.log(req.body)
    const volunteer = req.body;
    let status = await volunteeringBL.updateVolunteer(id, volunteer)
    res.status(200).json({msg: status})
})
router.delete("/:id", async function (req, res) {
    let id = req.params.id
    let status = await volunteeringBL.deleteVolunteering(id)
    res.status(200).json({msg: status})
})


module.exports = router
