const React = require('react-native');
const { StyleSheet, Dimensions, Platform } = React;


export default {
  grid:{
    flexDirection: 'column',
    paddingTop: (Platform.OS === 'ios')? 15 : 5,
  },
  form:{
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 25,
  },
  link:{
    width: '40%',
    borderBottomWidth: 2,
    borderBottomColor: 'lightgray',
    alignItems: 'center'
  },
  form__item__title:{
    borderBottomColor: 'green',
    borderBottomWidth: 3,
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  form__item__inputs:{
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    marginBottom: 10,
    marginTop: 10,
    paddingTop: 5,
  },
  form__item__datepicker:{
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    marginBottom: 10,
    marginTop: 10,
  },
  form__item__label:{
    marginBottom: 3
  },
  col__bottom:{
    alignItems: 'center',
    marginTop: 5,
  },
  col__bottom__row__bottom:{
    paddingTop: 20,
  },
  touchable__text:{
    color: 'green',
  },
}
