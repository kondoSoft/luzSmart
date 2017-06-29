import React, { Component } from "react";
import Login from "../components/login/";
import Home from "../components/home/";
import BlankPage from "../components/blankPage";
import SignIn from "../components/signin"
import HomeDrawerRouter from "./HomeDrawerRouter";
import { StackNavigator } from "react-navigation";
import { Header, Left, Button, Icon, Body, Title, Right } from "native-base";
import Contracts from '../components/contracts';
import DetailContract from '../components/detailContract';
import Measurements from '../components/measurements';
import Results from '../components/results';

HomeDrawerRouter.navigationOptions = ({ navigation }) => ({
  header: null
});

export default (StackNav = StackNavigator({
  Login: { screen: Login },
  Home: { screen: Home },
  BlankPage: { screen: BlankPage },
  Contracts: { screen: Contracts },
  SignIn: { screen: SignIn },
  DetailContract: { screen: DetailContract },
  Measurements: { screen: Measurements },
  Results: { screen: Results },
}));
