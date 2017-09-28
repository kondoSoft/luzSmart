import React, { Component } from "react";
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
			title: 'Recibo'
		}),
	},
  AddContracts: {
    screen: AddContracts,
    navigationOptions: ({ navigation }) => ({
			title: 'Agregar Contratos'
		}),
  },
})
const DrawNav = DrawerNavigator (
  {
    Contratos: {
  		screen: stackNavigation,
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
const tabNavigation = TabNavigator(
  {
  	Contratos: {
      screen: DrawNav,
      navigationOptions: {
          headerLeft: null,
          tabBarLabel: 'Contratos',
          tabBarIcon: ({tintColor}) => <Icon name="home" />,
        },
     },
  	Tips: { screen: Tips,
      navigationOptions: {
          headerLeft: null,
          tabBarIcon: ({tintColor}) => <Icon name="thumbs-up" />,
        },
     },
  	// Mediciones: {
  	// 	screen: Measurements,
  	// 	navigationOptions: ({ navigation }) => ({
  	// 		tabBarIcon: ({ tintColor }) => (
  	//       		<Image
  	//         		source={require('../../images/logogray.png')}
  	//         		style={[styles.icon, {tintColor: tintColor}]}
  	//       		/>
   //    		),
   //    	}),
  	// },
   // 	Resultados: {
   // 		screen: Results,
   // 		navigationOptions: ({ navigation }) => ({
  	// 		title: 'Resultados'
  	// 	}),
  	// },
    },
    {
    	tabBarPosition: 'bottom',
    	animationEnabled: true,
    	tabBarOptions: {
      	activeTintColor: '#e91e63',
      },
  })

const LoginStack = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      title: 'Login'
    }),
  },
  SignIn: { 
    screen: SignIn,
    navigationOptions:({ navigation }) => ({
      headerTitle: 'Nuevo Usuario',
      headerMode: 'screen',
    }),
  },
})

const Root = StackNavigator({
  Login: {
    screen: LoginStack,
  },
  Tab: {
    screen: tabNavigation,
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
