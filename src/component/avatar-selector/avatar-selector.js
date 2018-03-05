import React from 'react'
import PropTypes from 'prop-types'
import { ImagePicker,List} from 'antd-mobile';

const avatarList = '长颈鹿,狮子,天鹅,panda,鸡,鱼,章鱼,猪,鸭子'.split(',').map(
  v=>({
    url:require(`../img/${v}.png`),
    id:v
  })
)
class AvatarSelector extends React.Component {
  static propTypes = {
    selectAvatar:PropTypes.func.isRequired
  }

  constructor(props){
    super(props)
    this.state={
      files:avatarList,
      icon:''
    }
  }


  onChange = (files, type, index) => {
    this.setState({
      files,
    });
  }

  render(){ 

    const avatar = this.state.icon?(<div>
                                      <span>已选择头像</span>
                                      <img style={{width:20}} src={this.state.icon} alt=""/>
                                      </div>):(<div>请选择头像</div>)
    return (
    <div>
    <List renderHeader={()=>avatar}>
    <ImagePicker
          files={this.state.files}
          onChange={this.onChange}
          onImageClick={(index,fs)=>{
            this.setState({icon:fs[index].url})
            this.props.selectAvatar(fs[index].id)}}
          selectable={avatarList.length < 12}
        />
    </List>
    </div>
  )
  }
}

export default AvatarSelector