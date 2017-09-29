import React, { Component } from "react";
import { Platform } from 'react-native';
import HomeDrawerRouter from "./HomeDrawerRouter";
import { StackNavigator, TabNavigator, DrawerNavigator } from "react-navigation";
import { Header, Left, Button, Icon, Body, Title, Right } from "native-base";
import Login from "../components/login/";
import Tips from '../components/tips'
import Results from '../components/results';
import Measurements from '../components/measurements'
import DetailContract from '../components/detailContract'
import Receipt from '../components/receipt';
import Contracts from '../components/contracts'
import AddContracts from '../components/addContract';
import DrawBar from "../components/DrawBar";
import SignIn from "../components/signin"
import EditProfile from '../components/editProfile';
import History from '../components/history';
import Faq from '../components/faq';
import Contact from '../components/contact';
import EditContracts from '../components/editContract';
import { Image, StyleSheet } from 'react-native';

// HomeDrawerRouter.navigationOptions = ({ navigation }) => ({
//   // header: null
// });


const stackNavigation = StackNavigator({
	Contratos: {
		screen: Contracts,
    navigationOptions: ({ navigation }) => ({
      title: 'EASYLIGHT',
      headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active name="menu"/></Button>,
      headerLeft: null,
    }),
	},
  DetailContract: {
    screen: DetailContract,
    navigationOptions: ({ navigation }) => ({
      title: 'Detalles de Contrato',
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
			title: 'Agregar Contratos',
      headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active name="menu"/></Button>,
		}),
  },
  EditContracts: {
    screen: EditContracts,
    navigationOptions: ({ navigation }) => ({
      title: 'Editar Contratos',
      headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active name="menu"/></Button>,
    }),
  },
})


const tabTips = StackNavigator(
  {
    Tips: { 
      screen: Tips,
      navigationOptions: ({ navigation }) => ({
          headerLeft: null,
          tabBarIcon: ({tintColor}) => <Icon name="bulb" />,
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

const tabNavigation = TabNavigator(
  {
  	Contratos: {
      screen: stackNavigation,
      navigationOptions: {
          headerLeft: null,
          tabBarLabel: 'Contratos',
          tabBarIcon: ({tintColor}) => <Icon name="home" />,
        },
     },
    Mediciones: { screen: tabMediciones },
  	Tips: { screen: tabTips,},
    Resultados: { screen: tabResults },
    },
    {
    	tabBarPosition: (Platform.OS === 'ios')? 'bottom' : 'top',
    	animationEnabled: true,
    	tabBarOptions: {
      	activeTintColor: '#e91e63',
        showIcon: true,
        showLabel: false,
    },

  })

const LoginStack = StackNavigator({
  'Cerrar Sesion': {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      title: 'Iniciar Sesion',
      headerLeft: null,
    }),
  },
  SignIn: { 
    screen: SignIn,
    navigationOptions:({ navigation }) => ({
      headerTitle: 'Nuevo Usuario',
    }),
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
    EditProfile: { screen: EditProfile },
    Contactanos: { screen: Contact },
    FAQ: { screen: Faq },
    Historial: { screen: History },

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
