const societyModel=require("./societyModel")
const getSociety=()=>{
    return new promise ((resolve, reject)=>{

        societyModel.find({},(err, society)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(society)
            }
        })
    })
}

const createSociety=(obj)=>{
    return new Promise((resolve,reject)=>{
        let society=new societyModel(obj)
        society.save((err,data)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(data)
            }
        })
    })
   }

   const updateSociety=(id,obj)=>{
    return new Promise((resolve,reject)=>{
        societyModel.findByIdAndUpdate(id,obj,(err)=>{
            if(err){
                reject(err)
            }
            else{
                resolve("update!!!")
            }
        })
    })
}

const deleteSociety=(id)=>{
    return new Promise((resolve,reject)=>{
        societyModel.findByIdAndDelete(id,(err)=>{
            if(err){
                reject(err)
            }
            else{
                resolve("delete!!!")
            }
        })
    })
}
module.exports = { getSociety, createSociety,updateSociety,deleteSociety }
