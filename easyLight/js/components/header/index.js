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
} from 'react-native';
import styles from './styles';

class HeaderGlobal extends Component {
  render(){
    var button = <Button transparent onPress={() => alert('im the menu button')}><Icon active style={styles.header__icon} name="menu"/></Button>
    return(
      <View style={[styles.header,{ zIndex: (this.props.zIndex)? 1000 : 0 }]}>
          <Left style={styles.left}>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon style={styles.header__icon} name={(Platform.OS === 'ios')? "ios-arrow-back" : "arrow-back"} />
            </Button>
          </Left>
          <Body style={styles.header__body}>
            {(Platform.OS === 'ios')? <Title style={styles.header__body__title}>{this.props.title}</Title> : null }
          </Body>
          <Right style={styles.right}>
            { (Platform.OS === 'ios')? button : <Title style={styles.header__body__title}>{this.props.title}</Title> }
          </Right>
      </View>
    )
  }
}

export default HeaderGlobal;
