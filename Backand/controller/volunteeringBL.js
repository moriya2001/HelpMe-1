const volunteeringModel = require("../models/volunteeringModel")
// var ObjectId = require('mongodb').ObjectID;
const mongoose = require("mongoose")
const getVolunteering = () => {
    return new Promise((resolve, reject) => {

        volunteeringModel.find({}, (err, volunteering) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(volunteering)
            }
        })
    })
}
const getPendingVolunteerings = (userId) => {
    return new Promise((resolve, reject) => {
        volunteeringModel.find({ Status: 3 }).populate('idVolunteerType').populate('idCity').populate("idVolunteerUser").exec(function (err, volunteering) {
            if (err) {
                reject(err)
            }
            else {
                resolve(volunteering)
            }
        })
    })
}
const getVolunteeringsByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        volunteeringModel.find({ "idVolunteerUser": userId }).populate('idVolunteerType').populate('idCity').populate("idVolunteerUser").exec(function (err, volunteering) {
            if (err) {
                reject(err)
            }
            else {
                resolve(volunteering)
            }
        })
    })
}
const createVolunteering = (obj) => {
    return new Promise((resolve, reject) => {
        let volunteering = new volunteeringModel(obj)
        volunteering.save((err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}
const updateVolunteering = (id, obj) => {
    return new Promise((resolve, reject) => {
        volunteeringModel.findByIdAndUpdate(id, obj, (err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve("update!!!")
            }
        })
    })
}
const updateVolunteeringRemoveUser = (id, userId) => {
    return new Promise((resolve, reject) => {
        volunteeringModel.findByIdAndUpdate(id, { $set: { Status: 0 }, $unset: { idVolunteerUser: userId } }, (err, vol) => {
            if (err) {
                reject(err)
            }
            else {
                resolve("update!!!")
            }
        })
    })
}
const updateVolunteeringApprove = (id) => {
    console.log("updateVolunteeringApprove")
    return new Promise((resolve, reject) => {
        volunteeringModel.findByIdAndUpdate(id, { $set: { Status: 1 } }, (err, vol) => {
            if (err) {
                reject(err)
            }
            else {
                resolve("update!!!")
            }
        })
    })
}
const deleteVolunteering = (id) => {
    return new Promise((resolve, reject) => {
        volunteeringModel.findByIdAndDelete(id, (err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve("delete!!!")
            }
        })
    })
}
const getSearch = (Edate, Sdate, city, idVolunteerType) => {
    console.log("aaaa")
    return new Promise((resolve, reject) => {
        // console.log(idVolunteerType)
        // volunteeringModel.find({"city._id":city,"idVolunteerType._id":idVolunteerType} ,
        // volunteeringModel.find({"idCity":new mongoose.Types.ObjectId(city),"idVolunteerType":new mongoose.Types.ObjectId(idVolunteerType)} ,
        volunteeringModel.find({ Status: { $ne: 1 }, SDate: { $gte: new Date() } }).populate('idVolunteerType').populate('idCity').populate("idVolunteerUser").exec(function (err, volunteering) {
            if (err) {
                console.log(err)
                reject(err);
            }
            else {
                resolve(volunteering)
            }

        });


    })
}
module.exports = {
    getVolunteering,
    createVolunteering,
    updateVolunteering,
    deleteVolunteering,
    getSearch,
    getVolunteeringsByUserId,
    updateVolunteeringRemoveUser,
    getPendingVolunteerings,
    updateVolunteeringApprove,
}

