import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Platform, Image, ScrollView, Dimensions, PanResponder, TouchableOpacity, PixelRatio } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container, Fab , Content, Body, Left, List, Thumbnail, Text, Title, Button, Icon, Right} from 'native-base';
import styles from "./styles";
import SwipeAccordion from '../listSwipe/swipe';
import FabButton from '../fabButton';
import { setIndex } from "../../actions/list";
import { openDrawer } from "../../actions/drawer";
import { getContract, resetRate, resetMunicipality } from "../../actions/list_states_mx";
import { resetPicketContract, getRegion } from "../../actions/contracts";
import { getUser } from '../../actions/user';
import {
  costProject,
  // getDayInDates,
  // getKwHrsTransCurrid
} from '../../helpers';
// var gradientImage = require('../../../images/header.png')
var {height, width} = Dimensions.get('window')
var screen = Dimensions.get('window')
class Contracts extends Component {
  constructor(props) {
    super(props)
    this.state = {
        contract: []
    }
  }
  componentWillMount(){
    this.props.resetRate()
    this.props.resetMunicipality()
    this.props.getRegion(this.props.screenProps.token)
    this.setState({
      contract: this.props.contracts
    })
  }

  render(){
    const { navigation, profile } = this.props
    const { state } = navigation
    const { contract }= this.state
    var fab = <FabButton navigation={this.props.navigation} onTap={()=>{navigation.navigate("AddContracts" )}}>
        <Text style={{ width: (Platform.OS === 'ios')? 42 : 50 , height: (Platform.OS === 'ios')? 42 : 50, textAlign: 'center', fontSize: (Platform.OS === 'ios')? 30 : 33, color: '#fff'}}>+</Text>
      </FabButton>

    return(
      <Container>
        <ParentSwipeContracts
          contract={ this.props.contracts }

          navigation={ navigation }
          isPremium={ this.props.profile.premium }
        />
        {(profile.premium == true)? fab : (contract.length === 0)? fab : null}
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
  componentWillMount(){
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder : () => {
        return true
      },
      onPanResponderMove:(e,gestureState)=>{

      },
      onPanResponderRelease: (e, gesture) => {

      },
    })
  }
  render(){
    console.log('height',height, 'width', width, width * screen.scale, PixelRatio.get())
    const { navigation } = this.props
    const { contract } = this.props
    return(
        <ScrollView
          style={{backgroundColor: '#fff'}}
          >
          {contract.map((contract, i )=>
            <SwipeAccordion
              isPremium={this.props.isPremium}
              func={()=>this.onOpenSwipe(i)}
              indexOpen={this.state.key}
              keyVal={i}
              key={i}
              index={contract.id}
              receipts={contract.receipt}
              navigation={navigation}
              dataAccordionContract={contract}
              component={<ItemComponent data={contract} key={i} />}
              icon={<Icon style={styles.icon} name="information-circle"/>}
              onPressLeft={() => navigation.navigate('EditContracts', contract)}
            />)}
        </ScrollView>
    )
  }
}

class ItemComponent extends Component{

  render(){
    const contract = this.props.data
    console.log(contract);
    return(
      <View style={styles.ItemComponent.view}>
        <Left style={styles.ItemComponent.align}>
          {(contract.image == null)? <Thumbnail source={require('../../../images/Casaplace.png')} /> : <Thumbnail source={{ uri: contract.image }} />}
        </Left>
        <Body style={styles.ItemComponent.align}>
          <Text style={styles.listItem__body__text}>{contract.name_contract}</Text>
        </Body>
        <Right style={styles.ItemComponent.align}>
          {/* <Text style={styles.listItem__body__view__text}>{contract.cost}</Text> */}
        </Right>
      </View>
    )
  }
}
function bindAction(dispatch){
  return {
    getContract: (token, navigation) => dispatch(getContract(token, navigation)),
    getUser: token =>dispatch(getUser(token)),
    resetRate: () => dispatch(resetRate()),
    resetMunicipality: () => dispatch(resetMunicipality()),
    resetPicketContract: () => dispatch(resetPicketContract()),
    getRegion: token => dispatch(getRegion(token)),
  }
}
const mapStateToProps = state => ({
  contracts: state.list_contracts.contracts,
  selectedIndex: state.list_contracts.selectedIndex,
  token: state.user.token,
  dataUser: state.user.user,
  profile: state.user.profileUser,
})


export default connect(mapStateToProps, bindAction)(Contracts);
