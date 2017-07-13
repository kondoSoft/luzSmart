const React = require('react-native');
const { StyleSheet, Dimensions } = React;


export default {
  grid:{
    flexDirection: 'column'
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
    marginBottom: 20
  },
  form__item__inputs:{
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    marginBottom: 10
  },
  form__item__label:{
    marginBottom: 3
  },
  col__bottom:{
    alignItems: 'center'
  },
  col__bottom__row__bottom:{
    paddingTop: 20,
  },
  touchable__text:{
    color: 'green',
  },
}
