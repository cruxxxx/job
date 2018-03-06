import React from 'react'
import { List, InputItem ,NavBar,Icon,Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList,sendMsg,recvMsg,readMsg} from '../../redux/chat.redux'
import '../../index.css'
import { getChatId } from '../../utill';

@connect(
  state=>state,
  { getMsgList,sendMsg,recvMsg,readMsg} 
)
class Chat extends React.Component{
  constructor(props){
    super(props)
    this.state={
      text:'',
      msg:[] 
    }
  }

  componentDidMount(){
    if(!this.props.chat.chatmsg.length){
      this.props.getMsgList()
      this.props.recvMsg() 
    }
  }

  componentWillUnmount(){
    this.props.readMsg(this.props.match.params.user)
  }

  fix(){
    setTimeout(function(){
      window.dispatchEvent(new Event('resize'))
    },0)
  }

  submit=()=>{
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from,to,msg})
    this.setState({
      text:'',
      showEmoji:false
    })
  }

  render(){
    const emoji = '😀 😁 🤣 😂 😄 😅 😆 😇 😉 😊 🙂 🙃 😋 😌 😍 😘'.split(' ')
    .filter(v=>v).map(v=>({text:v}))
    const userid = this.props.match.params.user //聊天对象
    const Item = List.Item
    const users = this.props.chat.users //用户信息
    console.log(users)
    if(!users[userid]){
      return null
    }
    const chatid = getChatId(userid,this.props.user._id)
    const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid===chatid) //筛选某个人相对应得聊天内容
    return(
      <div id='chat-page'>
        <NavBar mode='dark' 
        icon={<Icon type="left" />} 
        onLeftClick={() => this.props.history.goBack()}>
        {users[userid].name}
        </NavBar>
        {chatmsgs.map(v=>{
          const avatar = require(`../img/${users[v.from].avatar}.png`)
          return v.from === userid?(
            <List key={v._id}>
              <Item 
              thumb={avatar}>
              {v.content}</Item>
            </List> 
          ):(
            <List key={v._id}>
              <Item className='chat-me' extra={<img src={avatar} alt=''/>}>               
              {v.content}</Item>
            </List> )
        })}
      <div className='stick-footer'>
        <List>
          <InputItem 
          placeholder='请输入'
          value={this.state.text}
          onChange={(v)=>{this.setState({text:v})}}
          extra={<div>
            <span
            role="img" aria-label="mua"
            style={{"marginRight":15}} 
            onClick={()=>{this.setState({showEmoji:true})
                          this.fix()}}>😘</span>
            <span onClick={this.submit}>发送</span>
            </div>}
          />
        </List>
        {this.state.showEmoji?<Grid data={emoji}
        columnNum={9}
        isCarousel={true}
        carouselMaxRow={3}
        onClick={el=>this.setState({text:this.state.text+el.text})}
        />:null}
      </div>
      </div>
    )
  }
} 

export default Chat