import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    console.log(this.props.navigation);
    return(
      <Header style={styles.header}>
        <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Icon style={styles.header__icon} name="ios-arrow-back" />
          </Button>
        </Left>
        <Body style={styles.header__body}>
          <Title style={styles.header__body__title}>EASYLIGHT</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon active style={styles.header__icon} name="menu"/>
          </Button>
        </Right>
      </Header>
    )
  }
}


export default HeaderGlobal;
