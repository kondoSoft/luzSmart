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
      marginTop: 20,
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
      backgroundColor: 'lightgray'
    },
    select:{
      width: 310,
      margin: 10,
      backgroundColor: '#fff',
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
      alignItems: 'center'
    },
    CheckBox:{
      marginRight: 15,
    },
    row__bottom:{
      justifyContent: 'center',
      paddingTop: 10
    },
    select__option:{
      height: 30,
      borderBottomWidth: 0
    },
}
