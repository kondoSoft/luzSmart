const React = require('react-native');
const { Platform, StyleSheet, Dimensions } = React;

export default {
  footer:{
    backgroundColor: (Platform.OS === 'ios')? null : '#069b1c',
  },
  footer__icon:{
    fontSize: (Platform.OS === 'ios')? 23 : 32,
    color: (Platform.OS === 'ios')? 'grey' : '#fff',
  },
  footer__text:{
    fontSize: 8
  },
  footer__logo:{

  },
  footer__text__resultados:{
    fontSize: 7,
  }
}
