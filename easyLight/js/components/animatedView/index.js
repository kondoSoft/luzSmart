import React, { Component } from 'react';
import {
  Keyboard,
  Animated,
  Platform,
} from 'react-native';



class AnimatedView extends Component{
  constructor(props){
    super(props)

    this.state ={
      animatedVal: new Animated.ValueXY()
    }
    this._keyboardDidShow = this._keyboardDidShow.bind(this);
    this._keyboardDidHide = this._keyboardDidHide.bind(this);
  }
  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow () {
    Animated.spring(
      this.state.animatedVal,
      {
        toValue:{x:0,y:(Platform.OS === 'ios')? -180 : -100}
      },
    ).start();
  }

  _keyboardDidHide () {
    Animated.spring(
      this.state.animatedVal,
      {
        toValue:{x:0,y:0}
      },
    ).start();
  }
  render(){
    return(
      <Animated.View style={[this.state.animatedVal.getLayout(),{ flex: 1, zIndex: 0 }]}>
          {this.props.children}
      </Animated.View>
    )
  }
}

export default AnimatedView;
