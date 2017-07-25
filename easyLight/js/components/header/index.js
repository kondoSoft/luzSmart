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
} from 'react-native';
import styles from './styles';

class HeaderGlobal extends Component {
  render(){
    var button = <Button transparent onPress={() => alert('im the menu button')}><Icon active style={styles.header__icon} name="menu"/></Button>

    return(
      <Header style={styles.header}>
          <Left style={styles.left}>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon style={styles.header__icon} name={(Platform.OS === 'ios')? "ios-arrow-back" : "arrow-back"} />
            </Button>
          </Left>
          <Body style={styles.header__body}>
            {(Platform.OS === 'ios')? <Title style={styles.header__body__title}>{this.props.title}</Title> : null }
          </Body>
          <Right style={{flex: (Platform.OS === 'ios')? 0 : 20, justifyContent: 'flex-end',paddingRight: (Platform.OS === 'ios')? 0 : 15 }}>
            { (Platform.OS === 'ios')? button : <Title style={styles.header__body__title}>{this.props.title}</Title> }
          </Right>
      </Header>
    )
  }
}

export default HeaderGlobal;
