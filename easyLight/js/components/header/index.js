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
  static navigationOptions = {
    header: null
  };
  static propTypes = {
    openDrawer: React.PropTypes.func
  };
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
            onPress={() => this.props.navigation.navigate('Contracts')}
            >
            <Icon active style={styles.header__icon} name="menu"/>
          </Button>
        </Right>
      </Header>
    )
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer())
  };
}


export default HeaderGlobal;
