import React from 'react'
import { connect } from 'react-redux'
import { Result, WhiteSpace ,List,Modal} from 'antd-mobile'
import browserCookies from 'browser-cookies'
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import { logoutSubmit } from '../../redux/user.redux'


@connect(
  state=>state.user,
  { logoutSubmit }
)

class User extends React.Component{
  static propTypes = {
    logoutSubmit:PropTypes.func.isRequired
  }

  logout =()=>{
    const alert = Modal.alert;
    alert('注销', '确定注销???', [
      { text: 'Cancel', onPress: () => console.log('cancel') },
      { text: 'Ok', onPress: () => {
        browserCookies.erase('userid')
        this.props.logoutSubmit()} },
    ])
  }

  render(){
    const Item = List.Item;
    const Brief = List.Item.Brief;
    
    return this.props.user?(
      <div>
        <Result
          img={<img src={require(`../img/${this.props.avatar}.png`)} style={{width:"65px"}} alt=''/>}
          title={this.props.user}
          message={this.props.type==='boss'?this.props.company:null}
        />
        <List renderHeader={()=>"简介"}>
          <Item multipleLine>
          {this.props.title}
          {this.props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
          {this.props.money?<Brief>薪资:{this.props.money}</Brief>:null}
          </Item>
        </List>
        <WhiteSpace />          
        <List>
        <Item style={{"zIndex":100}} onClick={this.logout}>取消登录</Item>
      </List>
      </div>
    ):<Redirect to={this.props.turnTo} />
  }
}

export default User