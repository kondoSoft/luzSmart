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
import SwipeAccordion from '../listSwipe/swipe';
import FabButton from '../fabButton';

class DetailContract extends Component {
  constructor(props){
    super(props)

    this.state = {
      key: null,
      status: 'Pagado',
    }
    this.onOpenSwipe = this.onOpenSwipe.bind(this)
  }
  static navigationOptions = {
    header: null
  };
  onOpenSwipe(i){
    this.setState({
      key: i,
    })
  }
  render(){
    const { navigation } = this.props
    const {status} = this.state
    const bill = navigation.state.params.receipt
    const index = navigation.state.params.index
    const colors = ['lightgrey','#fff']
    var numContract = []
    const contract = this.props.contracts.map((item,i)=>{
      if (item.id == navigation.state.params.index){
        numContract.push(item)
        return numContract
      }
    })
    return(
      <Container>
        <Header navigation={navigation} title="Periodos"/>
        {(Platform.OS === 'android')? <Footer navigation={navigation}/> : null}
        <Content style={{backgroundColor: '#fff'}}>
          <Grid>
            <Row style={styles.detailContract__row__top}>
              <Text style={styles.detailContract__row__top__text}>{numContract[0].name_contract}</Text>
            </Row>
            <Col>
              <List style={styles.list}>
                {bill.map((item, i )=>
                  {
                  return <SwipeAccordion
                    func={()=>this.onOpenSwipe(i)}
                    indexOpen={this.state.key}
                    keyVal={i}
                    key={i}
                    navigation={navigation}
                    style={{backgroundColor: colors[i % colors.length]}}
                    component={<ItemComponent data={item} status={status}/>}
                    dataAccordion={item}
                    icon={<Icon style={styles.icon} name="information-circle" />}
                  />
                  console.log('item',item)
                }
              )}

              </List>
            </Col>
          </Grid>
        </Content>
        <FabButton
          navigation={navigation}
          onTap={()=>{navigation.navigate("Receipt", {contract: numContract[0]})}}
          >
          <Text style={{ borderRadius: 50, width: 42, height: 42, textAlign: 'center', fontSize: 30, color: '#fff'}}>+</Text>
        </FabButton>
        {(Platform.OS === 'ios')? <Footer navigation={navigation} bill={bill} detailContract={numContract}/> : null }
      </Container>
    )
  }
}

class ItemComponent extends Component{
  render(){
    const receipt = this.props.data
    const status = this.props.status
    const arrMonth = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    const splitRange = receipt.payday_limit.split('-',)
    const date = new Date(splitRange[0], splitRange[1], splitRange[2])
    const dateMonth = date.getMonth()
    const finalRange = new Date(new Date(date).setMonth(date.getMonth()+1))
    return(
      <View style={styles.ItemComponent.view}>
        <Left style={styles.ItemComponent.align}>
          <Text style={styles.listItem__body__text}>{arrMonth[dateMonth] + ' - ' + arrMonth[finalRange.getMonth()]}</Text>
        </Left>
        <Body style={styles.ItemComponent.align}>

        </Body>
        <Right style={styles.ItemComponent.align}>
          <Text style={styles.listItem__body__view__text,{}}>{receipt.current_reading}</Text>
          <Text style={styles.listItem__body__view__text,{}}>{status}</Text>
        </Right>
      </View>
    )
  }
}
const mapStateToProps = state => ({
  contracts: state.list_contracts.contracts,
});
export default connect(mapStateToProps)(DetailContract)
