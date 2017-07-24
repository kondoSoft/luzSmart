import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';

export default class FabButton extends Component{
  constructor(props){
    super(props)
    this.onNavigateTo = this.onNavigateTo.bind(this);
  }
  onNavigateTo(){
    this.props.navigation.navigate(this.props.navigateTo)
  }
  render(){
    return(
      <View style={{ backgroundColor: 'steelblue', width: 70, height: 70, borderRadius: 50, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: (Platform.OS === 'ios')? 60 : 30, right: 10}}>
        <TouchableOpacity
          onPress={(this.props.navigateTo === undefined)? this.props.onTap : this.onNavigateTo }
          style={{ borderColor: '#fff', borderTopWidth: 2, borderBottomWidth: 2, borderLeftWidth: 2, borderRightWidth: 2,width: 65, height: 65, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
          {this.props.children}
        </TouchableOpacity>
      </View>
    )
  }
}
