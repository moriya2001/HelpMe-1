const volunteeringModel=require("../models/volunteeringModel")

const getVolunteering=()=>{
    return new Promise((resolve,reject)=>{

        volunteeringModel.find({},(err,volunteering)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(volunteering)
            }
        })
    })
}
const createVolunteering=(obj)=>{
 return new Promise((resolve,reject)=>{
     let volunteering=new volunteeringModel(obj)
     volunteering.save((err,data)=>{
         if(err){
             reject(err)
         }
         else{
             resolve(data)
         }
     })
 })
}
const updateVolunteering=(id,obj)=>{
    return new Promise((resolve,reject)=>{
        volunteeringModel.findByIdAndUpdate(id,obj,(err)=>{
            if(err){
                reject(err)
            }
            else{
                resolve("update!!!")
            }
        })
    })
}
const deleteVolunteering=(id)=>{
    return new Promise((resolve,reject)=>{
        volunteeringModel.findByIdAndDelete(id,(err)=>{
            if(err){
                reject(err)
            }
            else{
                resolve("delete!!!")
            }
        })
    })
}
const getSearch=(Edate,Sdate,city,idVolunteerType)=>{
    return new Promise((resolve,reject)=>{
        volunteeringModel.find({ SDate: Sdate}, {EDate:Edate},{City:city},{idVolunteerType:idVolunteerType} ,
            function (err, volunteering) {
            if (err){
                reject(err);
            }
            else{
                resolve(volunteering)
            }
        });
      
    })
}
module.exports = { getVolunteering, createVolunteering,updateVolunteering,deleteVolunteering,getSearch }

