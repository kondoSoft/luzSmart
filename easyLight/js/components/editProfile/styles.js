const React = require('react-native');
const { StyleSheet, Dimensions, Platform } = React;

const Screen = Dimensions.get('window');

export default {
  row__top: {
     alignItems: 'center',
     borderBottomWidth: 1,
     borderBottomColor: 'lightgray',
     // height: '25%',
     paddingTop: (Platform.OS === 'ios')? 30 : (Screen.height > 592)? 15  : 5,
     paddingBottom: (Platform.OS === 'ios')? 30 : (Screen.height > 552)? 10  : 5,
  },
  row__top__col__left:{
    paddingLeft: 30
  },
  row__top__col__right:{
    paddingRight: 30
  },
  row__top__col__right__icon: {
    color: 'lightgray',
    textAlign: 'right'
  },
  row__botttom: {
    justifyContent: 'space-around',
  },
  row__botttom__btn__Cancel: {
    width: (Platform.OS === 'ios')? 100 : 120,
    justifyContent: 'center',
  },
  row__botttom__btn__Success: {
    width: (Platform.OS === 'ios')? 100 : 120,
    justifyContent: 'center',
    // backgroundColor: '#4ccbe8',
  },
  form__item: {
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: (Platform.OS === 'ios')? 10 : (Screen.height > 592)? 10  : 5,
    paddingBottom: (Platform.OS === 'ios')? 10 : (Screen.height > 552)? 10  : 5,
  },
  form__item__input: {
    height: (Platform.OS === 'ios')? 30 : 40,
    padding: 0,
    margin: 0,
    paddingBottom: 0,
  },
  text:{
    paddingRight: 5,
  }
}
