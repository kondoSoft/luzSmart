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
  Dimensions,
} from 'react-native';
import styles from './styles';
const Screen = Dimensions.get('window');


class HeaderGlobal extends Component {
  //
  // handleDrawer(){
  //   this.props.navigation.navigate('DrawerOpen')
  // }
  render(){
    const { state } = this.props.navigation
    const { navigation } = this.props
    const button = <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active style={styles.header__icon} name="menu"/></Button>
    const iconBack =  (<Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Icon style={styles.header__icon} name={(Platform.OS === 'ios')? "ios-arrow-back" : "arrow-back"} />
                      </Button>)
    var platformHeader = (
      <Header style={{backgroundColor: '#069b1c',height: 50 }}>
        <Left style={styles.left,{flex: (Platform.OS === 'ios')? 0 : (state.routeName === 'Login')? 0 : 4 }}>
          {(state.routeName != "Login" && state.routeName != "Contracts") ? iconBack : <View style={{paddingLeft: (state.routeName != "Login" )? '20%' : 0}}/>}
        </Left>
        <Body style={styles.header__body}>
          {(Platform.OS === 'ios')?
          <Title style={styles.header__body__title}>{this.props.title}</Title> :
          (state.routeName === 'Login')? <Title style={styles.header__body__title}>{this.props.title}</Title> : null }
        </Body>
        <Right style={{flex: (state.routeName === 'Login')? 0 : 20,paddingRight: (state.routeName === 'Login')? 35 : 15 }}>
           { (state.routeName == "Login") ? null : (Platform.OS === 'ios')? button : <Title style={styles.header__body__title}>{this.props.title}</Title> }
        </Right>
      </Header>
    )
    if (Platform.OS === 'ios'){
      platformHeader = (
        <Image
        source={require('../../../images/header.png')}
        style={[{ zIndex: (this.props.zIndex)? 1000 : 0 , width: Screen.width},styles.header]}
        >
          <Left style={styles.left}>
            {(state.routeName != "Login" && state.routeName != "Contracts") ? iconBack : <View style={{paddingLeft: (state.routeName != "Login" )? '20%' : 0}}/>}
          </Left>
          <Body style={styles.header__body}>
            {(Platform.OS === 'ios')? <Title style={styles.header__body__title}>{this.props.title}</Title> : null }
          </Body>
          <Right style={styles.right}>
            { (state.routeName == "Login") ? null : (Platform.OS === 'ios')? button : <Title style={[styles.header__body__title]}>{this.props.title}</Title> }
          </Right>
        </Image>
      )
    }
    return  platformHeader
  }
}

export default HeaderGlobal;
