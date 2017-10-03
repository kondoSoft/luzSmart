import React, { Component } from "react";
import { Platform } from 'react-native';
import HomeDrawerRouter from "./HomeDrawerRouter";
import { StackNavigator, TabNavigator, DrawerNavigator, TabBarBottom, NavigationActions } from "react-navigation";
import { Header, Left, Button, Icon, Body, Title, Right } from "native-base";
import Login from "../components/login/";
import Tips from '../components/tips'
import Results from '../components/results';
import Measurements from '../components/measurements'
import MeasurementsCopy from '../components/measurementSingle'
import DetailContract from '../components/detailContract'
import Receipt from '../components/receipt';
import Contracts from '../components/contracts'
import AddContracts from '../components/addContract';
import SignIn from "../components/signin"
import EditProfile from '../components/editProfile';
import History from '../components/history';
import Faq from '../components/faq';
import Contact from '../components/contact';
import EditContracts from '../components/editContract';
import Configuration from '../components/configuration';
import DetailUltimateContract from '../components/detailUltimateContract';
import { Image, StyleSheet } from 'react-native';
// import ImageHeader from '../components/header/';
import DrawBar from "../components/DrawBar";
import FooterGlobal from "../components/footer";

// HomeDrawerRouter.navigationOptions = ({ navigation }) => ({
//   // header: null
// });


const stackNavigation = StackNavigator({
	Contratos: {
		screen: Contracts,
    navigationOptions: ({ navigation }) => ({
      // header: (props) => <ImageHeader {...props} />,
      title: 'EASYLIGHT',
      headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active name="menu"/></Button>,
      headerLeft: null,
    }),
	},
  DetailContract: {
    screen: DetailContract,
    navigationOptions: ({ navigation }) => ({
      title: 'Detalles de Contrato',
      // header: (props) => <ImageHeader {...props} />,
      headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active name="menu"/></Button>,
    }),
  },
	Receipt: {
		screen: Receipt,
		navigationOptions: ({ navigation }) => ({
			title: 'Recibo',
      headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active name="menu"/></Button>,

		}),
	},
  AddContracts: {
    screen: AddContracts,
    navigationOptions: ({ navigation }) => ({
			title: 'Agregar Contrato',
      headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active name="menu"/></Button>,
		}),
  },
  EditContracts: {
    screen: EditContracts,
    navigationOptions: ({ navigation }) => ({
      title: 'Editar Contrato',
      headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active name="menu"/></Button>,
    }),
  },
  EditProfile: {
    screen: EditProfile,
    navigationOptions: ({ navigation }) => ({
      title: 'Editar Perfil',
      headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active name="menu"/></Button>,
    }),
  },
  Medicion: {
    screen: MeasurementsCopy,
    navigationOptions: ({ navigation }) => ({
      // header: (props) => <ImageHeader {...props} />,
      title: 'Medicion',
      headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active name="menu"/></Button>,
    }),
  },
},
// {
//   navigationOptions: ({ navigation }) => ({
    // header: (props) => <ImageHeader {...props} />,
//     headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active name="menu"/></Button>,
//   })
// }
)

const stackDraw = StackNavigator(
	{
		Contactanos: {
	    screen: Contact,
	    navigationOptions: ({ navigation }) => ({
	      title: 'Contactanos',
				headerLeft: null,
	      headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active name="menu"/></Button>,
	    }),
	   },
	  FAQ: {
	    screen: Faq,
	    navigationOptions: ({ navigation }) => ({
	      title: 'FAQ',
				headerLeft: null,
	      headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active name="menu"/></Button>,
	    }),
	  },
	  Historial: {
	    screen: History,
	    navigationOptions: ({ navigation }) => ({
	      title: 'Historial',
				headerLeft: null,
	      headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active name="menu"/></Button>,
	    }),
	  },
	  Premium: {
	    screen: Configuration,
	    navigationOptions: ({ navigation }) => ({
	      title: 'Premium',
				headerLeft: null,
	      headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active name="menu"/></Button>,
	    }),
	  },
	},
  {
    navigationOptions: ({ navigation }) => ({
      // header: (props) => <ImageHeader {...props} />,
    })
  }
)
const tabTips = StackNavigator(
  {
    Tips: {
      screen: Tips,
      navigationOptions: ({ navigation }) => ({
          headerLeft: null,
          tabBarIcon: ({tintColor}) => <Icon name="ios-bulb-outline" />,
          title: 'Tips',
          headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active name="menu"/></Button>,
      }),
    }
  })

const tabMediciones = StackNavigator(
  {
    Mediciones: {
      screen: Measurements,
      navigationOptions: ({ navigation }) => ({
        title: 'Mediciones',
        headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active name="menu"/></Button>,
      }),
    },
  })

const tabResults = StackNavigator(
  {
    Resultados: {
      screen: Results,
      navigationOptions: ({ navigation }) => ({
        title: 'Resultados',
        headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active name="menu"/></Button>,
      }),
    },
  })

const tabPeriods = StackNavigator(
  {
    Periodos: {
    screen: DetailUltimateContract,
    navigationOptions: ({ navigation }) => ({
      title: 'Detalles de Contrato',
      headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active name="menu"/></Button>,
    }),
  },
  Medicion: {
    screen: MeasurementsCopy,
    navigationOptions: ({ navigation }) => ({
      title: 'Medicion',
      headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active name="menu"/></Button>,
    }),
  },
})

const tabNavigation = TabNavigator(
  {
		StackDraw: {
			screen: stackDraw,
		},
  	Contratos: {
      screen: stackNavigation,
      navigationOptions: {
          headerLeft: null,
          tabBarLabel: 'Contratos',
          tabBarIcon: ({tintColor}) => <Icon name="ios-home-outline" />,
        },
     },
    Periodos: {
      screen: tabPeriods,
      navigationOptions: {
        headerLeft: null,
        tabBarIcon:({tintColor}) => <Icon name="ios-calendar-outline" />,
      }
    },
    Mediciones: {
      screen: tabMediciones,
      navigationOptions: {
        headerLeft: null,
        tabBarIcon:({tintColor}) => <Icon name="ios-flash-outline" />,
      }

     },

    Resultados: { screen: tabResults,
      navigationOptions: {
          headerLeft: null,
          tabBarLabel: 'Resultados',
          tabBarIcon: ({tintColor}) => <Icon name="ios-stats-outline" />,
        },
     },
    Tips: { screen: tabTips,},

    },

    {
      initialRouteName: 'Contratos',
      // navigationOptions: ({ navigation }) => ({
        // header: (props) => <ImageHeader {...props} />,

      // }),
			tabBarComponent:  props => {
        const {navigation, navigationState} = props
        const jumpToIndex = index => {
          const lastPosition = navigationState.index
          const tab = navigationState.routes[index]
          const tabRoute = tab.routeName
          const firstTab = tab.routes[0].routeName
          console.log(navigation)
          lastPosition !== index && navigation.dispatch(pushNavigation(tabRoute))
          lastPosition === index && navigation.dispatch(resetNavigation(firstTab))
        }
        return <FooterGlobal {...props} jumpToIndex={jumpToIndex} />
      },
    	tabBarPosition: (Platform.OS === 'ios')? 'bottom' : 'top',
    	animationEnabled: true,
    	tabBarOptions: {
      	activeTintColor: '#e91e63',
        showIcon: true,
        showLabel: false,
      },
      lazy:true,
      navigationOptions: ({ navigation }) => ({
        // header: props => <ImageHeader {...props} />,
        tabBarOnPress: (scene, jumpToIndex) => {
          console.log('onPress:', scene.route);
          jumpToIndex(scene.index);
            },
        }),
  })

const LoginStack = StackNavigator({
  'Iniciar Sesion': {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      // header: props => <ImageHeader {...props} />,
      // headerStyle: { backgroundColor : '#00a85b'},
      // headerStyle: { backgroundColor : '#009658'},
      // headerStyle: { backgroundColor : '#007a52'},
      headerStyle: { backgroundColor : '#00bf60'},
      headerTintColor: 'white',
      title: 'Iniciar Sesion',
      headerLeft: null,
    }),
  },
  SignIn: {
    screen: SignIn,
    navigationOptions:({ navigation }) => ({
      // header: props => <ImageHeader {...props} />,
      headerTitle: 'Nuevo Usuario',
    }),
  },
},


)

const DrawNav = DrawerNavigator (
  {
    Contratos: {
      screen: tabNavigation,
      navigationOptions:{
        header: null,
      },
    },
  },

  {
    contentComponent: props => <DrawBar {...props} />,
    drawerPosition: 'right',
  },
)

const Root = StackNavigator({
  Login: {
    screen: LoginStack,
  },
  DrawerNav: {
    screen: DrawNav,
  },
},{
    
  headerMode: 'none'
})
const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
});

export default Root;
