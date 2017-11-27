const React = require('react-native');
const { StyleSheet, Dimensions, Platform } = React;

export default {
  grid:{
    backgroundColor: 'white'
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
    alignItems: 'center',
  },
  col__view__bottom:{
    flex: 1,
    justifyContent:'center',
  },
  col__bottom__item:{
    backgroundColor: 'lightgrey',
    width: (Platform.OS === 'ios')? '100%' : '90%',
    height: '65%',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
  },
  select__option:{
    height: 31,
    borderBottomWidth: 0
  },
  select:{
    backgroundColor: 'lightgrey',
  }
}
