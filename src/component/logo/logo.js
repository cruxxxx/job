import React from 'react'
import loglImg from './logo.png'
import './logo.css'

class Logo extends React.Component {
  render(){
    return (
      <div className="logo-container">
      <img src={loglImg} alt="" style={{width:"100%"}}/>
      </div>
    )
  }
}

export default Logo