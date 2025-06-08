const mongoose = require("mongoose")

module.exports.connectToMongoDB = async () =>{
    mongoose.set("strictQuery",false)
    mongoose.connect("mongodb://localhost:27017/summerCampJu").then(
        ()=>{
            console.log("connect to DB")
        }
    ).catch(
        (err)=>{
            console.log(err.message)
        }
    )
}