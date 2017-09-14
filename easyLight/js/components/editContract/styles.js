const React = require('react-native');
const { StyleSheet, Dimensions, Platform } = React;

export default {
    row__top__left__right:{
      paddingLeft: 0,
      flex: 1,
      backgroundColor: 'red',
    },
    row__top__left__right:{
      flex: 1,
      backgroundColor: 'yellow',
    },
    col__form:{
      alignItems: 'center',
      justifyContent:'center',
      width:'100%',
    },
    row__top__col__right__icon:{
      paddingRight: 30,
    },
    col__form__item:{
      marginRight: (Platform.OS === 'ios')? 10 : 5,
      marginLeft: (Platform.OS === 'ios')? 10 : 5,
      backgroundColor: '#e2e2e2',
      width: '85%',
      marginTop:20,
    },
    select:{
      width: '94%',
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
      paddingRight: 25,
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
