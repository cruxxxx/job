import axios from 'axios'
import io from 'socket.io-client'

const socket = io('ws://localhost:9093')

const MSG_LIST = 'MSG_LIST'
const MSG_RECV = 'MSG_RECV'
const MSR_READ = 'MSR_READ'

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
    const un = action.data.to ===action.userid?1:0  
    return {...state,chatmsg:[...state.chatmsg,action.data],unread:un+1}
    //case MSR_READ:
    default:
      return state
  }  
}

function msgRecv(data,userid){
  return {type:MSG_RECV,data,userid}
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

export function getMsgList(type){
  return (dispatch,getState)=>{
    axios.get('/user/getmsglist')
      .then(res=>{
        if(res.status===200 &&res.data.code===0){
          const userid = getState().user._id
          dispatch(msgList(res.data.msgs,res.data.users,userid))
        }
      }
      )
  }
}