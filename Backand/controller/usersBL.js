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
module.exports = { getUsers, createUser, updateUser, deleteUser }
