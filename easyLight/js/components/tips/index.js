import React, { Component } from 'react';
import { connect } from "react-redux";
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
import { getTips } from '../../actions/list_states_mx'

var tipsArr;

class Tips extends Component{
  static navigationOptions = {
    header: null
  };
  constructor(props){
    super(props);
    this.state = {
      tips: [],
    }
  }
  componentWillMount(){
    if(this.props.token != ""){
      this.props.getTips(this.props.token)
    }
  }
  componentDidMount(){
    if(this.props.token != ""){
      this.props.getTips(this.props.token)
    }
  }
  componentWillReceiveProps(nextProps){
    if (this.state.tips.length === nextProps.tips.results.length) {

    }else {
      this.setState({
        tips: nextProps.tips.results
      })
    }
  }
  render(){
    const { results } = this.props.tips;
    const { tips } = this.state;
    if(tips != undefined){
      if (tips.length != 0) {
        tipsArr = tips.map((tip,i)=>{
          return (<Col key={i} style={styles.slide1,{ marginTop: (Platform.OS === 'ios')? 0 : 50, alignItems: 'center'}}>
            <View style={styles.swipper__col__top__image}>
              <Image
                source={{ uri: tip.image }}
                style={styles.image}
              />
            </View>
            <View style={styles.swipper__view}>
              <Text style={styles.text}>{tip.description}</Text>
            </View>
          </Col>)
        })
      }else {
        tipsArr =(<Col style={styles.slide1,{ marginTop: (Platform.OS === 'ios')? 0 : 50, alignItems: 'center'}}>
                    <View style={styles.swipper__col__top__image}>
                      <Image
                        source={require('../../../images/foco.png')}
                        style={styles.image}
                       />
                    </View>
                    <View style={styles.swipper__view}>
                      <Text style={styles.text}>Estamos añadiendo tips para que puedas reducir tu consumo mensual o bimestral.</Text>
                    </View>
                  </Col>)
      }
    }else {
      tipsArr =(<Col style={styles.slide1,{ marginTop: (Platform.OS === 'ios')? 0 : 50, alignItems: 'center'}}>
                  <View style={styles.swipper__col__top__image}>
                    <Image
                      source={require('../../../images/foco.png')}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.swipper__view}>
                    <Text style={styles.text}>Estamos añadiendo tips para que puedas reducir tu consumo mensual o bimestral.</Text>
                  </View>
                </Col>)
    }
    return(
      <Container>
        <Header navigation={ this.props.navigation } title="Tips" />
        {(Platform.OS == 'android') ? <Footer navigation={this.props.navigation} viewContract={this.props.screenProps.contracts} />  : null}
        <Grid style={{backgroundColor: '#fff'}}>
          <Swiper
            style={styles.wrapper}
            showsButtons={true}
            buttonWrapperStyle={styles.arrow__buttons}
            >
            {tipsArr}
          </Swiper>
        </Grid>
        {(Platform.OS == 'ios') ? <Footer navigation={this.props.navigation} viewContract={this.props.screenProps.contracts} />  : null}
      </Container>
    )
  }
}

function bindAction(dispatch){
  return {
    getTips: token => dispatch(getTips(token)),
  }
}

const mapStateToProps = state => ({
  tips: state.list_contracts.tips,
  token: state.user.token
})



export default connect(mapStateToProps,bindAction)(Tips);
