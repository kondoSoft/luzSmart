const React = require("react-native")
const { StyleSheet, Platform } = React;

export default {
  header:{
    paddingTop: (Platform.OS === 'ios')? 15 : 0,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor:'transparent',
    flexDirection: 'row',
    height: (Platform.OS === 'ios')? '60%' : '10%',
    resizeMode: 'cover',
  },
}
