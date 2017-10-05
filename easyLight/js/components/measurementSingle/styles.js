const React = require('react-native');
const { StyleSheet, Dimensions, Platform } = React;

let Screen = Dimensions.get('window')

export default {
  grid__row__top:{
    alignItems: 'center',
    paddingLeft: 30,
    backgroundColor: 'lightgray'
  },
  grid__row__top__text:{
    flex: 1,
  },
  grid__row__top__view:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingRight: 15,
    alignItems: 'flex-end',
  },
  grid__col__select:{
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
  },
  grid__col__select__row__top:{
    alignItems: 'center',
    flex: 2,
    paddingBottom: 5,
  },
  grid__col__select__row__bottom:{
    alignItems: 'center',
    flex: 2,
    paddingBottom: (Platform.OS === 'ios')? 5 : 0,
    marginTop: (Platform.OS === 'ios')? 5 : 0,
  },
  col__row__top__select:{
    width: 100,
    height: 30,
    paddingLeft: 30,
    backgroundColor: 'transparent',
    borderTopWidth: .5,
    borderBottomWidth: .5,
    borderLeftWidth: .5,
    borderRightWidth: .5,
    padding: 0,
    paddingTop:5,
  },
  col__row__select__option:{
    height: 34,
    borderBottomWidth: 0,
  },
  row__bottom__list:{
    flex: 1,
  },
  row__bottom__list__listItem:{
    backgroundColor: 'lightgrey'
  },
  row__bottom__list__listItem__textTop: {
    flex: 4,
  },
  row__bottom__list__listItem__textBottom:{
    flex: 1,
  },
  animatedView__image:{
    width: (Platform.OS === 'android' && Screen.height <= 640)? '65%' : '70%',
    height: (Platform.OS === 'ios')? '90%' : (Screen.height <= 640)? '65%' : '68%',
  },
  animatedView__image__view:{
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
  animatedView__image__view__input: {
    backgroundColor:'lightgrey',
    height: (Platform.OS === 'ios')? '70%' : 30,
    width: (Platform.OS === 'ios')? '50%' : '50%',
    marginTop: (Platform.OS === 'ios')? 5 : 2,
    marginRight: (Platform.OS === 'ios')? 0 : 5,
    marginLeft: (Platform.OS === 'ios')? 0 : 5,
    paddingBottom: (Platform.OS === 'ios')? 0 : 5,
    textAlign: 'center',
  },
  animatedView__image__view__btn:{
    marginBottom: 40,
    marginLeft: (Platform.OS === 'ios')? 105 : 115,
    backgroundColor: 'green',
    height: 30,
  },
  fab:{
    backgroundColor: 'steelblue',
    bottom: 60,
  },
  icon:{
    fontSize: 28,
    lineHeight: 0,
  },
  selectPicker:{
    borderTopWidth:1,
    borderBottomWidth:1,
    borderLeftWidth:1,
    borderRightWidth:1,
    borderColor:'lightgray',
    marginLeft:5,
    marginRight:5,
    height: '100%',
    width: '50%',
  },
}
