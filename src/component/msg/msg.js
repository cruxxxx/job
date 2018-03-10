import React from 'react'
import { List ,Badge} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import QueueAnim from 'rc-queue-anim'


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
    const chatList = Object.values(msgGroup).sort((a,b)=>{
      const a_last = this.getLast(a).create_time
      const b_last = this.getLast(b).create_time 
      return b_last - a_last     
    })
    return(
      <div>
        <List>
        <QueueAnim delay={300} className="queue-simple">
           {chatList.map(v=>{
             const lastItme = this.getLast(v)
             const targetId = v[0].from === userid?v[0].to:v[0].from
             const name = userinfo[targetId] ?userinfo[targetId].name:''
             const avatar = userinfo[targetId] ?userinfo[targetId].avatar:''
             const unread = v.filter(v=>!v.read&&v.to=== userid).length
             return(
               <Item 
                    style={{zIndex:100}}
                    key={lastItme._id}
                    extra={<Badge text={unread}></Badge>}
                    thumb={require(`../img/${avatar}.png`)}
                    arrow='horizontal'
                    onClick={()=>{
                       this.props.history.push(`/chat/${targetId}`)
                     }}>
                 {lastItme.content}
                 <Brief>{name}</Brief>
               </Item>
             )
           })}
           </QueueAnim>
        </List>
      </div>
    )
  }
}

export default Msg