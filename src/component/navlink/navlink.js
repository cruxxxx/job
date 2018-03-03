import React from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

@withRouter 

class NavlinkBar extends React.Component{
  static proptyes={
    data:PropTypes.array.isRequired
  }

  render(){
    const {pathname} = this.props.location    
    const navlist = this.props.data.filter(v=>!v.hide)
    return(
      <div>
      <TabBar>
        {navlist.map(v=>(
          <TabBar.Item
          title= {v.title} 
          key = {v.path}
          icon = {{uri: require(`./img/${v.icon}.png`)}}
          selectedIcon = {{uri: require(`./img/${v.icon}2.png`)}}
          selected = {pathname===v.path}
          onPress = {()=>this.props.history.push(v.path)}
          >
        </TabBar.Item>
        ))}
      
        </TabBar>
        </div>
    )
  }
}

export default NavlinkBar