import React, { Component } from "react";
import HomeDrawerRouter from "./HomeDrawerRouter";
import { StackNavigator } from "react-navigation";
import { Header, Left, Button, Icon, Body, Title, Right } from "native-base";
import Login from "../components/login/";



HomeDrawerRouter.navigationOptions = ({ navigation }) => ({
  header: null
});
const navigation = {
  Login: { screen: Login },
  Contratos: { screen: HomeDrawerRouter },
}

export default (StackNav = StackNavigator(navigation));
