import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Userlist from '../../component/usercard/usercard'
import { list } from '../../redux/chatuser.redux'

@connect(
  state=>state.chatuser,
  { list }
)

class Genius extends React.Component{
  static proptyes={
    list:PropTypes.func.isRequired
  }
  componentDidMount(){
    this.props.list('boss')
  }
  render(){
    return(
      <Userlist lists={this.props.lists} />
    )
  }
}

export default Genius