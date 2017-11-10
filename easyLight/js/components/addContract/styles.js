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
      backgroundColor: 'lightgray',
      width: '85%',
      marginBottom: 5,

    },
    select:{
      width: '94%',
      margin: 10,
      marginTop: 5,
      marginBottom: 5,
      backgroundColor:'#fff',
      borderBottomWidth:1,
      borderTopWidth:1,
      borderLeftWidth:1,
      borderRightWidth:1,
      borderColor: 'lightgrey',
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
