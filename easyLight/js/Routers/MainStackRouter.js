import React, { Component } from "react";
import { Platform } from 'react-native';
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

const stackContratos = StackNavigator({
  Contratos: {
    screen: Contracts,
    navigationOptions: ({ navigation }) => ({
      title: 'EASYLIGHT',
      headerTintColor: 'white',
      headerStyle: { backgroundColor : '#00a85b'},
      headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active style={{'color': 'white'}} name="menu"/></Button>,
      headerLeft: null,
    }),
  },
  DetailContract: {
    screen: DetailContract,
    navigationOptions: ({ navigation }) => ({
      title: 'Detalles de Contrato',
      headerTintColor: 'white',
      tabBarVisible: false,
      headerStyle: { backgroundColor : '#00a85b'},
      // headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active style={{'color': 'white'}} name="menu"/></Button>,
    }),
  },
  Medicion: {
    screen: MeasurementsCopy,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: 'white',
      headerStyle: { backgroundColor : '#00a85b'},
      tabBarVisible: false,
      title: 'Medicion',
      // headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active style={{'color': 'white'}} name="menu"/></Button>,
    }),
  },
  Receipt: {
    screen: Receipt,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: 'white',
      headerStyle: { backgroundColor : '#00a85b'},
      tabBarVisible: false,
      title: 'Recibo',
      // headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active style={{'color': 'white'}} name="menu"/></Button>,

    }),
  },
  AddContracts: {
    screen: AddContracts,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: 'white',
      headerStyle: { backgroundColor : '#00a85b'},
      tabBarVisible: false,
      title: 'Agregar Contrato',
      // headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active style={{'color': 'white'}} name="menu"/></Button>,
    }),
  },
  EditContracts: {
    screen: EditContracts,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: 'white',
      headerStyle: { backgroundColor : '#00a85b'},
      tabBarVisible: false,
      title: 'Editar Contrato',
      // headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active style={{'color': 'white'}} name="menu"/></Button>,
    }),
  },
},
  {
    headerMode: 'screen',
  }
)

const stackDraw = StackNavigator(
	{
		Contactanos: {
	    screen: Contact,
	    navigationOptions: ({ navigation }) => ({
	      title: 'Contactanos',
        headerTintColor: 'white',
        headerStyle: { backgroundColor : '#00a85b'},
				headerLeft: null,
	      headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active style={{'color': 'white'}} name="menu"/></Button>,
	    }),
	   },
	  FAQ: {
	    screen: Faq,
	    navigationOptions: ({ navigation }) => ({
	      title: 'FAQ',
        headerTintColor: 'white',
        headerStyle: { backgroundColor : '#00a85b'},
				headerLeft: null,
	      headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active style={{'color': 'white'}} name="menu"/></Button>,
	    }),
	  },
	  Historial: {
	    screen: History,
	    navigationOptions: ({ navigation }) => ({
	      title: 'Historial',
        headerTintColor: 'white',
        headerStyle: { backgroundColor : '#00a85b'},
				headerLeft: null,
	      headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active style={{'color': 'white'}} name="menu"/></Button>,
	    }),
	  },
	  Premium: {
	    screen: Configuration,
	    navigationOptions: ({ navigation }) => ({
	      title: 'Premium',
        headerTintColor: 'white',
        headerStyle: { backgroundColor : '#00a85b'},
				headerLeft: null,
	      headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active style={{'color': 'white'}} name="menu"/></Button>,
	    }),
	  },
    EditProfile: {
    screen: EditProfile,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: 'white',
      headerStyle: { backgroundColor : '#00a85b'},
      title: 'Editar Perfil',
      headerLeft: null,
      headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active style={{'color': 'white'}} name="menu"/></Button>,
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
          headerTintColor: 'white',
          headerStyle: { backgroundColor : '#00a85b'},
          tabBarIcon: ({tintColor}) => <Icon name="ios-bulb-outline" />,
          title: 'Tips',
          headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active style={{'color': 'white'}} name="menu"/></Button>,
      }),
    }
  })

const tabMediciones = StackNavigator(
  {
    Mediciones: {
      screen: Measurements,
      navigationOptions: ({ navigation }) => ({
        headerTintColor: 'white',
        headerStyle: { backgroundColor : '#00a85b'},
        title: 'Mediciones',
        headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active style={{'color': 'white'}} name="menu"/></Button>,
      }),
    },
  })

const tabResults = StackNavigator(
  {
    Resultados: {
      screen: Results,
      navigationOptions: ({ navigation }) => ({
        headerTintColor: 'white',
        headerStyle: { backgroundColor : '#00a85b'},
        title: 'Resultados',
        headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active style={{'color': 'white'}} name="menu"/></Button>,
      }),
    },
  })

const tabPeriods = StackNavigator(
  {
    Periodos: {
    screen: DetailUltimateContract,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: 'white',
      headerStyle: { backgroundColor : '#00a85b'},
      title: 'Detalles de Contrato',
      headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active style={{'color': 'white'}} name="menu"/></Button>,
    }),
  },
  Medicion: {
    screen: MeasurementsCopy,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: 'white',
      headerStyle: { backgroundColor : '#00a85b'},
      tabBarVisible: false,
      title: 'Medicion',
      // headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active style={{'color': 'white'}} name="menu"/></Button>,
    }),
  },
})

const tabNavigation = TabNavigator(
  {
		StackDraw: {
			screen: stackDraw,
		},
  	Contratos: {
      screen: stackContratos,
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
			tabBarComponent:  props => {
        return <FooterGlobal {...props} />
      },
    	tabBarPosition: (Platform.OS === 'ios')? 'bottom' : 'top',
    	animationEnabled: true,
    	tabBarOptions: {
      	activeTintColor: '#e91e63',
        showIcon: true,
        showLabel: false,
      },
  })



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
const LoginStack = StackNavigator({
  'Iniciar Sesion': {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      // header: props => <ImageHeader {...props} />,
      headerStyle: { backgroundColor : '#00a85b'},
      // headerStyle: { backgroundColor : '#009658'},
      // headerStyle: { backgroundColor : '#007a52'},
      // headerStyle: { backgroundColor : '#00bf60'},
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
      headerTintColor: 'white',
      headerStyle: { backgroundColor : '#00a85b'},
    }),
  },
}
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
