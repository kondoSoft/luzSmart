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
    return(
      <Header>
        <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Icon name="ios-arrow-back" />
          </Button>
        </Left>
        <Body style={styles.header__body}>
          <Title style={styles.header__body__title}>EASYLIGHT</Title>
        </Body>
        <Right>

        </Right>
      </Header>
    )
  }
}

export default HeaderGlobal
