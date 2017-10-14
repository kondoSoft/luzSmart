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
  Button,
} from 'native-base';
import {
  View,
  Platform,
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import { Col, Row, Grid } from 'react-native-easy-grid';
// import Header from '../header/index';
// import Footer from '../footer/index';
import styles from './styles';
import SwipeAccordion from '../listSwipe/swipe';
import FabButton from '../fabButton';
import { getRatePeriod, postReceipt, getRecord, resetRecord } from '../../actions/contracts';
import { getContract } from '../../actions/list_states_mx';
import { getIVA, costProject } from '../../helpers';

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
var that

class DetailContract extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: null,
      status: '',
      lastDayPeriod: '',
      current_reading: '',
      contract_id: '',
      previous_reading: '',
      payday_limit: '',
      count_days: props.contracts[0].type_payment,
      bill: props.navigation.state.params.receipt,
      onlyOneBill: props.navigation.state.params.receipt.length,
      contract: '',

    };
    this.getStatus = this.getStatus.bind(this);
    this.returnScreen = this.returnScreen.bind(this)
    that = this
  }

  static navigationOptions = ({ navigation, screenProps }) => (
  {
    headerRight: (navigation.state.params.contract.receipt.length >= 1) && <Button transparent onPress={() => navigation.navigate('Medicion', { contract: navigation.state.params.contract, receipt: navigation.state.params.receipt[0]})}><Icon active style={{'color': 'white', fontSize: 35}} name="ios-arrow-forward"/></Button>,
    headerLeft: <Button transparent onPress={() => that.__proto__.returnScreen()}><Icon active style={{'color': 'white', fontSize: 35}} name="ios-arrow-back"/></Button>
  });
  returnScreen() {
    that.props.resetRecord()
    that.props.navigation.goBack()
  }
  componentWillMount() {
    this.setState({
      contract: this.props.navigation.state.params.contract,
    },() => {
      this.props.getRatePeriod(this.state.contract.rate, this.props.screenProps.token)
      this.props.getRecord(this.state.contract.id)
    })
    this.getContractsId();
  }
  componentDidMount() {
    // se determina los meses que se agregaran a las fechas determinados por el tipo de pago(Mensual o Bimestral)
    let addMonth ;
    if(this.state.count_days == 'Bimestral'){
      addMonth = 2
    }
    else {
      addMonth = 1
    }

    if(this.state.bill.length > 0) {
      this.getStatus();
      //Se obtiene las tarifas
      this.props.getRatePeriod(numContract[0].rate, this.props.screenProps.token);
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
  }

  getStatus() {
    if(this.state.count_days == 'Bimestral'){
      count_days = 60
    }else{
      count_days = 30
    }
  }
  getContractsId() {
    const contract = this.props.contracts.map((item,i)=>{
      if (item.id == this.props.navigation.state.params.index){
        return numContract.push(item)
      }
    })
  }
  // funcion para obtener los datos por costos y hacer operaciones logicas
  getCost(rate_period) {
    var verano = [];
    var noverano = [];
    var kilowatt = [];
    // empuje de datos en el arreglo de verano y fuera de verano
    rate_period.map((period, i) => {
      if(period.period_name === 'Verano') {
        verano.push(period)
        }
      else {
        noverano.push(period);
        }
      });
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

  render(){
    const { navigation, rate_period, contracts } = this.props;
    const { status } = this.state;
    const bill = this.state.bill;
    const colors = ['lightgrey','#fff'];
    let fab = <FabButton
          navigation={navigation}
          onTap={() => {navigation.navigate('Receipt',{ contract: this.state.contract})}}
        >
          <Text style={{ borderRadius: 50, width: 42, height: 42, textAlign: 'center', fontSize: 30, color: '#fff'}}>+</Text>
        </FabButton>
    // Obtener datos por Periodos
    return(
      <Container>
        <Content style={{backgroundColor: '#fff'}}>
          <Grid>
            <Row style={styles.detailContract__row__top}>
              <Text style={styles.detailContract__row__top__text}>{this.props.navigation.state.params.contract.name_contract}</Text>
            </Row>
            <Col>
              <List style={styles.list}>
               {bill.map((item, i )=>
                  {
                  return <SwipeAccordion
                    indexOpen={this.state.key}
                    keyVal={i}
                    key={i}
                    navigation={navigation}
                    style={{backgroundColor: colors[i % colors.length]}}
                    component={<ItemComponent data={item} status={status} ratePeriod={(rate_period) && this.getCost(rate_period)} record={this.props.records.reverse()[i]} consumoPromedio={costProject} countsReceipts={this.state.onlyOneBill}/>}
                    // component={<ItemComponent data={item} status={status} ratePeriodCost={rate_period} consumoPromedio={costProject}/>}
                    dataAccordionContract={this.state.contract}
                    // dataAccordionContract={this.props.navigation.state.params.contract}
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

  constructor(props){
    super(props);
    this.state = {
      amount_payable: 0,
      projected_payment: 0,
    }
    // this.getCost = this.getCost.bind(this)
  }

  componentWillReceiveProps(nextProps){

    if(nextProps.data){

      this.setState({
        amount_payable: nextProps.data.amount_payable, 
      })
    }
    if(nextProps.record){
      this.setState({
        projected_payment: nextProps.record.projected_payment,
      })
    }
  }

  render() {
    // Declaracion de recibo
    const receipt = this.props.data;
    // Declaracion de KwH proyectado
    const { amount_payable } = this.state

    const arrMonth = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    const splitRange = receipt.payday_limit.split('-',)
    const date = new Date(receipt.payday_limit.replace(/-/g, '\/'))
    // Periodo inicial dependiendo la fecha limite de pago, calculando los dias de inicio del recibo
    const initialPeriod = new Date(date.setDate(new Date(date).getDate() - count_days))
    dateMonth = initialPeriod.getMonth()
    finalRange = new Date(new Date(date).setMonth(date.getMonth()+2))
    return(
      <View style={styles.ItemComponent.view}>
        <Left style={styles.ItemComponent.align}>
           <Text style={styles.listItem__body__text}>{(receipt.status) ? arrMonth[dateMonth] + ' - ' + arrMonth[finalRange.getMonth()] : arrMonth[finalRange.getMonth()]}</Text>
        </Left>
        <Body style={styles.ItemComponent.align}>

        </Body>
        <Right style={styles.ItemComponent.align}>
          <Text style={styles.listItem__body__view__text,{}}>{(receipt.status) ? `$`+ amount_payable : (this.state.projected_payment)? `$ ${parseFloat(this.state.projected_payment).toLocaleString()}` : '$0'}</Text>
          {/* <Text style={styles.listItem__body__view__text,{}}>{(this.props.countsReceipts <= 2) ? <Text style={styles.listItem__body__text}>{`$`+totalAccount.toLocaleString()}</Text> : (total != undefined) && `$`+total.toLocaleString() }</Text> */}
          <Text style={styles.listItem__body__view__text,{}}>{(receipt.status) ? 'Pagado' : 'Proyectado'}</Text>
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
    getRecord: contract_id => dispatch(getRecord(contract_id)),
    resetRecord: () => dispatch(resetRecord())
  }
}

const mapStateToProps = state => ({
  contracts: state.list_contracts.contracts,
  rate_period: state.list_rate.rate_period,
  records: state.list_records.results,
})
export default connect(mapStateToProps, bindAction)(DetailContract);
