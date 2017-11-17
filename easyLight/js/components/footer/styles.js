const React = require('react-native');
const { Platform, StyleSheet, Dimensions } = React;
var {height, width} = Dimensions.get('window')

export default {
  footer:{
    backgroundColor: (Platform.OS === 'ios')? null : '#069b1c',
    height: 40,
  },
  footer__icon:{
    fontSize: 24,
    color: (Platform.OS === 'ios')? 'grey' : '#fff',
  },
  footer__text:{
    fontSize: 7
  },
  footer__logo:{
  },
  footer__text__resultados:{
    fontSize: 7,
    width: '130%',
    textAlign: 'center'
  },
  footer__btn__resultados:{
  }
}
