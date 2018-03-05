import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button, Picker} from 'antd-mobile'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom';
import Form from '../../component/form/form'


const type = [
  {
    label: 'Boss',
    value: 'boss',
  },
  {
    label: '牛人',
    value: 'genius',
  },
];

@connect(
  state=>state.user,
  { register }
)
@Form

class Register extends React.Component {
  static propTypes = {
    register:PropTypes.func.isRequired
  }

  componentDidMount(){
    this.props.handleChange('type','boss')
  }

 handleRegister=()=>{
   this.props.register(this.props.state)
 }

  render(){
    const choosetype = [this.props.state.type]
    return (
      <div>
        {this.props.turnTo ? <Redirect to={this.props.turnTo} /> :null}
      <Logo/>
      <WingBlank>
        <List>
          {this.props.msg?<p>{this.props.msg}</p>:null}
          <InputItem
          onChange={e=>this.props.handleChange('user',e)}>用户名</InputItem>
          <InputItem
          type='password'
          onChange={e=>this.props.handleChange('pwd',e)}>密码</InputItem>
          <InputItem
          type='password'
          onChange={e=>this.props.handleChange('repwd',e)}>确认密码</InputItem>
        </List>
        <WhiteSpace size="xl"/>
        <Picker data={type} cols={1} value={choosetype} onChange={value=>this.props.handleChange('type',value[0])}>
          <List.Item arrow="horizontal">我是</List.Item>
        </Picker>
        <WhiteSpace size="xl"/>
        <Button type="primary" onClick={this.handleRegister}>注册</Button>
      </WingBlank>
    </div>
    )
  } 
}

export default Register