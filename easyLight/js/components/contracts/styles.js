const React = require('react-native')
const { StyleSheet, Dimensions, Platform } = React

export default {
  header: {
    backgroundColor: 'transparent'
  },
  header__left__title: {
    color: 'white',
    fontSize: (Platform.OS === 'ios') ? 20 : 22,
    paddingLeft: 15
  },
  fab: {
    backgroundColor: 'steelblue',
    elevation: 10,
    width: 65,
    height: 65,
    borderRadius: 50,
    position: 'absolute',
    bottom: (Platform.OS === 'ios') ? 40 : 0
  },
  listItem__body__text: {
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  listItem__body__view: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    flex: 2
  },
  listItem__body__view__text: {

  },
  icon: {
    color: '#007aff',
    fontSize: 40,
    textAlign: 'center',
    paddingTop: 0
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    height: 50
  },
  ItemComponent: {
    view: {
      flexDirection: 'row',
      height: 70,
      borderBottomWidth: 0.5,
      borderLeftWidth: 0.5,
      borderColor: 'transparent'
    },
    align: {
      alignItems: 'center'
    }
  }
}
