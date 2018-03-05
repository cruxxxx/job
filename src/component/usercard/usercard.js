import React from 'react'
import PropTypes from 'prop-types'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import { withRouter } from 'react-router-dom'

@withRouter
class Userlist extends React.Component {
  static propTypes = {
    lists:PropTypes.array.isRequired
  }

  handleClick=(v)=>{
    this.props.history.push(`/chat/${v._id}`)
  }

  render(){
    return(
      <div>
      <WingBlank size="lg">
      {this.props.lists.map(v=>(
         v.avatar?
        <div key={v._id}>
        <WhiteSpace />
         <Card style={{zIndex:100}} onClick={()=>this.handleClick(v)}>
           <Card.Header 
           title={v.user}
           thumb={require(`../img/${v.avatar}.png`)}
           thumbStyle={{width:"25px",height:"25px"}}
           extra={<span>{v.title}</span>}
           />
           <Card.Body>
           {v.type==='boss'?<div>公司:{v.company}</div>:null}             
             {v.desc.split('\n').map(v=>(
               <div key={v}>{v}</div>
             ))}
             {v.type==='boss'?<div>薪资:{v.money}</div>:null}
           </Card.Body>
           <Card.Footer />
          </Card>
          </div>:null
      ))}
     </WingBlank>
      </div>
    )
   }

}

export default Userlist