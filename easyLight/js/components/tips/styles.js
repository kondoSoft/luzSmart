const React = require('react-native');
const { StyleSheet, Dimensions } = React;

export default {
  wrapper: {
    marginTop: 30
 },
 image:{
   width: '100%',
   height: '100%',
 },
 arrow__buttons:{
   backgroundColor: 'transparent',
   flexDirection: 'row',
   position: 'absolute',
   top: 110,
   left: 0,
   flex: 1,
   paddingHorizontal: 10,
   paddingVertical: 10,
   justifyContent: 'space-between',
   alignItems: 'flex-start',
 },
 slide1: {
   flex: 1,
   justifyContent: 'flex-start',
   alignItems: 'center',
 },
 slide2: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
 },
 slide3: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
 },
 text: {
   color: 'black',
   fontSize: 16
 },
 swipper__col__top__image:{
   width: '98%',
   height: '30%',
   marginBottom: 50,
 },
 swipper__view:{
   backgroundColor: 'lightgray',
   height: 100,
   width: '85%',
   padding: 10
 },
}
