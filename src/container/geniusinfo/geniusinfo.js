import React from 'react'
import { NavBar, WhiteSpace ,InputItem,TextareaItem,Button,WingBlank} from 'antd-mobile';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import { update } from '../../redux/user.redux'


@connect(
  state=>state.user,
  { update }
)

class geniusInfo extends React.Component {
  static propTypes = {
    update:PropTypes.func.isRequired,
    turnTo:PropTypes.string.isRequired
  }
  constructor(props){
    super(props)
    this.state={
      title:'',
      company:'',
      desc:'',
      avatar:''
    }
  }

  handleChange = (key,val)=>{
    this.setState({
      [key]:val
    })
  }

  selectAvatar=(imgid)=>{
    this.setState({
      avatar:imgid
    })
  }

  render(){ 
    const path = this.props.location.pathname
    const redirect = this.props.turnTo
    return (
    <div>
      {redirect&&redirect!==path? <Redirect to={this.props.turnTo} /> :null}
      <NavBar mode="dark">牛人个人信息</NavBar>
      <WingBlank>
      <AvatarSelector selectAvatar={this.selectAvatar}/> 
      <InputItem onChange={e=>this.handleChange('title',e)}>求职岗位</InputItem>
      <TextareaItem rows={3} autoHeight title='个人简介' onChange={e=>this.handleChange('desc',e)} />  
      <WhiteSpace />
      <Button onClick={()=>this.props.update(this.state)}type='primary'>保存</Button>
      </WingBlank>
    </div>
  )
  }
}

export default geniusInfo