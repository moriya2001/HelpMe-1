
const volunteeringModel = require("../models/volunteeringModel");
const UsersModel = require("../models/usersModel");
const mongoose = require("mongoose");

const getVolunteering = () => {
    return new Promise((resolve, reject) => {
        volunteeringModel
            .find({})
            .populate('idVolunteerType')
            .populate('idCity')
            .populate("Users.user")
            .exec(function (err, volunteering) {
                if (err) {
                    reject(err);
                } else {
                    resolve(volunteering);
                }
            });
    });
}

const getPendingVolunteerings = () => {
    return new Promise((resolve, reject) => {
        volunteeringModel.find({"Users.Status": 3}).populate('idVolunteerType').populate('idCity').populate("Users.user")
            .exec(function (err, volunteering) {
                //return only the users with status 3
                volunteering = volunteering.map(vol => {
                    vol.Users = vol.Users.filter(user => user.Status === 3);
                    return vol;
                });
                if (err) {
                    reject(err);
                } else {
                    resolve(volunteering);
                }
            });
    });
}


const getVolunteeringsByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        volunteeringModel
            .find({"Users.user": userId}) // Update to search within the Users array
            .populate('idVolunteerType')
            .populate('idCity')
            .populate("Users.user")
            .exec(function (err, volunteering) {
                if (err) {
                    reject(err);
                } else {
                    resolve(volunteering);
                }
            });
    });
}

const createVolunteering = (obj) => {
    return new Promise((resolve, reject) => {
        let volunteering = new volunteeringModel(obj);
        // Update to add the user object to the Users array
        volunteering.Users.push({userId: obj.idVolunteerUser, Status: obj.Status});
        volunteering.save((err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}
const updateVolunteeringStatus = (id, idVolunteerUser, status) => {
    return new Promise((resolve, reject) => {
        volunteeringModel.updateOne(
            {_id: id, "Users._id": idVolunteerUser},
            {$set: {"Users.$.Status": status}},
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve("update!!!");
                }
            }
        );
    });
}
const updateVolunteering = (id, obj) => {
    return new Promise((resolve, reject) => {
        volunteeringModel.findByIdAndUpdate(id, obj, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve("update!!!");
            }
        });
    });
}
const addUserToVolunteering = async (id, userId, status) => {
    try {
        // Check if the user exists
        const existUser = await UsersModel.findOne({_id: userId});
        console.log("existUser", existUser)

        if (!existUser) {
            return Promise.reject("User not found in the database");
        }
        await volunteeringModel.findByIdAndUpdate(id, {
            $push: {Users: {user: userId, Status: status}}
        });
        await UsersModel.findOneAndUpdate(
            {_id: userId},
            {$inc: {Coins: 1}}
        );

        return "User added successfully!!!";
    } catch (error) {
        return Promise.reject(error);
    }
};

const updateVolunteeringRemoveUser = (id, userId) => {
    return new Promise((resolve, reject) => {
        volunteeringModel.findByIdAndUpdate(id, {$pull: {Users: {userId}}}, (err) => {
            if (err) {
                reject(err);
            } else {
                UsersModel.findOneAndUpdate(
                    {_id: userId},
                    {$inc: {Coins: -1}},
                    (err, vol) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve("User removed successfully!!!");
                        }
                    }
                );
            }
        });
    });
}

const updateVolunteeringApprove = (id) => {
    console.log("updateVolunteeringApprove", id);
    return new Promise((resolve, reject) => {
        volunteeringModel.findByIdAndUpdate(id, {$set: {Status: 1}}, (err, vol) => {
            if (err) {
                reject(err);
            } else {
                resolve("update!!!");
            }
        });
    });
}

const updateVolunteer = (id, obj) => {
    return new Promise((resolve, reject) => {
        volunteeringModel.findByIdAndUpdate(id, obj, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve("update!!!");
            }
        });
    });
}

const deleteVolunteering = (id) => {
    return new Promise((resolve, reject) => {
        volunteeringModel.findByIdAndDelete(id, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve("delete!!!");
            }
        });
    });
}

const getSearch = async (Ndate, Sdate, city, idVolunteerType) => {
    console.log("aaaa");
    return await volunteeringModel
        .find({})
        .populate("idVolunteerType")
        .populate("idCity")
        .populate("Users.user")
        .exec()
        .then((volunteering) => {
            console.log(volunteering);
            return volunteering;
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
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
    updateVolunteer,
    addUserToVolunteering,
    updateVolunteeringStatus,
};


