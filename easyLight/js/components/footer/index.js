import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon, Text, Thumbnail } from 'native-base';
import {
  Platform,
  View,
} from 'react-native';
import styles from "./styles";


class FooterGlobal extends Component {
  render(){
    return (
      <Footer style={{ height: 50, paddingTop: 5,backgroundColor: (Platform.OS === 'ios')? 'transparent' : '#069b1c'}}>
          <FooterTab style={styles.footer}>
            <Button vertical onPress={() => (this.props.navigation.state.routeName == "Contracts") ? null : this.props.navigation.navigate("Contracts")}>
              <Icon style={styles.footer__icon} name="home" />
              {(Platform.OS === 'ios')? <Text style={styles.footer__text}>Inicio</Text> : <View/> }
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate("DetailContract")}>
              <Icon style={styles.footer__icon} name="calendar" />
              {(Platform.OS === 'ios')? <Text style={styles.footer__text}>Periodos</Text> : <View/> }
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate("Measurements")}>
              <Thumbnail source={ require('../../../images/logogray.png') } style={styles.footer__logo} /> 
            </Button>
            <Button vertical style={styles.footer__btn__resultados} onPress={() => this.props.navigation.navigate("Results")}>
              <Icon style={styles.footer__icon} active name="trending-up" />
              {(Platform.OS === 'ios')? <Text style={styles.footer__text__resultados}>Resultados</Text> : <View/> }
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate("Tips")}>

              {(Platform.OS === 'ios')?   <Icon style={styles.footer__icon} name="bulb" /> : <Icon style={styles.footer__icon} name="menu" /> }
              {(Platform.OS === 'ios')?   <Text style={styles.footer__text}>Tips</Text> : <View/> }
            </Button>
          </FooterTab>
        </Footer>
    )
  }
}


export default FooterGlobal
