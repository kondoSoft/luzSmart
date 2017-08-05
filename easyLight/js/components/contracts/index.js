import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Platform, Image} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container, Fab , Content, Body, Left, List, Thumbnail, Text, Title, Button, Icon, Right} from 'native-base';
import Header from '../header/index';
import styles from "./styles";
import Footer from '../footer/index';
import SwipeAccordion from '../listSwipe/swipe';
import DrawBar from '../DrawBar';
import FabButton from '../fabButton';
import { DrawerNavigator, NavigationActions } from "react-navigation";
import { setIndex } from "../../actions/list";
import { openDrawer } from "../../actions/drawer";
import { getStates, getRateUnique, getContract } from "../../actions/list_states_mx";

// var gradientImage = require('../../../images/header.png')

class Contracts extends Component {
  constructor(props){

    super(props)
  }
  static navigationOptions = {
    header: null,
  };
  componentWillMount(){
    this.props.getStates()
    this.props.getRateUnique()
    this.props.getContract()

  }
  static propType = {
    getRateUnique: React.PropTypes.func,
    getContract: React.PropTypes.func,
    getStates: React.PropTypes.func,
  }
  render(){
    const { navigation } = this.props
    const { contracts } = this.props
    const {state} = navigation
    return(
      <Container>
        <Header navigation={navigation} title={"EASYLIGHT"}/>
        {(Platform.OS === 'android')? <Footer navigation={navigation}/> : null}
        <Content style={{backgroundColor: '#fff'}}>
          <Grid>
            <Col>
              <List style={styles.list}>
                {contracts.map((contract, i )=><SwipeAccordion
                  key={i}
                  index={contract.id}
                  receipts={contract.receipt}
                  navigation={navigation}
                  dataAccordionContract={contract}
                  component={<ItemComponent data={contract}/>}
                  icon={<Icon style={styles.icon} name="information-circle"/>}
                />)}
              </List>
            </Col>
          </Grid>
        </Content>
        <FabButton
          navigation={this.props.navigation}
          onTap={()=>{navigation.navigate("AddContracts")}}
          >
          <Text style={{ width: (Platform.OS === 'ios')? 42 : 50 , height: (Platform.OS === 'ios')? 42 : 50, textAlign: 'center', fontSize: 30, color: '#fff'}}>+</Text>
        </FabButton>
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
          {(contract.image == null)? <Text>Empty</Text> : <Thumbnail source={{ uri: contract.image }} />}
        </Left>
        <Body style={styles.ItemComponent.align}>
          <Text style={styles.listItem__body__text}>{contract.name_contract}</Text>
        </Body>
        <Right style={styles.ItemComponent.align}>
          <Text style={styles.listItem__body__view__text}>{contract.cost}</Text>
        </Right>
      </View>
    )
  }
}
function bindAction(dispatch){
  return {
    getStates: () => dispatch(getStates()),
    getRateUnique: list => dispatch(getRateUnique(list)),
    getContract: () => dispatch(getContract()),
  }
}
const mapStateToProps = state => ({
  contracts: state.list_contracts.contracts,
  selectedIndex: state.list_contracts.selectedIndex
})
export default connect(mapStateToProps, bindAction)(Contracts)
