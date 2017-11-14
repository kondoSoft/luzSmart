import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Platform, Image, ScrollView, Dimensions, PanResponder, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container, Fab , Content, Body, Left, List, Thumbnail, Text, Title, Button, Icon, Right} from 'native-base';
import styles from "./styles";
// import SwipeAccordion from '../listSwipe/swipe';
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
import Swipeable from 'react-native-swipeable';
// var gradientImage = require('../../../images/header.png')


class Contracts extends Component {
  constructor(props) {
    super(props)
    this.state = {
        contract: [],
        currentlyOpenSwipeable: null
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


  handleScroll = () => {
    const {currentlyOpenSwipeable} = this.state;

    if (currentlyOpenSwipeable) {
      currentlyOpenSwipeable.recenter();
    }
  };
  render(){
    const { navigation, profile } = this.props
    const { state } = navigation
    const { contract, currentlyOpenSwipeable }= this.state
    const itemProps = {
      onOpen: (event, gestureState, swipeable) => {
        if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
          currentlyOpenSwipeable.recenter();
        }

        this.setState({currentlyOpenSwipeable: swipeable});
      },
      onClose: () => this.setState({currentlyOpenSwipeable: null})
    };

    var fab = <FabButton navigation={this.props.navigation} onTap={()=>{navigation.navigate("AddContracts" )}}>
        <Text style={{ width: (Platform.OS === 'ios')? 42 : 50 , height: (Platform.OS === 'ios')? 42 : 50, textAlign: 'center', fontSize: (Platform.OS === 'ios')? 30 : 33, color: '#fff'}}>+</Text>
      </FabButton>

    return(
      <Container>
        <ListSwipeable
          handleScroll={this.handleScroll}
          itemProps={itemProps}
          contract={ this.props.contracts }
          navigation={ navigation }
          isPremium={ this.props.profile.premium }

          />
        {(profile.premium == true)? fab : (contract.length === 0)? fab : null}
      </Container>
    )
  }
}

class ListSwipeable extends Component {
  navigateTo(route){
    console.log('navigateTo', route);
    this.props.navigation.navigate(route)
    // if (this.props.navigation.state.routeName === 'DetailContract') {
    //  if(this.props.keyVal === 0){
    //    this.props.pickerContract(this.props.dataAccordionContract.name_contract)
    //    this.props.navigation.navigate('Medicion',{ receipt: this.props.dataAccordion , contract: this.props.dataAccordionContract, index: this.props.index})
    //  }
    // }
    // else if( this.props.navigation.state.routeName === 'Periodos'){
    //   if(this.props.keyVal === 0){
    //   this.props.navigation.navigate('MedicionPeriodo',{ receipt: this.props.dataAccordion , contract: this.props.dataAccordionContract, index: this.props.index})
    //   }
    // }
    // else {
    //   this.props.navigation.navigate(route, { receipt: this.props.receipts, index: this.props.index, profile: this.props.profile, contract: this.props.dataAccordionContract})
    // }
  }

  render(){
    const { navigation, contract } = this.props
    return(
      <ScrollView scrollEventThrottle={this.props.handleScroll}>
        {contract.map((contract, i )=>
          <Swipeable
            key={i}
            receipts={contract.receipt}
            rightButtons={[
              <TouchableOpacity
                style={{  height: 60,
                          backgroundColor: 'lightgrey',
                          justifyContent: 'center',

                      }}
                activeOpacity={0.6}
                onPress={() => this.navigateTo('EditContracts')}
              >
                <Icon style={{ fontSize: 35, color: '#fff', paddingLeft: '7%'}} name='md-create' />
              </TouchableOpacity>,
              <TouchableOpacity
                style={{  height: 60,
                          backgroundColor: '#069b1c',
                          justifyContent: 'center',


                      }}
                activeOpacity={0.6}
              >
                <Icon style={{ fontSize: 35, color: '#fff', paddingLeft: '7%'}} name='ios-book-outline' />
              </TouchableOpacity>,
              <TouchableOpacity
                style={{  height: 60,
                          backgroundColor: 'steelblue',
                          justifyContent: 'center',

                      }}
                activeOpacity={0.6}
              >
                <Icon style={{ fontSize: 35, color: '#fff', paddingLeft: '7%' }} name='ios-information-circle-outline' />

              </TouchableOpacity>
            ]}
            onRightButtonsOpenRelease={this.props.itemProps.onOpen}
            onRightButtonsCloseRelease={this.props.itemProps.onClose}
            >
            <TouchableWithoutFeedback
              onPress={() => this.navigateTo('DetailContract')}
            >
              <View style={[styles.ItemComponent.view, {backgroundColor: 'fff'}]}>
                <Left  style={styles.ItemComponent.alignItem} >
                  {(contract.image == null)? <Thumbnail source={require('../../../images/Casaplace.png')} /> : <Thumbnail source={{ uri: contract.image }} />}
                </Left>
                <Body style={styles.ItemComponent.alignItem}>
                  <Text style={styles.listItem__body__text}>{contract.name_contract}</Text>
                </Body>
                <Right style={styles.ItemComponent.alignItem}>{contract.cost}</Right>
              </View>
            </TouchableWithoutFeedback>

          </Swipeable>
          )}
        </ScrollView>
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
