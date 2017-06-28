
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

export default {
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FBFAFA',
  },
  header:{
    backgroundColor: 'green',
  },
  header__body:{
  },
  header__body__title:{
    color: 'white',
  },
  form:{
    marginTop: 70,
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
    // display: 'flex',
    flex: 1,
    padding: 0,
    bottom: 0,
  },
  input: {
    marginBottom: 20,
  },
  btnView:{
    padding: 30,
    marginTop: 50,
    display: 'flex',
    alignItems: 'flex-end'
  },
  btn: {
    marginTop: 4,
  },
};
