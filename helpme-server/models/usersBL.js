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
    //  let user=new 
 })
}