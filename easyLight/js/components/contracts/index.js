import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Platform, Image, ScrollView } from 'react-native';
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
import { getRateUnique, getContract } from "../../actions/list_states_mx";

// var gradientImage = require('../../../images/header.png')

class Contracts extends Component {
  static navigationOptions = {
    header: null,
  };
  componentWillMount(){
    // this.props.getStates()
    this.props.getRateUnique()

  }
  componentWillReceiveProps(nextProps){
  
    if(this.props.token == ""){
      this.props.getContract(nextProps.token)
    }
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
        <ParentSwipeContracts
          getContract={contracts}
          navigation={navigation}
        />
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
    var { getContract } = this.props
    return(
      <ScrollView
        style={{backgroundColor: '#fff'}}
        >
        {getContract.map((contract, i )=><SwipeAccordion
          func={()=>this.onOpenSwipe(i)}
          indexOpen={this.state.key}
          keyVal={i}
          key={i}
          index={contract.id}
          receipts={contract.receipt}
          navigation={navigation}
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
    // getStates: () => dispatch(getStates()),
    getRateUnique: list => dispatch(getRateUnique(list)),
    getContract: token => dispatch(getContract(token)),
  }
}
const mapStateToProps = state => ({
  contracts: state.list_contracts.contracts,
  selectedIndex: state.list_contracts.selectedIndex,
  token: state.user.token
})
export default connect(mapStateToProps, bindAction)(Contracts)
