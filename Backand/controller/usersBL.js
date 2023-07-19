const usersModel = require("../models/usersModel")
const getUsers = () => {
    return new Promise((resolve, reject) => {

        usersModel.find({}, (err, user) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(user)
            }
        })
    })
}
const getUsersByName = (id) => {
    return new Promise((resolve, reject) => {
        usersModel.findById(id, (err, user) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(user)
            }
        })
    })
}
const createUser = (obj) => {
    console.log("from create user")

    return new Promise((resolve, reject) => {
        let user = new usersModel(obj)
        console.log(user)
        user.save((err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}
const updateUser = (id, obj) => {
    return new Promise((resolve, reject) => {
        usersModel.findByIdAndUpdate(id, obj, (err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve("update!!!")
            }
        })
    })
}
const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        usersModel.findByIdAndDelete(id, (err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve("delete!!!")
            }
        })
    })
}

const updateUserVolunteerCount = async (id) => {
    await usersModel.findByIdAndUpdate(id, {
        $inc: {
            Coins: 1
        }
    }).exec()
}

const getUserById = async (id) => await usersModel.findById(id).lean().exec();

const getUsersByEmail = async(email) => await usersModel.findOne({Email: email}).lean().exec();


const addGiftIdToUser = async (userId, giftId, giftCost) => {
    await usersModel.findByIdAndUpdate(userId, {
        $push: {
            giftsIds: giftId
        },
        $inc: {
            Coins: -giftCost
        }
    }).exec();
}

module.exports = {
    getUsers,
    getUsersByName,
    createUser, updateUser, deleteUser,
    updateUserVolunteerCount,
    getUserById,
    addGiftIdToUser,
    getUsersByEmail,
}
