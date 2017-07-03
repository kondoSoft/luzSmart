const React = require('react-native');
const { StyleSheet, Dimensions } = React;

export default {
  grid:{
    marginTop: 20
  },
  row__top:{
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  row__top__text:{
    textAlign: 'center',
    fontSize: 14
  },
  col__select:{
    paddingLeft: 15,
    paddingRight: 15
  },
  row__bottom:{
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center'
  },
  col__view__bottom:{
    flex: 1,
    justifyContent: 'center'
  },
  col__bottom__item:{
    backgroundColor: 'lightgrey',
    height: '65%'
  }
}
