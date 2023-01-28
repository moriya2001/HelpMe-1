const usersModel=require("./usersModel")
const getUsers=()=>{
    return new Promise((resolve,reject)=>{

        usersModel.find({},(err,user)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(user)
            }
        })
    })
}
const createUser=(obj)=>{
 return new Promise((resolve,reject)=>{
     let user=new usersModel(obj)
     user.save((err,data)=>{
         if(err){
             reject(err)
         }
         else{
             resolve(data)
         }
     })
 })
}
const updateUser=(id,obj)=>{
    return new Promise((resolve,reject)=>{
        usersModel.findByIdAndUpdate(id,obj,(err)=>{
            if(err){
                reject(err)
            }
            else{
                resolve("update!!!")
            }
        })
    })
}
const deleteUser=(id)=>{
    return new Promise((resolve,reject)=>{
        usersModel.findByIdAndDelete(id,(err)=>{
            if(err){
                reject(err)
            }
            else{
                resolve("delete!!!")
            }
        })
    })
}
module.exports = { getUsers, createUser,updateUser,deleteUser }
