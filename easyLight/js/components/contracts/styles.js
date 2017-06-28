const React = require('react-native');
const { StyleSheet, Dimensions } = React;

export default {
  header:{
    backgroundColor: 'green',
  },
  header__left__title:{
    color: 'white',
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
  },
  listItem__body:{
    display: 'flex',
    flexDirection: 'row',
    // flexWrap: 'nowrap',
    borderBottomWidth: 0
  },
  listItem__body__text:{
    flex: 1,
    padding: 5,
    backgroundColor: 'yellow',
  },
  listItem__body__view:{
    flexDirection: 'row',

    padding: 5,
    flex: 2,
  },
  listItem__body__view__text:{
    flex: 1,
    textAlign: 'center',
  },
  icon:{
    color: 'blue',
    backgroundColor: 'red',
    textAlign: 'center',
    flex: 1,
  }

};
