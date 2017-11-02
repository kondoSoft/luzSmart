import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import { Col, Row, Grid } from 'react-native-easy-grid';
import styles from './styles';
import SwipeAccordion from '../listSwipe/swipe';
import FabButton from '../fabButton';
import { getRatePeriod, postReceipt } from '../../actions/contracts';
import { getContract } from '../../actions/list_states_mx';
import { getIVA, costProject } from '../../helpers';
import ExpandedView from '../expandedView';

var numContract = [];
var rateArr = [];
var finalRange;
var count_days;
var dateMonth;
var arrReceipts = [];
var limitReceipt;
var currentDate;
var firstDate;
var type_payment;
var consumoPromedio = 0;
var countKwh = 0;
var total;

class DetailUltimateContract extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: null,
      status: '',
      lastDayPeriod: '',
      current_reading: '',
      previous_reading: '',
      payday_limit: '',
      bill: undefined,
      contract: '',
      count_days: (props.contracts.length !== 0)? props.contracts[0].type_payment : '',

    };
    this.arrContracts
    this.getStatus = this.getStatus.bind(this);
  }
  // static navigationOptions = {
  //   title: 'Detail'
  // };

  componentWillMount () {
    this.arrContracts = []
    // this.props.getRatePeriod(this.state.contract.rate, this.props.token);
    const ultimateContract = this.props.screenProps.contracts.map((item, i) => {
        this.arrContracts.push(item)
    })
    if (this.arrContracts.length === 1) {
       this.setState({
        bill: this.arrContracts[0].receipt
       }, () => {
        this.props.getRatePeriod(this.props.screenProps.contracts[0].rate, this.props.token)
       })
    }
    // this.setState({
    //   bill: this.arrContracts[this.arrContracts.length-1].receipt
    // })
    // if(this.state.bill !== []){
    //   this.getStatus();
    // }

  }
  componentDidMount () {
    // se determina los meses que se agregaran a las fechas determinados por el tipo de pago(Mensual o Bimestral)
    let addMonth ;
    if(this.state.count_days == 'Bimestral'){
      addMonth = 2
    }
    else {
      addMonth = 1
    }

    if(this.state.bill != undefined) {
      this.getStatus();
      //Se obtiene las tarifas
      this.props.getRatePeriod(this.state.rate, this.props.token);
      this.state.bill.map((item, i) => {
        arrReceipts.push(item);
      });
    }

  };


  componentWillUnmount() {
    numContract = []
    statusArr = []
    consumoTotal = 0;
    consumoPromedio = 0;
    // kilowatt = []
    countKwh = 0;
  }

  getStatus() {
    // verificar esta variable count_days
    // if(this.state.count_days == 'Bimestral'){
    //   count_days = 60
    // }else{
    //   count_days = 30
    // }
    // var itemStatus = this.state.bill.map((item, i) => {
    //   const payday = item.payday_limit.replace(/-/g, '\/')
    //   limitReceipt = Date.parse(new Date(payday))
    //   currentDate = Date.now()
    //   firstDate = new Date(limitReceipt).setDate(new Date(limitReceipt).getDate() - count_days)
    //   if (currentDate >= firstDate && currentDate <= limitReceipt) {
    //     item.status = 'En proceso'
    //     item.finished = 'False'
    //     return item
    //   } else {
    //      item.status = 'Pagado'
    //      item.finished = 'True'
    //      return item
    //   }

    // })
    // return this.setState ({
    //   bill: itemStatus
    // })
  }
  // funcion para obtener los datos por costos y hacer operaciones logicas
  getCost(rate_period) {
    var verano = [];
    var noverano = [];
    var kilowatt = [];

    // empuje de datos en el arreglo de verano y fuera de verano
    rate_period.map((period, i) => {
      if(period.period_name == 'Verano') {
        verano.push(period)
        }
      else {
        noverano.push(period);
        }
      });
      // Se retorna que tipo de periodo es, dependiendo del recibo
      if(this.state.bill != undefined){
        this.state.bill.map((bill, i)=>{
          if(this.state.bill[i].period === 'Verano'){
            kilowatt = verano.map((rate, i)=>{
              const { kilowatt, cost } = rate;
              return { kilowatt, cost };
            });
          }
          else {
            kilowatt = noverano.map((rate, i)=>{
              const { kilowatt, cost } = rate;
              return { kilowatt, cost };
            })
          }
        })
      }
    return kilowatt;
  }
  componentWillReceiveProps(nextProps){
    this.getContract(nextProps)
    this.forceUpdate()
  }

  getContract(nextProps){
    nextProps.contracts.map((item, i) => {
      if(nextProps.valueContract === item.name_contract){
        this.setState({
          bill: item.receipt,
          count_days: item.type_payment,
          contract: item,
          rate: item.rate
        })
      }
    })
  }

  render(){
    const { navigation, rate_period } = this.props;
    const { status } = this.state;
    const bill = this.state.bill
    const colors = ['lightgrey','#fff'];
    let fab = <FabButton
          navigation={navigation}
          onTap={() => {navigation.navigate('Receipt', {contract: this.state.contract} )}}
        >
          <Text style={{ borderRadius: 50, width: 42, height: 42, textAlign: 'center', fontSize: 30, color: '#fff'}}>+</Text>
        </FabButton>
    // Obtener datos por Periodos
    return(
      <Container>
        <Content style={{backgroundColor: '#fff'}}>
        {
          (this.arrContracts.length === 1)?
            <Text style={{ backgroundColor: 'grey', height: 30, textAlign: 'center', padding: 2, color: '#FFF' }}>{this.arrContracts[0].name_contract}</Text>
          : <ExpandedView contracts={this.props.screenProps} rate={this.state.contract.rate}/>
        }
          <Grid>

              {/* <Text style={styles.detailContract__row__top__text}>{this.arrContracts[0].name_contract}</Text> */}
            <Col>
              <List style={styles.list}>
                {(bill != undefined) && bill.map((item, i )=>
                  {
                  return <SwipeAccordion
                    indexOpen={this.state.key}
                    keyVal={i}
                    key={i}
                    navigation={navigation}
                    style={{backgroundColor: colors[i % colors.length]}}
                    component={<ItemComponent data={item} status={status} ratePeriod={(rate_period) && this.getCost(rate_period)} consumoPromedio={costProject} typePayment={this.state.count_days} />}
                    dataAccordionContract={this.state.contract}
                    dataAccordion={item}
                    icon={<Icon style={{paddingTop: (navigation.state.routeName === 'DetailContract')? 5 : 15,color: 'steelblue',fontSize:40,textAlign:'center'}} name="information-circle" />}
                  />
                  }
                )}
              </List>
            </Col>
          </Grid>
        </Content>
        { fab }
      </Container>
    )
  }
}

class ItemComponent extends Component{

  getMonthOfTypePayment(){
    let addMonth ;
    if(this.props.typePayment == 'Bimestral'){
      addMonth = 2
    }
    else {
      addMonth = 1
    }
    return addMonth
  }

  render() {
    // Cantidad de meses por tipo de pago
    const countMonth = this.getMonthOfTypePayment()
    const receipt = this.props.data;
    // Cantidad de KwH consumidos
    countKwh = receipt.current_reading - receipt.previous_reading
    // Subtotal y Total
    const subTotal = this.props.consumoPromedio(this.props.ratePeriod, countKwh)
    total = getIVA(subTotal)
    const arrMonth = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    const splitRange = receipt.payday_limit.split('-',)
    const date = new Date(receipt.payday_limit.replace(/-/g, '\/'))
    // Periodo inicial dependiendo la fecha limite de pago, calculando los dias de inicio del recibo
    const initialPeriod = new Date(date.setDate(new Date(date).getDate()))
    dateMonth = initialPeriod.getMonth()-countMonth
    finalRange = new Date(new Date(date).setMonth(date.getMonth()+countMonth))
    return(
      <View style={styles.ItemComponent.view}>
        <Left style={styles.ItemComponent.align}>
          <Text style={styles.listItem__body__text}>{arrMonth[dateMonth] + ' - ' + arrMonth[finalRange.getMonth()-countMonth]}</Text>
        </Left>
        <Body style={styles.ItemComponent.align}>

        </Body>
        <Right style={styles.ItemComponent.align}>
          <Text style={styles.listItem__body__view__text,{}}>{ (total != undefined) && `$`+total.toLocaleString() }</Text>
          <Text style={styles.listItem__body__view__text,{}}>{receipt.status}</Text>
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
  valueContract: state.list_contracts.pickerContract,
  token: state.user.token,
  rate_period: state.list_rate.rate_period,
})
export default connect(mapStateToProps, bindAction)(DetailUltimateContract);
