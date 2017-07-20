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
import styles from './styles';

class HeaderGlobal extends Component {
  render(){
    return(
      <Header style={styles.header}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon style={styles.header__icon} name="ios-arrow-back" />
            </Button>
          </Left>
          <Body style={styles.header__body}>
            {(this.props.title) ? <Title style={styles.header__body__title}>{this.props.title}</Title> : <Title style={styles.header__body__title}>EASYLIGHT</Title>}
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => alert('im the menu button')}
              >
              <Icon active style={styles.header__icon} name="menu"/>
            </Button>
          </Right>
      </Header>
    )
  }
}

export default HeaderGlobal;
