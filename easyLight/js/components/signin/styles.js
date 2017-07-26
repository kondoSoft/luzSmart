const React = require('react-native');
const { StyleSheet, Dimensions, Platform } = React;

const Screen = Dimensions.get('window');

export default {
  row__top: {
     alignItems: 'center',
     borderBottomWidth: 1,
     borderBottomColor: 'lightgray',
     height: '15%',
     paddingTop: (Platform.OS === 'ios')? 40 : (Screen.height > 592)? 15  : 5,
     paddingBottom: (Platform.OS === 'ios')? 40 : (Screen.height > 552)? 10  : 5,
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
    justifyContent: 'center',
    height:'10%',
    paddingTop: (Platform.OS === 'ios')? 0 : (Screen.height > 592)? 15 : 10,
    paddingBottom:5,
  },
  row__botttom__btn: {
    width: 150,
    justifyContent: 'center',
    backgroundColor: '#007aff',
  },
  form__item: {
     alignItems: 'center',
     justifyContent: 'center',
     paddingTop: (Platform.OS === 'ios')? 10 : (Screen.height > 592)? 10  : 5,
     paddingBottom: (Platform.OS === 'ios')? 10 : (Screen.height > 552)? 10  : 5,
  },
  form__item__input: {
    height: 30,
    padding: 0,
    margin: 0,
    paddingBottom: 0,
  },
  text:{
    paddingRight: 5,
  }
}
