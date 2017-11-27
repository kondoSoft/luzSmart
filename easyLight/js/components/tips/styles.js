const React = require('react-native');
const { StyleSheet, Dimensions, Platform } = React;

export default {
  wrapper: {
    marginTop: 30
 },
 image:{
   width: '100%',
   height: (Platform.OS === 'ios')? '100%' : '130%',
 },
 arrow__buttons:{
   backgroundColor: 'transparent',
   flexDirection: 'row',
   position: 'absolute',
   top: (Platform.OS === 'ios')? 140: 130,
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
   marginTop: (Platform.OS === 'ios')? 0 : 50,
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
   fontSize: 16,
   padding: 15,
   textAlign: 'justify'
 },
 swipper__col__top__image:{
   width: '95%',
   height: '55%',
   marginTop: 5,
   marginBottom:(Platform.OS === 'ios')? 10 : 80,
 },
 swipper__view:{
   // backgroundColor: 'lightgray',
   // height: 200,
   width: '95%',
   padding: 10,
   alignItems: 'center',
 },
}
