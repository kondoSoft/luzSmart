import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon, Text, Thumbnail } from 'native-base';
import {
  Platform,
  View,
  AlertIOS,
  Alert,
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import styles from "./styles";

class FooterGlobal extends Component {

  navigateTo(route){   
    this.props.navigation.state.routes.map((item,i)=> {
      console.log(i != this.props.navigation.state.index)
      if(i != this.props.navigation.state.index){
        if(item.routeName === route){
          console.log('me ejecute', i)
          this.props.navigation.navigate(route)
        }
      }
    })
  }


  render() {
    this.navigateTo()
    console.log(this.props,'this.props')
    const { state } = this.props.navigation;
    return (
      <Footer style={{ height: 50, paddingTop: 8,backgroundColor: (Platform.OS === 'ios')? 'transparent' : '#069b1c'}}>
          <FooterTab style={styles.footer}>
          
            <Button vertical onPress={() => {this.navigateTo("Contratos")}}>
              {/* <Button onPress={() => {this.props.navigation.dispatch(
                NavigationActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({ routeName: 'Contratos', }),],
                })
              )}}>*/}
            
              <Icon style={styles.footer__icon} name="home" />
              {(Platform.OS === 'ios')? <Text style={styles.footer__text}>Inicio</Text> : <View/> }
            </Button>
            <Button vertical style={styles.footer__btn__resultados} onPress={() => {this.navigateTo("Periodos")}}> 
            
              <Icon style={styles.footer__icon} name="calendar" />
              {(Platform.OS === 'ios')? <Text style={styles.footer__text__resultados}>Periodos</Text> : <View/> }
            </Button>
            <Button vertical
              onPress={() => {
              if (this.props.screenProps.contracts.length === 0) {
                if (Platform.OS === 'ios') {
                    AlertIOS.alert(
                      'Contrato',
                     'Debes de tener al menos un contrato de luz registrado.',
                     [
                       {text: 'OK'},
                     ],
                    )
                  }else {
                    Alert.alert(
                      'Contrato',
                     'Debes de tener al menos un contrato de luz registrado.',
                     [
                       {text: 'OK'},
                     ],
                    )
                  } 
                } 
                else {
                this.navigateTo("Mediciones")
            }
          }
        }
            >
              <Thumbnail source={ (Platform.OS === 'ios')? require('../../../images/logogray.png') : require('../../../images/logoeasy.png') } style={styles.footer__logo} />
            </Button>
            <Button vertical style={styles.footer__btn__resultados} onPress ={() => {this.navigateTo("Resultados")}}>
              <Icon style={styles.footer__icon} active name="trending-up" />
              {(Platform.OS === 'ios')? <Text style={styles.footer__text__resultados}>Resultados</Text> : <View/> }
            </Button>
            <Button vertical onPress ={() => {this.navigateTo("Tips")}} >
              {(Platform.OS === 'ios')?   <Icon style={styles.footer__icon} name="bulb" /> : <Icon style={styles.footer__icon} name="menu" /> }
              {(Platform.OS === 'ios')?   <Text style={styles.footer__text}>Tips</Text> : <View/> }
            </Button>
          </FooterTab>
        </Footer>
    )
  }
}


export default FooterGlobal;
