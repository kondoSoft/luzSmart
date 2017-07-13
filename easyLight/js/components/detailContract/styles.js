const React = require('react-native');
const { StyleSheet, Dimensions } = React;

export default {
  header:{
    backgroundColor: 'green',
  },
  header__left__title:{
    color: 'white',
  },
  detailContract__row__top:{
    backgroundColor: 'gray',
    height: 30,
    padding: 5,
    justifyContent: 'center',
  },
  detailContract__row__top__:{
    color: '#fff',
  },
  list:{

  },
  listItem:{
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 0,
    borderBottomWidth: 1,
    paddingLeft: 15,
    paddingRight: 15
  },
  listItem__body:{
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 0,
    alignItems: 'center'
  },
  listItem__body__text:{
    flex: 1.3,
    padding: 5,
  },
  listItem__body__view:{
    flexDirection: 'column',
    padding: 5,
    flex: 1,
    alignItems: 'center'
  },
  listItem__body__view__text:{
    flex: 1,
    textAlign: 'right',
  },
  icon:{
    color: 'blue',
    textAlign: 'center',
    flex: 1,
    alignItems: 'center',
    padding: 6
  }
};
