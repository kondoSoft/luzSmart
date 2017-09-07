import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Platform, Image, ScrollView, Dimensions } from 'react-native';
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
import { getContract } from "../../actions/list_states_mx";
import Tips from '../tips'
import Measurements from '../measurements'
import Results from '../results'
import Login from '../login'
import Charts from '../charts'
// var gradientImage = require('../../../images/header.png')


class Contracts extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: 'Contratos',
  };
  componentWillMount(){
    // console.log(this.props.token);
    if(this.props.token != ""){
      this.props.getContract(this.props.token)
    }
    // else {
    //   this.props.navigation.navigate("login")
    // }
  }
  componentWillReceiveProps(nextProps){
    if(this.props.token == ""){
      this.props.getContract(nextProps.token)
    }
  }
  static propType = {
    getRate: React.PropTypes.func,
    getContract: React.PropTypes.func,
    getStates: React.PropTypes.func,
  }

  render(){
    const { navigation } = this.props
    const { contracts } = this.props
    const {state} = navigation
    return(
      <Container>
        <Header navigation={navigation} title={"EASYLIGTH"}/>
        {(Platform.OS === 'android')? <Footer navigation={navigation}/> : null}
        <ParentSwipeContracts
          contract={contracts}
          navigation={navigation}
        />
        <FabButton
          navigation={this.props.navigation}
          onTap={()=>{navigation.navigate("AddContracts")}}
          >
          <Text style={{ width: (Platform.OS === 'ios')? 42 : 50 , height: (Platform.OS === 'ios')? 42 : 50, textAlign: 'center', fontSize: 30, color: '#fff'}}>+</Text>
        </FabButton>
        {(Platform.OS === 'ios')? <Footer viewContract={contracts} navigation={navigation}/> : null}
      </Container>
    )
  }
}
class ParentSwipeContracts extends Component {
  constructor(props){
    super(props)
    this.state = {
      key: null
    }
    this.onOpenSwipe = this.onOpenSwipe.bind(this)
  }
  onOpenSwipe(i){
    this.setState({
      key: i,
    })
  }
  render(){
    const { navigation } = this.props
    const { contract } = this.props
    return(
      <ScrollView
        style={{backgroundColor: '#fff'}}
        scrollEnabled={true}
        >
        {contract.map((contract, i )=><SwipeAccordion
          func={()=>this.onOpenSwipe(i)}
          indexOpen={this.state.key}
          keyVal={i}
          key={i}
          index={contract.id}
          receipts={contract.receipt}
          navigation={navigation}
          dataAccordionContract={contract}
          component={<ItemComponent data={contract}/>}
          icon={<Icon style={styles.icon} name="information-circle"/>}
        />)}
      </ScrollView>
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
    getContract: token => dispatch(getContract(token)),

  }
}
const mapStateToProps = state => ({
  contracts: state.list_contracts.contracts,
  selectedIndex: state.list_contracts.selectedIndex,
  token: state.user.token
})
const ContractsSwagger = connect(mapStateToProps, bindAction)(Contracts);
const DrawNav = DrawerNavigator(
  {
     Contracts: { screen: ContractsSwagger },
     Tips: { screen: Tips },
    //  Mediciones: { screen: Measurements},
    //  Resultados: { screen: Results },
     Logout: { screen: Login },
     Charts:{screen: Charts},
  },
  {
      drawerPosition: 'right',
      // contentComponent: props => <DrawBar {...props} />
  }
)
DrawNav.navigationOptions = ({navigation}) => {
  return {
    header: null
  }
}
export default DrawNav
