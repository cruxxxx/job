import React from 'react'
import { List ,Badge} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'


@withRouter 
@connect(
  state=>state
)
class Msg extends React.Component{
  static proptyes={
  }

  getLast=(arr)=>{
    return arr[arr.length-1]
  }

  render(){
    const Item  = List.Item
    const Brief = Item.Brief
    const userinfo = this.props.chat.users
    const userid = this.props.user._id
    const msgGroup ={} 
    this.props.chat.chatmsg.forEach(v=>{
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    const chatList = Object.values(msgGroup)
    return(
      <div>
        <List>
           {chatList.map(v=>{
             const lastItme = this.getLast(v)
             const targetId = v[0].from === userid?v[0].to:v[0].from
             const name = userinfo[targetId] ?userinfo[targetId].name:''
             const avatar = userinfo[targetId] ?userinfo[targetId].avatar:''
             const unread = v.filter(v=>!v.read&&v.to=== userid).length
             return(
               <Item key={lastItme._id}
                     extra={<Badge text ={unread} />}
                     thumb={require(`../img/${avatar}.png`)}>
                 {lastItme.content}
                 <Brief>{name}</Brief>
               </Item>
             )
           })}
        </List>
      </div>
    )
  }
}

export default Msg