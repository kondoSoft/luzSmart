import React, { Component } from 'react';
import {
  Body,
  Header,
  Title,
  Left,
  Button,
  Icon,
  Right,
} from 'native-base';
import {
  Platform,
  View,
  Image,
} from 'react-native';
import styles from './styles';

class HeaderGlobal extends Component {

  render(){
    const { state } = this.props.navigation
    const button = <Button transparent onPress={() => alert('im the menu button')}><Icon active style={styles.header__icon} name="menu"/></Button>
    const iconBack =  <Button transparent onPress={() => this.props.navigation.goBack()}>
        <Icon style={styles.header__icon} name={(Platform.OS === 'ios')? "ios-arrow-back" : "arrow-back"} />
      </Button>


    return(

        <Image source={require('../../../images/header.png')}
          style={[styles.header,{ zIndex: (this.props.zIndex)? 1000 : 0}]}
        >
          <Left style={styles.left}>
            {(state.routeName != "Login" && state.routeName != "Contracts") ? iconBack : <View style={{paddingLeft: (state.routeName != "Login" )? '20%' : 0}}/>}
          </Left>
          <Body style={styles.header__body}>
            {(Platform.OS === 'ios')? <Title style={styles.header__body__title}>{this.props.title}</Title> : null }
          </Body>
          <Right style={styles.right}>
             { (state.routeName == "Login") ? null : (Platform.OS === 'ios')? button : <Title style={styles.header__body__title}>{this.props.title}</Title> }
          </Right>
        </Image>
    )
  }
}

export default HeaderGlobal;
