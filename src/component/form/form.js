import React from 'react'

export default function Form(Comp){
  return class wrapperComp extends React.Component{
    constructor(props){
      super(props)
      this.state={}
    }
  
    handleChange = (key,val)=>{
      this.setState({
        [key]:val
      })
    }

    render(){
      return <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
    }
  }
}