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
import {getRatePeriod, postReceipt} from '../../actions/contracts'
import { getContract } from '../../actions/list_states_mx'

var numContract = []
var rateArr = []
var finalRange
var arrReceipts = []
var limitReceipt;
var currentDate;
var firstDate;
var type_payment;
var count_days;
class DetailContract extends Component {
  constructor(props){
    super(props)

    this.state = {
      key: null,
      status: '',
      lastDayPeriod: '',
      current_reading: '',
      contract_id: '',
      previous_reading: '',
      payday_limit: '',
    }
    this.onOpenSwipe = this.onOpenSwipe.bind(this)
    this.getStatus = this.getStatus.bind(this)
  }
  static navigationOptions = {
    header: null
  };
  static propType = {
    getRatePeriod: React.PropTypes.func,
    postReceipt: React.PropTypes.func,
  }
  componentDidMount(){
    this.getContractsId()

    if(numContract[0].receipt.length != []){
      this.getStatus()
      this.props.getRatePeriod(numContract[0].rate, this.props.token)
      numContract[0].receipt.map((item,i)=>{
        arrReceipts.push(item)
      })
      const lastReceipt = arrReceipts[arrReceipts.length-1]
      const lastDayLastReceipt = new Date(lastReceipt.payday_limit.replace(/-/g,'\/'))
      const finalLastDay = new Date(new Date(lastDayLastReceipt).setDate(lastDayLastReceipt.getDate()-76)).getTime()
      const currentDate = Date.now()
      const nextPay = new Date(lastDayLastReceipt.setMonth(lastDayLastReceipt.getMonth()+2))
      const year = nextPay.getFullYear()
      const month = nextPay.getMonth() + 1
      const day = nextPay.getDate()
      const nextPayDay = year + '-' + ((''+ month).length < 2 ? '0' : '') + month + '-' + (('' + day).length < 2 ? '0' : '') + day
      if (currentDate >= finalLastDay) {
        this.setState({
            current_reading: lastReceipt.current_reading + lastReceipt.current_data,
            previous_reading: lastReceipt.current_reading + lastReceipt.current_data,
            payday_limit: nextPayDay,
            contract_id: numContract[0].id
        })
        // },()=>this.props.postReceipt(this.state,this.props.token))

      }

    }


    // this.props.getContract(this.props.token)
  }
  componentWillReceiveProps(nextProps){
    type_payment = nextProps.contracts[0].type_payment
    if(type_payment == 'Bimestral'){
      count_days = 60
    }else{
      count_days = 30
    }
    this.getCost(nextProps)
  }
  componentWillUnmount(){
    numContract = []
    statusArr = []

  }


  onOpenSwipe(i){
    this.setState({
      key: i,
    })
  }
  getStatus(){

    numContract[0].receipt.map((item, i) => {
      const payday = item.payday_limit.replace(/-/g, '\/')
      limitReceipt = Date.parse(new Date(payday))
      currentDate = Date.now()
      firstDate = new Date(limitReceipt).setDate(new Date(limitReceipt).getDate() - count_days)
      if (currentDate >= firstDate && currentDate <= limitReceipt) {
        this.setState({
          status: 'En proceso'
        })
      }else {
        this.setState({
          status: 'Pagado'
        })
      }
    })
  }
  getContractsId(){
    const contract = this.props.contracts.map((item,i)=>{
      if (item.id == this.props.navigation.state.params.index){
        numContract.push(item)
      }
    })

  }
  getCost(nextProps){
    var verano = [];
    var noverano = [];
    var khw_current;
    var totalRate;
    var kilowatt = []
    nextProps.rate_period.map((period, i)=>{
      if(period.period_name == 'Verano'){
        verano.push(period)
      }else{
        noverano.push(period)
      }
    })
    console.log(arrReceipts[0].period);
    if(arrReceipts[0].period == 'Verano'){
      khw_current = arrReceipts[0].current_reading - arrReceipts[0].previous_reading
      verano.map((rate, i)=>{
        kilowatt.push(verano[i].kilowatt)

      })
      totalRate = kilowatt.reduce((a,b)=>{return a+b})
      console.log(totalRate);
      console.log('Verano',verano);
    }else {
      console.log('NoVerano',noverano);
    }
  }



  render(){

    const { navigation, rate_period } = this.props
    const { status } = this.state
    const bill = navigation.state.params.receipt
    const colors = ['lightgrey','#fff']
    // Obtener datos por Periodos

    return(
      <Container>
        <Header navigation={navigation} title="Periodos"/>
        {(Platform.OS === 'android')? <Footer navigation={navigation}/> : null}
        <Content style={{backgroundColor: '#fff'}}>
          <Grid>
            <Row style={styles.detailContract__row__top}>
              <Text style={styles.detailContract__row__top__text}>{this.props.contracts[0].name_contract}</Text>
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
                    icon={<Icon style={{paddingTop: (navigation.state.routeName === 'DetailContract')? 5 : 15,color: 'steelblue',fontSize:40,textAlign:'center'}} name="information-circle" />}
                  />
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
    const date = new Date(receipt.payday_limit.replace(/-/g, '\/'))
    // Periodo inicial dependiendo la fecha limite de pago, calculando los dias de inicio del recibo
    const initialPeriod = new Date(date.setDate(new Date(date).getDate() - count_days))
    const dateMonth = initialPeriod.getMonth()
    finalRange = new Date(new Date(date).setMonth(date.getMonth()+2))
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
function bindAction(dispatch){
  return {
    getRatePeriod: (rate, token) => dispatch(getRatePeriod(rate, token)),
    postReceipt: (list, token) => dispatch(postReceipt(list, token)),
    getContract: token => dispatch(getContract(token)),
  }
}

const mapStateToProps = state => ({
  contracts: state.list_contracts.contracts,
  token: state.user.token,
  rate_period: state.list_rate.rate_period
})
export default connect(mapStateToProps, bindAction)(DetailContract)
