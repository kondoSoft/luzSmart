const React = require('react-native');
const { StyleSheet, Dimensions, Platform } = React;
var {height, width} = Dimensions.get('window')

export default {
  header:{
    backgroundColor: 'green',
  },
  header__left__title:{
    color: 'white',
  },
  detailContract__row__top:{
    backgroundColor: 'gray',
    height: 30,
    padding: 5,
    justifyContent: 'center',
  },
  detailContract__row__top__text:{
    color: '#fff',
  },
  list:{
    height: (width === 320)? 50 : 70
  },
  listItem:{
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 0,
    borderBottomWidth: 1,
    paddingLeft: 15,
    paddingRight: 15
  },
  listItem__body:{
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 0,
    alignItems: 'center'
  },
  listItem__body__text:{
    flex: 1.3,
    padding: 5,
    marginTop: (width === 320)? 0 : 20,
  },
  listItem__body__view:{
    flexDirection: 'column',
    padding: 5,
    flex: (width === 320) ? 4 : 1,
    alignItems: 'center'
  },
  listItem__body__view__text:{
    flex:  1,
    textAlign: (width === 320) ? 'center' : 'right',

  },
  ItemComponent:{
    view:{
      flexDirection: 'row',
      height: 70,
    },
    align:{
      flexDirection: (width === 320) && 'row',
      justifyContent: (width === 320) && 'space-around',
      alignItems: 'center',
      // flex: (width === 320) && 3,
    },
  },
  fab:{
    backgroundColor: 'steelblue',
    elevation: 10,
    width: (width === 320)? 50 : 65,
    height: (width === 320)? 50 : 65,
    borderRadius: 50,
    paddingBottom: (Platform.OS === 'ios')? ((width === 320)? 50 :80) : 0,
  },
};
