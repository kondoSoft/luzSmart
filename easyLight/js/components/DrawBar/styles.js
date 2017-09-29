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
    flex: 3.4,
  },
  viewName:{
    flex: (Platform.OS === 'ios')? 26 : 5,
    alignItems: 'center',
    paddingRight: (Platform.OS === 'ios')? 0 : 70,
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
  },
  listItem:{
    borderBottomWidth: 0,
    marginBottom: 10,
  },
  left:{
    flex: 1,
    justifyContent: 'center'
  },
  body:{
    flex:4
  },
  icon:{
    fontSize: 30,
    flex:1,
    textAlign: 'center',
  },
  textList:{
    fontSize: 18,
  },
}
