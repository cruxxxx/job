const express = require("express")
const userRouter = require('./user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getMoudel('chat')
const app = express()
const sever = require('http').Server(app)
const io = require('socket.io')(sever)

io.on('connection',function(socket){
    socket.on('sendmsg',function(data){
        const {from,to,msg} = data
        const chatid = [from,to].sort().join('_')
        Chat.create({chatid,from,to,content:msg},function(err,doc){
            io.emit('recvmsg',Object.assign({},doc._doc))
        })
    })
})

app.use(cookieParser())
app.use(bodyParser.json()) 
app.use('/user',userRouter)

sever.listen(9093,function(){
    console.log('服务开启')
})