const express = require('express')
const utils = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getMoudel('user')
const Chat = model.getMoudel('chat')

const _filter = {'pwd':0,'_v':0}

Router.get('/list',function(req,res){
  //User.remove({},function(e,c){})
  const {type} = req.query
  User.find({type},function(err,doc){
    if(err){
      return res.json({code:1,msg:'后台错误'})
    }
    return res.json({code:0,data:doc})
  })
})

Router.get('/getmsglist',function(req,res){
  const user = req.cookies.user
  User.find({},function(e,userdoc){
     let users = {}
     userdoc.forEach(v=>{
       users[v._id] = {name:v.user,avatar:v.avatar}
     })
     Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){
      if(!err){
        return res.json({code:0,msgs:doc,users:users})
      }
    })
  })
})

Router.post('/login',function(req,res){
  const{user,pwd} = req.body
  User.findOne({user,pwd:md5pwd(pwd)},_filter,function(err,doc){
    if(!doc){
      return res.json({code:1,msg:'用户名不存在或密码错误'})
    }
    res.cookie('userid',doc._id)
    return res.json({code:0,data:doc})
  })
})

Router.post('/update',function(req,res){
  const userid = req.cookies.userid
  if(!userid){
    return res.json({code:1})
  }
  const body = req.body
  User.findByIdAndUpdate(userid,body,function(err,doc){
    const data = Object.assign({},{
      user:doc.user,
      type:doc.type,
    },body)
    return res.json({code:0,data})
  })
})

Router.post('/register',function(req,res){
  const{user,pwd,type} = req.body
  User.findOne({user},function(err,doc){
    if(doc){
      return res.json({code:1,msg:'用户名已存在'})
    }
    const userModel = new User({user,pwd:md5pwd(pwd),type})
    userModel.save(function(e,doc){
      if(e){
        return res.json({code:1,msg:'后端出错了'})
      }
      const {user,type,_id} = doc
      res.cookie('userid', _id)
      return res.json({code:0,data:{user,type,_id}})
    })
  })
})

Router.get('/info',function(req,res){
  const {userid} = req.cookies
  if(!userid){
    return res.json({code:1})
  }
  User.findOne({_id:userid},_filter,function(err,doc){
    if(err){
      return res.json({code:1,msg:'出错啦'})
    }
    if(doc){
      return res.json({code:0,data:doc})
    }
})
})

function md5pwd(pwd){
  const salt = 'woshixiaoxiannv!@#$%'
  return utils.md5(utils.md5(pwd+salt))
}


module.exports = Router