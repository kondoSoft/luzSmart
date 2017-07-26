const React = require('react-native');
const { StyleSheet, Dimensions } = React;

export default {
  row__top: {
     alignItems: 'center',
     borderBottomWidth: 1,
      borderBottomColor: 'lightgray'
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
  },
  row__botttom__btn: {
    width: 150,
    justifyContent: 'center',
  }
}
