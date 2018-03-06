import React from 'react'
import { NavBar} from 'antd-mobile'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import {getMsgList,recvMsg} from '../../redux/chat.redux'
import NavlinkBar from '../navlink/navlink'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import Msg from '../msg/msg'
import User from '../user/user'
import '../../index.css'

@connect(
  state=>state,
  { getMsgList,recvMsg }
)

class Dashboard extends React.Component{

  componentDidMount(){
    if(!this.props.chat.chatmsg.length){
      this.props.getMsgList()
      this.props.recvMsg() 
    }
  }
  render(){
    const {pathname} = this.props.location
    const navList = [
      {
        path:'/boss',
        text:'牛人',
        icon:'boss',
        title:'牛人列表',
        component:Boss,
        hide:this.props.user.type === 'genius'
      },
      {
        path:'/genius',
        text:'Boss',
        icon:'job',
        title:'Boss列表',
        component:Genius,
        hide:this.props.user.type === 'boss'
      },
      {
        path:'/msg',
        text:'消息',
        icon:'msg',
        title:'聊天消息',
        component:Msg,
      },
      {
        path:'/me',
        text:'我',
        icon:'me',
        title:'个人中心',
        component:User,
      }
    ]
    return(
      <div>
        <NavBar className='fixed-header' mode="dark">
          {navList.find(v=>v.path===pathname).title}
        </NavBar>
        <div style={{marginTop:45}}>
        <Switch>
          {navList.map(v=>(
            <Route key={v.path} path={v.path} component={v.component}></Route>
          ))}
        </Switch>
        </div>
        <NavlinkBar data={navList}></NavlinkBar>
      </div>
    )
  }
}

export default Dashboard