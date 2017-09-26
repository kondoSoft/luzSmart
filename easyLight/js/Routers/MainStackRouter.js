import React, { Component } from "react";
import HomeDrawerRouter from "./HomeDrawerRouter";
import { StackNavigator, TabNavigator } from "react-navigation";
import { Header, Left, Button, Icon, Body, Title, Right } from "native-base";
import Login from "../components/login/";
import Tips from '../components/tips'
import Results from '../components/results';
import Measurements from '../components/measurements'
import DetailContract from '../components/detailContract'
import Receipt from '../components/receipt';

import { Image, StyleSheet } from 'react-native';

HomeDrawerRouter.navigationOptions = ({ navigation }) => ({
  header: null
});

const tabNavigation = TabNavigator(
  {
	Home: { screen: HomeDrawerRouter },
	Tips: { screen: Tips },
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
 	Resultados: { 
 		screen: Results,
 		navigationOptions: ({ navigation }) => ({
			title: 'Resultados'
		}),
	},
  },
  {
  	tabBarPosition: 'bottom',
  	animationEnabled: true,
  	tabBarOptions: {
    	activeTintColor: '#e91e63',
 	},
  })
const navigation = ({
	Login: { 
		screen: Login,
		navigationOptions: ({ navigation }) => ({
			title: 'Login'
		}),
	},

	Contratos: { 
		screen: tabNavigation,
		navigationOptions: ({ navigation }) => ({
			headerTitle: 'EASYLIGHT'
		}),
	},

	DetailContract: { 
		screen: DetailContract,
		navigationOptions: ({ navigation }) => ({
			title: 'Detalles de Contrato'
		}),
	
	},
	Receipt: { 
		screen: Receipt,
		navigationOptions: ({ navigation }) => ({
			title: 'Recibo'
		}),
	},
  })

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
});

export default (StackNav = StackNavigator(navigation));
