import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Platform } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container, Fab , Content, Header, Body, Left, List, ListItem, Thumbnail, Text, Title, Button, Icon, Right, Image} from 'native-base';
import styles from "./styles";
import Footer from '../footer/index';
import SwipeItem from '../listSwipe/index';
import DrawBar from '../DrawBar';
import { DrawerNavigator, NavigationActions } from "react-navigation";


import { setIndex } from "../../actions/list";
import { openDrawer } from "../../actions/drawer";

class Contracts extends Component {
  constructor(props){
    super(props)
      this.state = {
        contracts: {
          'contract': {
            "name" : "Oficina",
            "number_contract" : 324151,
            "state" : "Tabasco",
            "municipality" : "Centro",
            "rate" : "Tarifa 1D",
            "period_summer" : "Mar-Ago",
            "type_payment" : "Bimestral",
            "receipt" : undefined,
            "cost" : "$1500",
            "image" : require('../../../images/office.png')
          },
          "contract1" : {
            "name" : "Casa",
            "number_contract" : 986756,
            "state" : "Tabasco",
            "municipality" : "Centro",
            "rate" : "Tarifa 1D",
            "period_summer" : "Mar-Ago",
            "type_payment" : "Mensual",
            "receipt" : undefined,
            "cost" : "$300",
            "image" : require('../../../images/home.png')
          },
        }
      }


  }
  static navigationOptions = {
    header: null
  };
  render(){
    const { navigation } = this.props
    const { contracts } = this.state
    return(
      <Container>
        <Header style={styles.header}>
          <Left>
            {(Platform.OS === 'ios')? <Title style={styles.header__left__title}>EASYLIGHT</Title> : null }
          </Left>
          <Right>
            {(Platform.OS === 'ios')? <Icon name="menu" active style={{ color: 'white' }} onPress={()=>this.props.navigation.navigate('DrawerOpen')} /> : <Title style={styles.header__left__title}>EASYLIGHT</Title> }
          </Right>
        </Header>
        {(Platform.OS === 'android')? <Footer navigation={navigation}/> : null}
        <Content>
          <Grid>
            <Col>
              <List style={styles.list}>
                {Object.keys(contracts).map((contract, i )=><SwipeItem
                  key={i}
                  index={i}
                  navigation={navigation}
                  component={<ItemComponent data={contracts[contract]}/>}
                  icon={<Icon style={styles.icon} name="information-circle"/>}
                />)}
              </List>
            </Col>
          </Grid>
        </Content>
        <Fab
          active={true}
          direction="up"
          style={styles.fab}
          position="bottomRight"
          onPress={()=>{navigation.navigate("AddContracts")}}
          >
          <Icon active name="md-add" style={styles.icon}/>
        </Fab>
        {(Platform.OS === 'ios')? <Footer navigation={navigation}/> : null}
      </Container>
    )
  }
}

class ItemComponent extends Component{
  render(){
    const contract = this.props.data
    return(
      <View style={styles.ItemComponent.view}>
        <Left style={styles.ItemComponent.align}>
          <Thumbnail source={contract.image} />
        </Left>
        <Body style={styles.ItemComponent.align}>
          <Text style={styles.listItem__body__text}>{contract.name}</Text>
        </Body>
        <Right style={styles.ItemComponent.align}>
          <Text style={styles.listItem__body__view__text,{}}>{contract.cost}</Text>
        </Right>
      </View>
    )
  }
}


export default Contracts
