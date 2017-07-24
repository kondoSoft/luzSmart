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
    console.log('this is the navigateTo prop',this.props.navigateTo);
    console.log('this is the onTap prop', this.props.onTap);
    return(
      <View style={{ backgroundColor: 'steelblue', width: 60, height: 60, borderRadius: 50, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: (Platform.OS === 'ios')? 80 : 30, right: 10}}>
        <TouchableOpacity
          onPress={(this.props.navigateTo === undefined)? this.props.onTap : this.onNavigateTo }
          style={{ width: 65, height: 65, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
          {this.props.children}
        </TouchableOpacity>
      </View>
    )
  }
}
