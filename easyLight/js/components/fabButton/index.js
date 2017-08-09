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
      <View
        style={{
          backgroundColor: 'steelblue',
          width: (Platform.OS === 'ios')? 50 : 75,
          height: (Platform.OS === 'ios')? 50 : 75,
          borderRadius: 25,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: (Platform.OS === 'ios')? 60 : 30,
          right: (Platform.OS === 'ios')? 5 : 10,
          overflow: 'hidden',
        }}>
        <TouchableOpacity
          onPress={(this.props.navigateTo === undefined)? this.props.onTap : this.onNavigateTo }
          style={{ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
          {this.props.children}
        </TouchableOpacity>
      </View>
    )
  }
}
