const React = require('react-native');
const { StyleSheet, Dimensions, Platform } = React;

export default {
  grid__row__top:{
    alignItems: 'center',
    paddingLeft: 30,
    backgroundColor: 'lightgray'
  },
  grid__row__top__text:{
    flex: 2
  },
  grid__row__top__view:{
    flex: 1
  },
  grid__col__select:{
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 5,
    paddingTop: 10,
    paddingBottom: 10,
  },
  grid__col__select__row__top:{
    alignItems: 'center',
    flex: 1,
    paddingBottom: 5,
    marginTop: 5,

  },
  grid__col__select__row__bottom:{
    alignItems: 'center',
    flex: 1,
    paddingBottom: 5,
    marginTop: 5,
  },
  col__row__top__select:{
    width: 150,
    height: 30,
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
    flex: 1
  },
  row__bottom__list__listItem:{
    backgroundColor: 'lightgrey'
  },
  row__bottom__list__listItem__textTop: {
    flex: 4
  },
  row__bottom__list__listItem__textBottom:{
    flex: 1
  },
  animatedView__image:{
    width: '65%',
    height: (Platform.OS === 'ios')? '85%' : '95%', 
  },
  animatedView__image__view:{
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
  animatedView__image__view__input:{
    height: (Platform.OS === 'ios')? 25 : 10,
    backgroundColor: 'lightgrey',
    marginTop: 57,
    flex: 0,
    width: '50%',
    marginLeft: 65,
    borderWidth:2,
    borderColor: 'grey',
  },
  animatedView__image__view__btn:{
    marginLeft: 96,
    marginTop: 12 ,
    marginBottom: 33,
    backgroundColor: 'green',
  },
  fab:{
    backgroundColor: 'steelblue',
    bottom: 60,
  },
  icon:{
    fontSize: 28,
    lineHeight: 0,
  },
}
