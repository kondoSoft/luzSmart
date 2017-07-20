const React = require('react-native');
const { Platform, StyleSheet, Dimensions } = React;

export default {
  footer:{
    backgroundColor: (Platform.OS === 'ios')? null : 'green',
  },
  footer__icon:{
    fontSize: 23
  },
  footer__text:{
    fontSize: 7
  },
  footer__logo:{

  },
  footer__text__resultados:{
    fontSize: 7,
  }
}
