const React = require("react-native")
const { StyleSheet, Platform } = React;

export default {
  header:{
    paddingTop: (Platform.OS === 'ios')? 15 : 0,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor:'transparent',
    flexDirection: 'row',
    // flex: 1,
    height: (Platform.OS === 'ios')? '30%' : '10%',
    resizeMode: 'cover',
  },
  viewProfile:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 40
  },
  viewThumbnail:{
    flex: 1,
  },
  viewName:{
    flex: (Platform.OS === 'ios')? 8 : 2,
    alignItems: 'center',
    paddingRight: (Platform.OS === 'ios')? 0 : 50,
  },
  avatar:{
    height: 100,
    width: 100,
    borderRadius: 50,

  },
  textName:{
    color: 'white',
  },

  list:{
    flex: 1,
    // alignItems: 'center',
    paddingTop: 30,
    paddingLeft: 60,
  },
  listItem:{
    borderBottomWidth: 0,

  },
}
