const React = require('react-native');
const { StyleSheet, Dimensions } = React;

export default {
  header:{
    backgroundColor: 'green',
  },
  header__left__title:{
    color: 'white',
  },
  list:{

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
    flex: 1,
    alignItems: 'center',
    marginTop: 9,
    textAlign: 'center',
    color: 'blue'
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
      flexDirection: 'row'
    },
    align:{
      alignItems: 'center',
    },
  },
};
