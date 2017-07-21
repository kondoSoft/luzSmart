import React, { Component } from 'react';
import {
  Container,
  Text,
  View,
} from 'native-base';
import { Platform, Image } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Swiper from 'react-native-swiper';
import Header from '../header/index';
import Footer from '../footer/index';
import styles from './styles';


class Tips extends Component{
  static navigationOptions = {
    header: null
  };
  render(){
    return(
      <Container>
        <Header navigation={ this.props.navigation } title="TIPS" />
        {(Platform.OS == 'android') ? <Footer navigation={this.props.navigation}/>  : null}
        <Grid>
          <Swiper
            style={styles.wrapper}
            showsButtons={true}
            buttonWrapperStyle={styles.arrow__buttons}
            >
            <Col style={styles.slide1,{ marginTop: 50, alignItems: 'center'}}>
              <View style={styles.swipper__col__top__image}>
                <Image
                  source={ require('../../../images/foco.png')}
                  style={styles.image}
                />
              </View>
              <View style={styles.swipper__view}>
                <Text style={styles.text}>Usa focos de bajo consumo: Ahorran hasta un 75% de energía.</Text>
              </View>
            </Col>
            <Col style={styles.slide1}>
              <View style={styles.swipper__col__top__image}>
                <Image
                  source={ require('../../../images/foco.png')}
                  style={styles.image}
                />
              </View>
              <View style={styles.swipper__view}>
                <Text style={styles.text}>Usa focos de bajo consumo: Ahorran hasta un 75% de energía.</Text>
              </View>
            </Col>
            <Col style={styles.slide1}>
              <View style={styles.swipper__col__top__image}>
                <Image
                  source={ require('../../../images/foco.png')}
                  style={styles.image}
                />
              </View>
              <View style={styles.swipper__view}>
                <Text style={styles.text}>Usa focos de bajo consumo: Ahorran hasta un 75% de energía.</Text>
              </View>
            </Col>
          </Swiper>
        </Grid>
        {(Platform.OS == 'ios') ? <Footer navigation={this.props.navigation}/>  : null}
      </Container>
    )
  }
}


export default Tips;
