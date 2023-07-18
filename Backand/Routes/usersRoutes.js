const express = require("express")
const router = express.Router()
const usersBL = require("../controller/usersBL")
const giftsBL = require("../controller/giftBL")
router.get("/", async function (req, res) {
    try {
        let data = await usersBL.getUsers()
        res.status(200).json(data)
    }
    catch (err) {
        res.status(500).json({ msg: err })
    }
})
router.get("/:id", async function (req, res) {
    let id = req.params.id
    let user = await usersBL.getUsersByName(id)
    res.json(user)
})
router.post("/", async function (req, res) {
    let user = req.body
    if(await usersBL.getUsersByEmail(user.Email))
        res.status(400).send("email is already exist");
    await usersBL.createUser(user)
    res.send("created!!!")
})
router.put("/:id", async function (req, res) {
    let id = req.params.id
    let user = req.body
    let status = await usersBL.updateUser(id, user)
    res.status(200).json({ msg: status })
})
router.delete("/:id", async function (req, res) {
    let id = req.params.id
    let status = await usersBL.deleteUser(id)
    res.status(200).json({ msg: status })
})

router.put("/:id/volunteer-approved", async function (req, res, next) {

    const {
        id
    } = req.params;

    await usersBL.updateUserVolunteerCount(id);

    const user = await usersBL.getUserById(id);

    const gift = await giftsBL.findRelevantGift(user)
    gift && await usersBL.addGiftIdToUser(id, gift._id, gift.cost);

    res.send({
        ststus: gift
    })
})

module.exports = router
