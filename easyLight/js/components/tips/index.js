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


class Tips extends Component{
  static navigationOptions = {
    header: null
  };
  componentWillMount(){
    if(this.props.token != ""){
      this.props.getTips(this.props.token)
    }
  }
  render(){
    const { results } = this.props.tips
    var tips = results.map((tip,i)=>{
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
    return(
      <Container>
        <Header navigation={ this.props.navigation } title="Tips" />
        {(Platform.OS == 'android') ? <Footer navigation={this.props.navigation}/>  : null}
        <Grid style={{backgroundColor: '#fff'}}>
          <Swiper
            style={styles.wrapper}
            showsButtons={true}
            buttonWrapperStyle={styles.arrow__buttons}
            >
            {tips}
          </Swiper>
        </Grid>
        {(Platform.OS == 'ios') ? <Footer navigation={this.props.navigation}/>  : null}
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
