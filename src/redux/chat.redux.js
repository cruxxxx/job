import axios from 'axios'
import io from 'socket.io-client'

const socket = io('ws://localhost:9093')

const MSG_LIST = 'MSG_LIST'
const MSG_RECV = 'MSG_RECV'
const MSG_READ = 'MSR_READ'

const initState = {
  chatmsg:[],
  unread:0,
  users:{}
}

export function chat(state=initState,action){
  switch(action.type){
    case MSG_LIST:
    return {...state, users:action.users,chatmsg:action.msgs,unread:action.msgs.filter(v=>!v.read&&v.to===action.userid).length}
    case MSG_RECV:
    const un = action.data.to === action.userid?1:0
    return {...state,chatmsg:[...state.chatmsg,action.data],unread:state.unread+un}
    case MSG_READ:
    const {from,num}=action.payload
    return {...state, chatmsg:state.chatmsg.map(v=>({ ...v,read:from===v.from?true:v.read })),unread:state.unread-num}
    default:
      return state 
  }  
}

function msgRecv(data,userid){
  return {type:MSG_RECV,data,userid}
}

function msgRead({from,to,num}){
  return {type: MSG_READ,payload:{from,to,num}}
}
 
export function readMsg(from){
  return async (dispatch,getState)=>{
    const res = await axios.post('/user/readmsg',{from})
        const userid = getState().user._id
        if(res.status===200 && res.data.code===0){
          dispatch(msgRead({from,userid,num:res.data.num}))
        }
  }
}
 
export function sendMsg({from,to,msg}){
  return dispatch=>{
  socket.emit('sendmsg',{from,to,msg})    
  }
}

export function recvMsg(data){
  return (dispatch,getState)=>{
    socket.on('recvmsg',function(data){
      const userid = getState().user._id
      dispatch(msgRecv(data,userid)) 
    })
  }
}

function msgList(msgs,users,usersid){
  return {type:MSG_LIST,msgs,users,usersid}
}

export function getMsgList(){
  return async (dispatch,getState)=>{
    const res = await axios.get('/user/getmsglist')
        if(res.status===200 &&res.data.code===0){
          const userid = getState().user._id
          dispatch(msgList(res.data.msgs,res.data.users,userid))
        }
  }
}