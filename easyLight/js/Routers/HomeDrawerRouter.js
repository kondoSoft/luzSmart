import React, { Component } from "react";
import { DrawerNavigator } from "react-navigation";
import { Button, Icon } from "react-native"
import Contracts from '../components/contracts'
import DetailContract from '../components/detailContract'
import Measurements from '../components/measurements'
// import Tips from '../components/tips'
// import Results from '../components/results';
// import Contact from '../components/contact';
// import AddContracts from '../components/addContract';
// import EditContracts from '../components/editContract';
// import Receipt from '../components/receipt';
import History from '../components/history';
import Configuration from '../components/configuration';
import EditProfile from '../components/editProfile';
import Faq from '../components/faq';
import DrawBar from "../components/DrawBar";

// draw nav?
export default (DrawNav = DrawerNavigator(
  {
    Contratos: {
  		screen: Contracts,
      navigationOptions:{
  			// header: null,
  		},
    },
    DetailContract: {
  		screen: DetailContract,
  		navigationOptions: ({ navigation }) => ({
  			title: 'Detalles de Contrato',
        headerRight: <Button transparent onPress={() => navigation.navigate('DrawerOpen')}><Icon active name="menu"/></Button>,
        // headerLeft: <Button transparent ><Icon active name="arrow"/></Button>,

  		}),
  	},
    // Contracts: { screen: Contracts, },

    Measurements: { screen: Measurements },
    // Tips: { screen: Tips },
    // Resultados: { screen: Results },
    // AddContracts: { screen: AddContracts },

    // EditContracts: { screen: EditContracts },
    // Contacto: { screen:  Contact },
    // Configuration: { screen: Configuration },
    // EditProfile: { screen: EditProfile },
    // History: { screen: History },

    // Faq: { screen: Faq },
  },
  {
    contentComponent: props => <DrawBar {...props} />,
    drawerPosition: 'right',
  },
));
