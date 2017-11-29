const React = require('react-native');
const { StyleSheet, Dimensions } = React;

export default {
  listItem__gray:{
    backgroundColor: 'lightgrey',
    flex: 1,
    // paddingTop: 25,
    // paddingBottom: 25
  },
  listItem__left:{
    flex: 2,
  },
  listItem__body:{
    flex: 1.5,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  listItem__right:{
    flex: 1,
    alignItems: 'center'

  },
  text:{
    fontSize: 13,
  }
  // listItem__white:{
  //   paddingTop: 25,
  //   paddingBottom: 25
  // },
}
