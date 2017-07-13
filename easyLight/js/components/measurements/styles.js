const React = require('react-native');
const { StyleSheet, Dimensions } = React;

export default {
  grid__row__top:{
    alignItems: 'center',
    paddingLeft: 30,
    backgroundColor: 'lightgray'
  },
  grid__row__top__text:{
    flex: 2
  },
  grid__row__top__view:{
    flex: 1
  },
  grid__col__select:{
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 5,
    paddingTop: 10,
    paddingBottom: 10,
  },
  grid__col__select__row__top:{
    alignItems: 'center',
    flex: 1,
    paddingBottom: 5,
    marginBottom: 5,
  },
  grid__col__select__row__bottom:{
    alignItems: 'center',
    flex: 1,
    paddingBottom: 5,
    marginTop: 5,
    alignItems: 'flex-end'
  },
  col__row__top__select:{
    width: 150,
    height: 34,
    backgroundColor: 'transparent',
    borderTopWidth: .5,
    borderBottomWidth: .5,
    borderLeftWidth: .5,
    borderRightWidth: .5,
    padding: 0
  },
  col__row__select__option:{
    height: 30,
    borderBottomWidth: 0
  },
  row__bottom__list:{
    flex: 1
  },
  row__bottom__list__listItem:{
    backgroundColor: 'lightgrey'
  },
  row__bottom__list__listItem__textTop: {
    flex: 4
  },
  row__bottom__list__listItem__textBottom:{
    flex: 1
  },
}
