
const React = require('react-native');

const { StyleSheet, Dimensions, Platform } = React;

const Screen = Dimensions.get('window');

export default {
  container: {
    flex:1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'red',
  },
  grid:{
    flex:1,
    height: Screen.height,
    paddingTop: (Platform.OS === 'ios')? 100 : 120,
    backgroundColor: '#fff'
  },
  header:{
    backgroundColor: 'green',
  },
  header__body:{
    alignItems: 'center',
  },
  header__body__title:{
    color: 'white',
  },
  form:{
    marginTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },
  form__item:{
    marginTop: 0,
    height: 50,
  },
  form__item__input:{
    height: 50,
    top: 0,
  },
  shadow: {
    flex: 1,
    width: null,
    height: null,
  },
  bg: {
    flex: 1,
    padding: 0,
    bottom: 0,
  },
  input: {
    marginBottom: 20,
  },
  btnView:{
    padding: 30,
    marginTop: 20,
    display: 'flex',
    alignItems: 'center'
  },
  btn: {
    marginTop: 4,
    backgroundColor: '#007aff',
  },
  link:{
    borderBottomWidth: 2,
    borderBottomColor: 'lightgray',
    alignItems: 'center',
  },
  footer: {
    height: 100,
    borderTopWidth: 0,
    alignItems:'center',
  },
  col__inputs__login: {
    justifyContent: 'flex-end',
    paddingLeft: 15,
  },
  field__email: {
    backgroundColor: '#fff',
  },
};
