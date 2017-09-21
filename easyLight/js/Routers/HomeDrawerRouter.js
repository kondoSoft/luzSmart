import React, { Component } from "react";
import { DrawerNavigator } from "react-navigation";
import Contracts from '../components/contracts'
import DetailContract from '../components/detailContract'
import Measurements from '../components/measurements'
import Tips from '../components/tips'
import Results from '../components/results';
import Contact from '../components/contact';
import SignIn from "../components/signin"
import AddContracts from '../components/addContract';
import EditContracts from '../components/editContract';
import Receipt from '../components/receipt';
import History from '../components/history';
import Configuration from '../components/configuration';
import EditProfile from '../components/editProfile';
import Faq from '../components/faq';
import DrawBar from "../components/DrawBar";

// draw nav?
export default (DrawNav = DrawerNavigator(
  {
    Contracts: { screen: Contracts },
    DetailContract: { screen: DetailContract },
    Measurements: { screen: Measurements },
    Tips: { screen: Tips },
    Resultados: { screen: Results },
    Contact: { screen:  Contact },
    AddContracts: { screen: AddContracts },
    EditContracts: { screen: EditContracts },
    Receipt: { screen: Receipt },
    Configuration: { screen: Configuration },
    EditProfile: { screen: EditProfile },
    History: { screen: History },
    SignIn: { screen: SignIn },
    Faq: { screen: Faq },
  },
  {
    contentComponent: props => <DrawBar {...props} />,
    drawerPosition: 'right',

  }
));
