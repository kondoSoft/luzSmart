import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon, Text, Thumbnail } from 'native-base';
import {
  Platform,
  View,
  AlertIOS,
  Alert,
} from 'react-native';
import styles from "./styles";


class FooterGlobal extends Component {
  render(){
    var currentContract = null
    var contractPayDayLimit = false
    if(this.props.navigation.state.routeName == 'DetailContract'){
      currentContract = this.props.detailContract
      if (currentContract.length === 0) {
        contractPayDayLimit = true
      }
    }else if(this.props.navigation.state.routeName == 'Contracts'){
      currentContract = this.props.viewContract
      currentContract.map((receipts,i)=>{
        if (receipts.receipt.length === 0) {
          contractPayDayLimit = true
        }
      })
    }
    return (
      <Footer style={{ height: 50, paddingTop: 8,backgroundColor: (Platform.OS === 'ios')? 'transparent' : '#069b1c'}}>
          <FooterTab style={styles.footer}>
            <Button vertical onPress={() => (this.props.navigation.state.routeName == "Contratos") ? null : this.props.navigation.navigate("Contratos")}>
              <Icon style={styles.footer__icon} name="home" />
              {(Platform.OS === 'ios')? <Text style={styles.footer__text}>Inicio</Text> : <View/> }
            </Button>
            <Button vertical style={styles.footer__btn__resultados}>
              <Icon style={styles.footer__icon} name="calendar" />
              {(Platform.OS === 'ios')? <Text style={styles.footer__text__resultados}>Periodos</Text> : <View/> }
            </Button>
            <Button vertical onPress={() => {
              if (currentContract.length === 0 || contractPayDayLimit) {
                if (contractPayDayLimit) {
                  if (Platform.OS === 'ios') {
                    AlertIOS.alert(
                      'Recibo',
                     'El contrato debe contar con un recibo.',
                     [
                       {text: 'OK'},
                     ],
                    )
                  }else {
                    Alert.alert(
                      'Recibo',
                     'El contrato debe contar con un recibo.',
                     [
                       {text: 'OK'},
                     ],
                    )
                  }
                }else {
                  if (Platform.OS === 'ios') {
                    AlertIOS.alert(
                      'Contrato',
                     'Debes de tener al menos un contrato CFE registrado.',
                     [
                       {text: 'OK'},
                     ],
                    )
                  }else {
                    Alert.alert(
                      'Contrato',
                     'Debes de tener al menos un contrato CFE registrado.',
                     [
                       {text: 'OK'},
                     ],
                    )
                  }

                }
              }else {
                this.props.navigation.navigate("Measurements", { currentContract: currentContract})
              }
            }}>
              <Thumbnail source={ (Platform.OS === 'ios')? require('../../../images/logogray.png') : require('../../../images/logoeasy.png') } style={styles.footer__logo} />
            </Button>
            <Button vertical style={styles.footer__btn__resultados} onPress={()=>this.props.navigation.navigate('EditProfile')}>
              <Icon style={styles.footer__icon} active name="trending-up" />
              {(Platform.OS === 'ios')? <Text style={styles.footer__text__resultados}>Resultados</Text> : <View/> }
            </Button>
            <Button vertical onPress={()=> this.props.navigation.navigate('Tips')} >

              {(Platform.OS === 'ios')?   <Icon style={styles.footer__icon} name="bulb" /> : <Icon style={styles.footer__icon} name="menu" /> }
              {(Platform.OS === 'ios')?   <Text style={styles.footer__text}>Tips</Text> : <View/> }
            </Button>
          </FooterTab>
        </Footer>
    )
  }
}


export default FooterGlobal
