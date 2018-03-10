import axios from 'axios'

const LIST = 'LIST'
const ERROR_MSG = 'ERROR_MSG'


const initState ={
  lists:[],
  msg:''
}

export function chatuser(state=initState,action){
  switch(action.type){
    case ERROR_MSG:
    return {...state, msg:action.msg}
    case LIST:
      return {...state, lists: action.data}
    default:
      return state
  }  
}
function errorMSG(msg){
  return { msg,type:ERROR_MSG }
}

function List(data){
  return { data,type:LIST }
}

export function list(type){
  return async dispatch=>{
   const res = await axios.get(`/user/list?type=${type}`)
        if(res.data.code===0){
          dispatch(List(res.data.data))
        }else{
          dispatch(errorMSG(res.data.msg))
        }
  }
}

