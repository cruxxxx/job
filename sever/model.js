const mongoose = require("mongoose")
const DB_URL = "mongodb://localhost:27017/chat"
mongoose.connect(DB_URL)
mongoose.connection.on("connected",function(){
    console.log("mongo connected")
})

const models = {
    user:{
        'user':{type:String,require:true},
        'pwd':{type:String,require:true},
        'type':{type:String,require:true},
        'avatar':{type:String},
        'desc':{type:String},
        'title':{type:String},//职位
        'company':{type:String},
        'money':{type:String}                   
    },
    chat:{

    }
}

for(let m in models){
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getMoudel:function(name){
        return mongoose.model(name)
    }
}