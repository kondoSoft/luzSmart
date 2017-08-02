const React = require('react-native');
const { StyleSheet, Dimensions, Platform } = React;

export default {
  header:{
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor:'transparent',
    flexDirection: 'row',
    paddingTop: (Platform.OS === 'ios')? 15 : 0,
    height: (Platform.OS === 'ios')? '9%' : '10%',
    resizeMode: 'cover',
  },
  header__body__title:{
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
    paddingLeft: (Platform.OS === 'ios')? 0 : 28,
  },
  header__icon:{
    color: 'white',
    fontSize: 26,
    paddingLeft: 3,
  },
  header__body:{
    flex: 4,
    alignItems: 'center',
  },
  left:{
    height: '45%',
    justifyContent: 'center',
  },
  right:{
    height: '45%',
    justifyContent: 'center',
    paddingRight: (Platform.OS === 'ios')? 0 : 25,
  },
};
