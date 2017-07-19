import React, { Component } from "react";
import HomeDrawerRouter from "./HomeDrawerRouter";
import { StackNavigator } from "react-navigation";

import { Header, Left, Button, Icon, Body, Title, Right } from "native-base";
import Login from "../components/login/";
import BlankPage from "../components/blankPage";
import SignIn from "../components/signin"
import Contracts from '../components/contracts';
import Measurements from '../components/measurements';
import DetailContract from '../components/detailContract';
import Results from '../components/results';
import AddContracts from '../components/addContract';
import Receipt from '../components/receipt';
import History from '../components/history';
import Tips from '../components/tips';
import Contact from '../components/contact';

HomeDrawerRouter.navigationOptions = ({ navigation }) => ({
  header: null
});

export default (StackNav = StackNavigator({
  Login: { screen: Login },
  Contracts: { screen: Contracts },
  SignIn: { screen: SignIn },
  DetailContract: { screen: DetailContract },
  Measurements: { screen: Measurements },
  Results: { screen: Results },
  AddContracts: { screen: AddContracts },
  Receipt: { screen: Receipt },
  History: { screen: History },
  Tips: { screen: Tips },
  Contact: { screen:  Contact }
}));
