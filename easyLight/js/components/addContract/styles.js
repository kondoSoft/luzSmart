const React = require('react-native');
const { StyleSheet, Dimensions, Platform } = React;

export default {
    row__top__left__right:{
      paddingLeft: 0,
      flex: 1,
    },
    row__top__left__right:{
      flex: 1,
    },
    col__form:{
      marginTop: 10,
      alignItems: 'center',

    },
    row__top__col__right__icon:{
      paddingRight: 30
    },
    col__form__item:{
      paddingLeft: 10,
      marginTop: (Platform.OS === 'ios')? 10 : 5,
      marginRight: (Platform.OS === 'ios')? 10 : 5,
      marginBottom: (Platform.OS === 'ios')? 10 : 5,
      marginLeft: (Platform.OS === 'ios')? 10 : 5,
      backgroundColor: 'lightgray',
      width: (Platform.OS === 'ios')? 0 : '85%',
    },
    select:{
      width: 310,
      margin: 10,
      backgroundColor:'#fff',
      borderBottomWidth:1,
      borderTopWidth:1,
      borderLeftWidth:1,
      borderRightWidth:1,
      borderColor: 'lightgrey',
    },
    row__bottom__view__top:{
      marginTop: 0,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: 25
    },
    row__bottom__view__bottom:{
      marginTop: 0,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    CheckBox:{
      marginRight: 15,
    },
    row__bottom:{
      justifyContent: 'center',
      paddingTop: 0,
      paddingBottom: (Platform.OS === 'ios')? 30 : 0,
      flexDirection: 'row',
      width:'100%',
    },
    select__option:{
      height: 30,
      borderBottomWidth: 0
    },
    selectPicker:{
      borderTopWidth:1,
      borderBottomWidth:1,
      borderLeftWidth:1,
      borderRightWidth:1,
      borderColor:'lightgray',
      marginLeft:5,
      marginRight:5,
      marginTop:5,
    },
}
