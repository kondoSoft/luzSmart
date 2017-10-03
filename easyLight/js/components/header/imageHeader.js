import React, { Component } from "react";
// import { Header } from 'native-base';
import { Image, View, Text } from 'react-native'
import styles from './styles';


const Header = props => (
  <View style={{justifyContent: 'center', alignItems: 'center'}}>
    <Text style={{color: 'white', textAlign: 'center'}}>{props.scene.route.routeName}</Text>
  </View>
);

const ImageHeader = props => {
  console.log('ImageHeader props', props);
  return(
    <View style={{backgroundColor: '#069b1c',height: 50 }}>
      <Image
        style={styles.header}
        source={require('../../../images/header.png')}
        resizeMode="cover"
      >
        <Header {...props} style={{ backgroundColor: 'transparent' }}/>
      </Image>
    </View>
  );
}

export default ImageHeader;