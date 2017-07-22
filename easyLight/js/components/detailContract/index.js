import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  Container,
  Content,
  Left,
  List,
  ListItem,
  Right,
  Icon,
  Title,
  Thumbnail,
  Text,
  Body,
  Fab,
} from 'native-base';
import {
  View,
  Platform,
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import { Col, Row, Grid } from "react-native-easy-grid";
import Header from '../header/index';
import Footer from '../footer/index';
import styles from './styles';
import SwipeItem from '../listSwipe/index';
import FabButton from '../fabButton/index';

class DetailContract extends Component {
  constructor(props){
    super(props)
      this.state = {
        receipts: {
          "receipt": {
            "payday_limit" : "05 Nov 16",
            "amount_payable" : 525,
            "current_reading" : '06283',
            "previous_reading" : '06160',
            "current_data" : '06283',
          },
          "receipt1" : {
            "payday_limit" : "06 Ene 17",
            "amount_payable" : 213,
            "current_reading" : '06302',
            "previous_reading" : '06283',
            "current_data" : '06302',
          }
        }
      }
    }
  static navigationOptions = {
    header: null
  };
  render(){

    const { receipts } = this.state
    const { navigation } = this.props

    return(
      <Container>
        <Header navigation={navigation} title="Periodos"/>
        {(Platform.OS === 'android')? <Footer navigation={navigation}/> : null}
        <Content>
          <Grid>
            <Row style={styles.detailContract__row__top}>
              <Text style={styles.detailContract__row__top__text}>Mi Oficina</Text>
            </Row>
            <Col>
              <List style={styles.list}>
                {Object.keys(receipts).map((receipt, i )=><SwipeItem
                  key={i}
                  navigation={navigation}
                  component={<ItemComponent data={receipts[receipt]}/>}
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
          onPress={()=>{navigation.navigate("Receipt")}}
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
    const receipt = this.props.data
    console.log(receipt);
    return(
      <View style={styles.ItemComponent.view}>
        <Left style={styles.ItemComponent.align}>
          {/* <Text style={styles.listItem__body__text,{}}>{(receipt != undefined )? receipt.payday_limit.substring(2) : null}</Text> */}
          <Text style={styles.listItem__body__text,{}}>{receipt.payday_limit}</Text>

        </Left>
        <Body style={styles.ItemComponent.align}>

        </Body>
        <Right style={styles.ItemComponent.align}>
          <Text style={styles.listItem__body__view__text,{}}>{receipt.current_reading}</Text>
          <Text style={styles.listItem__body__view__text,{}}>Pagado</Text>
        </Right>
      </View>
    )
  }
}
const mapStateToProps = state => ({
  receipts: state.list_contracts.receipts
});
export default connect(mapStateToProps)(DetailContract)
