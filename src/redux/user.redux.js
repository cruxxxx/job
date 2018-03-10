import axios from 'axios'
import {getTurnPath} from '../utill'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const LOGOUT = 'LOGOUT'


const initState ={
  turnTo:'',
  msg:'',
  user:'',
  type:''
}

export function user(state=initState,action){
  switch(action.type){
    case AUTH_SUCCESS:
      return {...state, turnTo:getTurnPath(action.data), ...action.data}
    case ERROR_MSG:
      return {...state, turnTo:'',msg:action.msg}
    case LOAD_DATA:
      return {...state, ...action.data}
    case LOGOUT:
      return {...initState, turnTo:'/login'}
    default:
      return state
  }  
}
function errorMSG(msg){
  return { msg,type:ERROR_MSG }
}

function authSuccess(obj){
  const {pwd,...data}=obj
  return { type:AUTH_SUCCESS, data}
}


export function loadData(data){
  return { type:LOAD_DATA, data}
}

export function logoutSubmit(){
  return { type:LOGOUT}
}

export function update(data){
  return async dispatch=>{
    const res = await axios.post('/user/update',data)
      if(res.status===200&&res.data.code===0){
            dispatch(authSuccess(res.data.data))
          }else{
            dispatch(errorMSG(res.data.msg))
          }
    }
  }

export function register({user,pwd,repwd,type}){  
  if(!user||!pwd){
    return errorMSG('请输入用户名密码')
  }
  if(pwd!==repwd){
    return errorMSG('输入密码不一致')
  }
  return async dispatch=>{
    const res = await axios.post('/user/register',{user,pwd,type})
        if(res.status===200&&res.data.code===0){
          dispatch(authSuccess({user,pwd,type}))
        }else{
          dispatch(errorMSG(res.data.msg))
        }
  }
}

export function login({user,pwd}){  
  if(!user||!pwd){
    return errorMSG('请输入用户名密码')
  }
  return async dispatch=>{
    const res = await axios.post('/user/login',{user,pwd})
      
        if(res.status===200&&res.data.code===0){
          dispatch(authSuccess(res.data.data))
        }else{
          dispatch(errorMSG(res.data.msg))
        }
  }
}
