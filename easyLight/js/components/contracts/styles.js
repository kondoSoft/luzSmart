const React = require('react-native');
const { StyleSheet, Dimensions, Platform } = React;

export default {
  header:{
    backgroundColor: 'transparent',
  },
  header__left__title:{
    color: 'white',
    fontSize: (Platform.OS === 'ios')? 20 : 22,
    paddingLeft: 15,
  },
  fab:{
    backgroundColor: 'steelblue',
    elevation: 10,
    width: 65,
    height: 65,
    borderRadius: 50,
    position: 'absolute',
    bottom: (Platform.OS === 'ios')? 40 : 0,
  },
  listItem:{
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 0,
    borderBottomWidth: 1,
    paddingLeft: 15,
  },
  listItem__body:{
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 0
  },
  listItem__body__text:{
    justifyContent: 'center',
  },
  listItem__body__view:{
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    flex: 2,
  },
  listItem__body__view__text:{

  },
  icon:{
    color: '#007aff',
    fontSize: 40,
    textAlign: 'center',
    paddingTop: 5,
  },
  rowBack: {
		alignItems: 'center',
		backgroundColor: '#FFF',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
	},
  rowFront: {
		alignItems: 'center',
		backgroundColor: '#FFF',
		justifyContent: 'center',
		height: 50,
	},
  ItemComponent:{
    view:{
      flexDirection: 'row',
      height: 80,
      borderBottomWidth: 0.5,
      borderColor: 'lightgrey',
    },
    align:{
      alignItems: 'center',
    },
  },
};
