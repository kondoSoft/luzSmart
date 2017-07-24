const React = require('react-native');
const { StyleSheet, Dimensions, Platform } = React;

export default {
  header:{
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: 'green',
  },
  header__body__title:{
    color: 'white',
    fontSize: 22,
  },
  header__icon:{
    color: 'white',
    fontSize: 26,
    paddingLeft: 3,
  },
  header__body:{
    flex: 4,
  },
  left:{
    flex: (Platform.OS === 'ios')? 0 : 4,
  },
  right:{
    flex: (Platform.OS === 'ios')? 0 : 4,
    justifyContent: (Platform.OS === 'ios')? '' : 'flex-end',
    paddingRight: (Platform.OS === 'ios')? 0 : 25,
  },
};
