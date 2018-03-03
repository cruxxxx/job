import React from 'react'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import Logo from '../../component/logo/logo'
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'

@connect(
  state=>state.user,
  { login }
)

class Login extends React.Component {
  static propTypes = {
    login:PropTypes.func.isRequired
  }

  constructor(props){
    super(props)
    this.state={
      user:'',
      pwd:''
    }
  }

  register=()=>{
    this.props.history.push('./register')
  }

  handleChange = (key,val)=>{
    this.setState({
      [key]:val
    })
  }

 handleLogin=()=>{
   this.props.login(this.state)
 }

  render(){ 
    return (
    <div>
    {this.props.turnTo ? <Redirect to={this.props.turnTo} /> :null}
      <Logo />
      <WingBlank>
        <List>
        {this.props.msg?<p>{this.props.msg}</p>:null}
          <InputItem onChange={e=>this.handleChange('user',e)}>用户名</InputItem>
          <InputItem type='password' onChange={e=>this.handleChange('pwd',e)}>密码</InputItem>
        </List>
        <WhiteSpace size="xl"/>
        <Button type="primary" onClick={this.handleLogin}>登录</Button>
        <WhiteSpace />
        <Button type="default" onClick={this.register}>注册</Button>
      </WingBlank>
    </div>
  )
  }
}

export default Login