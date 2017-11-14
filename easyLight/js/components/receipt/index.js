import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Container,
  // View,
  Text,
  Form,
  Item,
  Label,
  Input,
  Icon,
} from 'native-base';
import {
  // TouchableOpacity,
  AlertIOS,
  Platform,
  Alert,
  ScrollView,
  Keyboard,
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
// import { Select, Option } from 'react-native-select-list';
import styles from './styles';
import { postReceipt, postRecord, postProjectReceipt, patchNewReceipt } from '../../actions/contracts';
import ReceiptPickerDate from '../datePicker/receipt';
import { getContract } from "../../actions/list_states_mx";
import { putRecord, postHistory } from "../../actions/contracts";
import { getWeekday, setRecord as helperRecord, funcHighConsumptionPeriod } from "../../helpers"
var moment = require('moment');
var contract;

class Receipt extends Component {
  constructor(props){
    super(props)
      this.state = {
        payday_limit: '',
        amount_payable: 0,
        current_reading: 0,
        previous_reading: 0,
        array_contract: [],
        amount_payable_ui: '',
        current_reading_ui: 0,
        previous_reading_ui: 0,
        period: '',
        status: false,
        record: {

        }
      }
      this._keyboardDidHide = this._keyboardDidHide.bind(this)
      this.handlePaydayLimit = this.handlePaydayLimit.bind(this)
    }

  static navigationOptions = ({ navigation, screenProps }) => (
  {
    // headerRight: (navigation.state.params) && <Button transparent onPress={() => navigation.navigate('Medicion', { contract: navigation.state.params.contract})}><Icon active style={{'color': 'white', fontSize: 35}} name="ios-arrow-forward"/></Button>,
    headerLeft: <Button transparent onPress={() => navigation.goBack()}><Icon active style={{'color': 'white', fontSize: 35}} name="ios-arrow-back"/></Button>,

  });
  componentWillMount () {
   this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
   if (this.props.navigation.state.params !== undefined) {
     this.setState({array_contract: this.props.navigation.state.params.contract})
     // this.props.getHighConsumption(this.props.navigation.state.params.contract.municipality.region.id,this.props.screenProps.token)
   }
  }
  componentWillReceiveProps(nextProps){
    if(this.props.navigation.state.params === undefined){
      this.setState({array_contract: nextProps.newContract})
    }

    this.setState({
      highConsumption: this.props.highConsumption,
    })
  }
  componentWillUnmount () {
    this.keyboardDidHideListener.remove();
  }
  _keyboardDidHide () {
    this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 0 : 0})
  }
  handlePaydayLimit(date){
    const initialDateRange = new Date(contract.initialDateRange).getTime();
    const finalDateRange = new Date(contract.finalDateRange).getTime();
    const limitReceipt = new Date(date).getTime();
    if (limitReceipt >= initialDateRange && limitReceipt <= finalDateRange){
      this.setState({
        period: 'Verano',
      });
    }
    else {
      this.setState({
        period: 'NoVerano',
      });
    }
    if (date === '') {

    }
    else {
      this.setState({
        payday_limit: date
      })
    }
  }
  handleAmountPayable(text){
    this.setState({
      amount_payable: text,
      amount_payable_ui: text,
    });
  }
  handleCurrentReading(event){
    this.setState({
      current_reading: event.nativeEvent.text,
      current_reading_ui: event.nativeEvent.text,
    });
  }
  handlePreviousReading(event){
    this.setState({
      previous_reading: event.nativeEvent.text,
      previous_reading_ui: event.nativeEvent.text,
    });
  }
  sendDataHisoty(){
    const arrMonth = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    const setPayday_limit = moment(this.state.payday_limit)
    const monthPayday_Limit = setPayday_limit.month()
    const yearPayday_Limit = setPayday_limit.year()
    this.setState({
      postHistory: {
        contract_id: this.state.array_contract.id,
        period_name: arrMonth[monthPayday_Limit] + ' ' + yearPayday_Limit,
        kilowatt: this.state.current_reading,
        cost: this.state.amount_payable,
      }
    }, () => {
       this.props.postHistory(this.state.postHistory, this.props.screenProps.token)
    // this.props.getContract(this.props.screenProps.token, this.props.navigation)
    // this.props.navigation.navigate('History')
    })

  }
  showAlert(){
    if (Platform.OS === 'ios') {
      AlertIOS.alert(
        'Contrato',
       'Desea agregar un historial al contrato Mi Casa?',
       [
         {text: 'No', onPress: () => this.props.navigation.navigate('Contracts', this.props.getContract(this.props.screenProps.token, this.props.navigation))},
         {text: 'Si', onPress: () => this.sendDataHisoty()},
       ],
      );
    }
    else {
      Alert.alert(
        'Contrato',
        'Desea agregar un historial al contrato Mi Casa?',
        [
          { text: 'No', onPress: () => this.props.navigation.navigate('Contracts', this.props.getContract(this.props.screenProps.token, this.props.navigation)) },
          { text: 'Si', onPress: () => this.sendDataHisoty() },
        ],
      );
    }
  }
  // Record
  setRecord(){
    //Fecha inicial del recibo
    const paydayLimit = this.state.payday_limit
    //Dia de la semana
    const weekday = getWeekday(paydayLimit)
    // Consumo diario
    const { current_reading, previous_reading} = this.state
    this.setState({
      record:{
        contract_id: this.state.array_contract.id,
        date: paydayLimit,
        datetime: paydayLimit+'T12:00:00Z',
        day: weekday,
        daily_reading: current_reading,
        hours_elapsed: 0,
        hours_totals: 0,
        days_elapsed: 0,
        days_totals: 0,
        daily_consumption: 0,
        cumulative_consumption: current_reading - previous_reading,
        projected_payment: this.state.amount_payable,
        amount_payable: this.state.amount_payable,
        average_global: 0,
        rest_day: 0,
        projection: 0,
        status: true,


      }
    })
  }
  getRate(receipt){
  var verano = [];
  var noverano = [];
  var kilowatt = [];
  // empuje de datos en el arreglo de verano y fuera de verano
  this.props.rate_period.map((period, i) => {
    if(period.period_name === 'Verano') {
      verano.push(period)
      }
    else {
      noverano.push(period);
      }
    });
    // Se retorna que tipo de periodo es, dependiendo del recibo
    if(receipt != undefined){
      if(receipt.period == 'Verano'){
        return kilowatt = verano.map((rate, i)=>{
          const { kilowatt, cost } = rate;
          return { kilowatt, cost };
        });
      }
      else {
        return kilowatt = noverano.map((rate, i)=>{
          const { kilowatt, cost } = rate;
          return { kilowatt, cost };
        })
      }
    }
    this.setState({
      rate_period_state: kilowatt
    })
  }
  setRecordState(receipt) {
    const ratePeriod = this.getRate(receipt)
    const lastRecord = this.props.record[this.props.record.length - 1]
    const data = {
      contract_id: this.state.array_contract.id,
      lastRecord: lastRecord,
      itemReceipt: receipt,
      type_payment: contract.type_payment,
      current_data: this.state.current_reading,
    }

    const record = helperRecord(data)
    this.setState({
      record,
      ratePeriod: ratePeriod,
      status: true,

    })
  }
  sendData(contract) {
    const { navigation } = this.props
    const receipt  = contract.receipt
    if (this.dataValidate(this.state)) {
      // se agrega estatus y despues se hace un post
      this.setState({
        status: true
      },() => {
        if(receipt.length > 0){
          new Promise((resolve, reject) => {
            this.setRecordState(receipt[0])
            resolve(true)
          })
          .then((result)=>{
            this.props.patchNewReceipt(this.state, receipt[0].id, this.props.screenProps.token, navigation)
            this.props.putRecord(this.state, this.props.screenProps.token)
          })
        }
        else {
          var RecordPromise = new Promise((resolve, reject) => {
            this.setRecord()
            resolve(true)
          })
          RecordPromise.then((result) => {
            this.props.postReceipt(this.state, this.props.screenProps.token)
            this.props.postRecord(this.state, this.props.screenProps.token)
          })
        }
      }
    )


      //Condicion para show alert en caso de historial ya registrado.
      this.showAlert();
    }
    else {
      Alert.alert(
        'Datos incompletos',
        'Todos los campos son obligatorios',
        [
          { text: 'Aceptar' },
        ],
      );
    }

  }

  dataValidate(data) {
    const {
      amount_payable,
      payday_limit,
      current_reading,
      previous_reading,
    } = data;
    if (amount_payable &&
        payday_limit &&
        current_reading &&
        previous_reading
    ) {
      return true
    }
    else {
      return false
    }
  }
  render() {
    const { navigation } = this.props;
    // const { bill } = navigation.state.params
    // var lastBill
    if (navigation.state.params === undefined) {
      contract = this.props.newContract;
    }
    else {
      contract = navigation.state.params.contract;
    }

    // if(bill.length >= 0) {
    //   lastBill = bill[bill.length-1]
    // }
    var receiptView = (
      <Container>
        <ScrollView
          ref='scroll'
          style={{ backgroundColor: '#fff' }}
        >
          <Grid style={styles.grid}>
            <Col size={75}>
              <Form style={styles.form}>
                <Item inlineLabel last style={styles.form__item__title}>
                  <Label style={styles.form__item__label}>Contrato #{contract.number_contract}</Label>
                </Item>
                <Item last style={styles.form__item__datepicker}>
                  <ReceiptPickerDate func={this.handlePaydayLimit}/>
                </Item>
                <Item last style={styles.form__item__inputs}>
                  <Input
                    placeholder="Monto a Pagar"
                    onChangeText={text => this.handleAmountPayable(text)}
                    onBlur={()=> {
                      this.setState({
                        amount_payable_ui:  parseInt(this.state.amount_payable).toLocaleString(undefined,{ style: 'currency',currency:'MXN' })
                      })
                    }}
                    value={this.state.amount_payable_ui}
                    onFocus={() => {
                      this.refs['scroll'].scrollTo({y: 0 })
                      this.setState({
                        amount_payable_ui: this.state.amount_payable
                      })
                  }}
                  />
                </Item>
                <Item last style={styles.form__item__title}>
                  <Label style={styles.form__item__label}>Medición de Consumo</Label>
                </Item>
                <Item last style={styles.form__item__inputs}>
                  <Input
                    placeholder="Lectura Actual"
                    onChange={event => this.handleCurrentReading(event)}
                    onBlur={()=>{
                      this.setState({
                        current_reading_ui: parseInt(this.state.current_reading).toLocaleString()
                      })
                    }}
                    value={this.state.current_reading_ui}
                    onFocus={() => {
                      this.refs['scroll'].scrollTo({y: 140})
                      this.setState({
                        current_reading_ui: this.state.current_reading
                      })
                    }}
                  />
                  <Text style={{fontSize:16,paddingRight:5,color:'grey'}}>kWh</Text>
                </Item>
                <Item last style={styles.form__item__inputs}>
                  <Input
                    placeholder="Lectura Anterior"
                    onChange={event => this.handlePreviousReading(event)}
                    onBlur={()=>{
                      this.setState({
                        previous_reading_ui: parseInt(this.state.previous_reading).toLocaleString()
                      })
                    }}
                    value={this.state.previous_reading_ui}
                    onFocus={() => {
                      this.refs['scroll'].scrollTo({y: 180})
                      this.setState({
                        previous_reading_ui: this.state.previous_reading
                      })
                    }}
                  />
                  <Text style={{fontSize:16,paddingRight:5,color:'grey'}}>kWh</Text>
                </Item>
              </Form>
            </Col>
            <Col size={25} style={styles.col__bottom}>
              <Row style={styles.col__bottom__row__bottom}>
                <Button
                  style={{ height: 35}}
                  onPress={()=>this.sendData(contract)}
                  >
                  <Text>Agregar</Text>
                </Button>
              </Row>
            </Col>
          </Grid>
        </ScrollView>
      </Container>
    )
    // iOS
    if (Platform.OS === 'ios') {
      var receiptView = (
        <Container>
          <ScrollView
            ref='scroll'
            style={{backgroundColor: '#fff'}}
            >
            <Grid style={styles.grid}>
              <Col size={65}>
                <Form style={styles.form}>
                  <Item inlineLabel last style={styles.form__item__title}>
                    <Label style={styles.form__item__label}>Contrato #{contract.number_contract}</Label>
                  </Item>
                  <Item last style={styles.form__item__datepicker}>
                    <ReceiptPickerDate func={this.handlePaydayLimit}/>
                  </Item>
                  <Item last style={styles.form__item__inputs}>
                    <Input
                      ref='monto'
                      keyboardType={'numeric'}
                      placeholder="Monto a Pagar"
                      onChangeText={text => this.handleAmountPayable(text)}
                      onBlur={()=> {
                        this.setState({
                            amount_payable_ui:(this.state.amount_payable.length > 0)? parseInt(this.state.amount_payable).toLocaleString('es-MX',{ style: 'currency',currency:'MXN' }):''
                        })
                      }}
                      value={this.state.amount_payable_ui}
                      onFocus={() => {
                        this.refs['scroll'].scrollTo({y: 0 })
                        this.setState({
                          amount_payable_ui: this.state.amount_payable
                        })
                    }}
                    />
                  </Item>
                  <Item last style={styles.form__item__title}>
                    <Label style={styles.form__item__label}>Medición de Consumo</Label>
                  </Item>
                  <Item last style={styles.form__item__inputs}>
                    <Input
                      keyboardType={'numeric'}
                      placeholder="Lectura Actual"
                      onChange={event => this.handleCurrentReading(event)}
                      onBlur={()=>{
                        this.setState({
                          current_reading_ui: (this.state.current_reading.length > 0)? parseInt(this.state.current_reading).toLocaleString('es-MX') : ''
                        })
                      }}
                      value={this.state.current_reading_ui}
                      onFocus={() => {
                        this.refs['scroll'].scrollTo({y: 40})
                        this.setState({
                          current_reading_ui: this.state.current_reading
                        })
                      }}
                    />
                    <Text style={{fontSize:16,paddingRight:5,color:'grey'}}>kWh</Text>
                  </Item>
                  <Item last style={styles.form__item__inputs}>
                    <Input
                      keyboardType={'numeric'}
                      returnKeyType={'go'}
                      placeholder="Lectura Anterior"
                      onChange={event => this.handlePreviousReading(event)}
                      onBlur={()=>{
                        this.setState({
                          previous_reading_ui:(this.state.previous_reading.length > 0)? parseInt(this.state.previous_reading).toLocaleString('es-MX'):''
                        })
                      }}
                      value={this.state.previous_reading_ui}
                      onFocus={() => {
                        this.refs['scroll'].scrollTo({y: 80})
                        this.setState({
                          previous_reading_ui: this.state.previous_reading
                        })
                      }}
                    />
                    <Text style={{fontSize:16,paddingRight:5,color:'grey'}}>kWh</Text>
                  </Item>
                </Form>
              </Col>
              <Col size={10} style={styles.col__bottom}>
                <Row style={styles.col__bottom__row__bottom}>
                  <Button
                    style={{ height: 35}}
                    onPress={()=>this.sendData(contract)}
                    >
                    <Text>Agregar</Text>
                  </Button>
                </Row>
              </Col>
            </Grid>
          </ScrollView>
        </Container>
      )
    }
    return receiptView;
  }
}
function bindAction(dispatch) {
  return {
    postReceipt: (list, token) => dispatch(postReceipt(list, token)),
    postRecord: (data, token) => dispatch(postRecord(data, token)),
    postProjectReceipt: (list, token) => dispatch(postProjectReceipt(list, token)),
    getContract: (token, navigation) => dispatch(getContract(token, navigation)),
    patchNewReceipt: (data, id, token, navigation) => dispatch(patchNewReceipt(data, id, token, navigation)),
    putRecord: (data, token) => dispatch(putRecord(data, token)),
    postHistory: (list, token) => dispatch(postHistory(list, token)),

  };
}
const mapStateToProps = state => ({
  newContract: state.list_contracts.newContract,
  rate_period: state.list_rate.rate_period,
  record: state.list_records.results,
});

export default connect(mapStateToProps, bindAction)(Receipt);
