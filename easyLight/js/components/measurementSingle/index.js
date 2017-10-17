import React, { Component } from 'react';
import {connect} from 'react-redux'
import {
  Container,
  Content,
  List,
  ListItem,
  View,
  Body,
  Text,
  Picker,
  Fab,
  Icon,
  Button,
  Input,
} from 'native-base';
import { Image, TextInput, Platform, ScrollView, Dimensions, Keyboard, AlertIOS } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Select, Option } from 'react-native-select-list';
import styles from './styles';
import AnimatedView from '../animatedView/index';
import FabButton from '../fabButton';
import { patchReceipt, getRatePeriod, postRecord, getRecord } from '../../actions/contracts'
import { 
  getRangeMonth,
  setRecord,
} from '../../helpers';


let Screen = Dimensions.get('window')

var arrayContract = []
class MeasurementSingle extends Component {
  constructor(props){
    super(props)

    this.state = {
      active: false,
      scroll: false,
      id_contract: null,
      id_receipt: null,
      current_data: '',
      itemReceipt: {
        previous_reading: 0,
        current_data: 0,
        payday_limit: '',
      },
      kwhValidation: 'KWh',
      record: {

      },
      projected_payment: 0,
    }
    this.contract_id;
    this.subTotal;
    this.total;
    this.rate_contract;
    this.propsNextRecords;
    this._keyboardDidHide = this._keyboardDidHide.bind(this)
    this.changeCheckedData = this.changeCheckedData.bind(this)
  }
  static navigationOptions = ({ navigation, screenProps }) => (
  {
    headerLeft: <Button transparent onPress={() => navigation.goBack()}><Icon active style={{'color': 'white'}} name="arrow-back"/></Button>,
    headerRight: <Button transparent onPress={() => navigation.navigate('Contratos')}><Icon active style={{'color': 'white'}} name="home"/></Button>,
  });

  componentWillMount () {
    this.setState({
      itemReceipt: this.props.navigation.state.params.receipt,
    })
    this.rate_contract = this.props.navigation.state.params.contract.rate
    this.contract_id = this.props.navigation.state.params.contract.id
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    this.props.getRecord(this.contract_id)
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps.record)
    nextProps.record.map((item,i) => {
      if(i === nextProps.record.length-1){
        this.setState({
          projected_payment: item.projected_payment
        })
      }
    })

    nextProps.screenProps.contracts.map((item, i) => {
      if(item.receipt.length != 0 || nextProps.screenProps.contracts.length === 1){
        arrayContract.push(item)
      }
    })
    if (arrayContract.length === 1) {
      this.setReceiptByOneContract(arrayContract[0])
    }
    if(this.contract_id != undefined){
      if (this.props.screenProps.contracts === 1) {
        let filItemID = nextProps.screenProps.contracts.filter((item,i)=>{
              return item.id === this.contract_id;
            })
        let prevCurrentReading = this.state.itemReceipt.current_reading_updated;
        let nextCurrentReading = filItemID[0].receipt[0].current_reading_updated;
        if (nextCurrentReading > prevCurrentReading) {
          this.setState({
            type_payment: arrayContract[0].type_payment,
            itemReceipt:{
              id: this.state.itemReceipt.id,
              previous_reading: this.state.itemReceipt.previous_reading,
              current_reading: this.state.itemReceipt.current_reading,
              current_reading_updated: nextCurrentReading,
              payday_limit: this.state.itemReceipt.payday_limit,
              period: this.state.itemReceipt.period,
              amount_payable: this.state.itemReceipt.amount_payable,
            },
            type_payment: arrayContract[0].type_payment,
          })
        }
      }else {
        let filItemID = nextProps.screenProps.contracts.filter((item,i)=>{
              return item.id === this.contract_id;
            })
        let prevCurrentReading = this.state.itemReceipt.current_reading_updated;
        let nextCurrentReading = filItemID[0].receipt[0].current_reading_updated;
        if (nextCurrentReading > prevCurrentReading) {
          this.setState({
            type_payment: arrayContract[0].type_payment,
            itemReceipt:{
              id: this.state.itemReceipt.id,
              previous_reading: this.state.itemReceipt.previous_reading,
              current_reading: this.state.itemReceipt.current_reading,
              current_reading_updated: nextCurrentReading,
              payday_limit: this.state.itemReceipt.payday_limit,
              period: this.state.itemReceipt.period,
              amount_payable: this.state.itemReceipt.amount_payable,
            },
            
          })
        }
      }
    }
  }
  setReceiptByOneContract(contract){
    this.setState({
      type_payment: arrayContract[0].type_payment,
      itemReceipt: contract.receipt[0],
    })
  }
  componentWillUnmount () {
    this.keyboardDidHideListener.remove();
  }
  _keyboardDidHide () {
    this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 0 : 0})
  }
  changeCheckedData(){
    setTimeout( ()=> {
      this.setState({
        kwhValidation: 'KWh'
      })
    },1000);
    this.setState({
      current_data: '',
    })
  }
  // *******************  Funciones para RECORDS ********************
  setRecordState(){
    const ratePeriod = this.getRate()
    // Obtiene el ultimo dato actualizado
    const lastRecord = this.propsNextRecords[this.propsNextRecords.length-1]
    // Se obtiene de nuevo Record
    this.props.getRecord(this.contract_id)
    const data = {
      contract_id: this.contract_id,
      lastRecord: lastRecord,
      itemReceipt: this.state.itemReceipt,
      type_payment: arrayContract[0].type_payment,
      current_data: this.state.current_data,
      ratePeriod: ratePeriod,
    }
    const record = setRecord(data)
    this.setState({
      record
    })
  }

  getPropsByNextRecords(props){
    this.propsNextRecords = props

  }

  // *********************************************************

  setRatePeriod(contract){
    this.rate_contract = contract.rate
    this.props.getRatePeriod(this.rate_contract, this.props.token)
  }

  sendCurrentData(id){
    if (this.state.current_data != '' && this.state.current_data > this.state.itemReceipt.current_reading_updated) {
        this.props.patchReceipt(this.state.current_data, this.props.token, id,this.props.navigation)

        // Se agrega los datos de record en el state
        this.setRecordState()
        this.setState({
          kwhValidation: require('../../../images/succes.png')
        },()=>{
         this.changeCheckedData()
         //Se genera el record con la ultima medicion
         this.props.postRecord(this.state, this.props.screenProps.token)
         this.props.getRecord(this.contract_id)

        })
      // this.props.navigation.goBack()
    }else{
      if (this.state.current_data === '') {
        AlertIOS.alert(
          'Validacion',
          'Se necesita datos para calcular el consumo de KHw',
          [
            {text: 'OK'},
          ],
        )
      }else if(this.state.current_data <= this.state.itemReceipt.current_reading_updated){
        AlertIOS.alert(
          'Validacion',
          'Los datos introducidos debe ser mayor a la ultima lectura diaria',
          [
            {text: 'OK'},
          ],
        )
      }

    }
  }
  setDataContract(contract_id){
    this.contract_id = contract_id;
    const itemContract = []
    var itemReceipt;
    var type_payment;

    var arrContracts = this.props.screenProps.contracts.map((item, i) => {
      if(item.id == contract_id){
        this.rate_contract = item.rate
        type_payment = item.type_payment;
        itemContract.push(item.receipt);
      }
    })
    itemContract.map((item,i)=>{
      itemReceipt = item[0]
    })
    this.setState({
      itemReceipt,
      type_payment: type_payment
    },()=>{
      this.props.getRatePeriod(this.rate_contract, this.props.token)
    })
  }

  getRate(){
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
      if(this.state.itemReceipt != undefined){
        if(this.state.itemReceipt.period == 'Verano'){
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
  }
  render(){
    const { navigation } = this.props;
    console.log('record', this.props)
    // Contrato que viene desde la pantalla recibos
    const { contract } = this.props.navigation.state.params;
    const rangeDate = getRangeMonth(this.state.type_payment, this.state.itemReceipt.payday_limit)
    // Rango automatico del periodo
    const TextReceipt = (rangeDate != 'undefined-undefined') && <Text>{rangeDate}</Text>
    // Obtener Record
    this.getPropsByNextRecords(this.props.record)
    return(
      <Container style={{backgroundColor: '#fff'}}>
        <ScrollView
          ref='scroll'
          style={{height: Screen.height}}
          scrollEnabled={this.state.scroll}
          >
          <Grid style={{height:Screen.height}}>
            <Row size={4} style={styles.grid__row__top}>
              <Text style={styles.grid__row__top__text}>Gasto de Luz</Text>
              <View style={styles.grid__row__top__view}>
                <Text>{`$${parseFloat(this.state.projected_payment).toLocaleString()}`}</Text>
                <Text>Proyectado</Text>
              </View>
            </Row>
            <Col size={6} style={styles.grid__col__select}>
              <Row style={styles.grid__col__select__row__top}>
                <Text style={styles.grid__row__top__view}>Contrato</Text>
                  <Text>#{contract.number_contract}</Text>
              </Row>
              <Row style={styles.grid__col__select__row__bottom}>
                <Text style={styles.grid__row__top__view}>Periodo</Text>
                { TextReceipt }
              </Row>
            </Col>
            <Row size={12}>
              <List style={styles.row__bottom__list}>
                <ListItem last style={styles.row__bottom__list__listItem}>
                  <Text style={styles.row__bottom__list__listItem__textTop}>Lectura Inicial</Text>
                  <Text style={styles.row__bottom__list__listItem__textBottom}>{this.state.itemReceipt.previous_reading}</Text>
                </ListItem>
                <ListItem last>
                  <Text style={styles.row__bottom__list__listItem__textTop}>Ultima Lectura Diaria</Text>
                  <Text style={styles.row__bottom__list__listItem__textBottom}>{(this.state.itemReceipt.current_reading_updated)}</Text>
                </ListItem>
                <ListItem last style={styles.row__bottom__list__listItem}>
                  <Text style={styles.row__bottom__list__listItem__textTop}>Consumo en KWh</Text>
                  <Text style={styles.row__bottom__list__listItem__textBottom}>{(this.state.itemReceipt.current_reading_updated === undefined)? 0 : this.state.itemReceipt.current_reading_updated - this.state.itemReceipt.previous_reading }</Text>
                </ListItem>
              </List>
            </Row>
            <Row size={20} style={{alignItems: 'flex-start', justifyContent: 'center',paddingTop: (Platform.OS === 'android' && Screen.height <= 640)? 20 : 0}}>
              <Image resizeMode={'stretch'} source={require('../../../images/medidor.png')} style={styles.animatedView__image}>
                <View style={styles.animatedView__image__view}>
                  <View style={{flexDirection: 'row',height:40,justifyContent:'center', alignItems:'center',marginTop: 65,marginLeft:37}}>
                    <TextInput
                      underlineColorAndroid={'transparent'}
                      keyboardType={'numeric'}
                      style={styles.animatedView__image__view__input}
                      onChangeText={(current_data)=> this.setState({ current_data })}
                      value={this.state.current_data}
                      onFocus={ () => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 185 : 300 }) }
                    />
                    {(typeof this.state.kwhValidation != 'string')? <Image style={{width:35,height:30,marginRight:0}} source={this.state.kwhValidation}/> : <Text style={{color: 'grey'}}>{this.state.kwhValidation}</Text>}
                  </View>
                  <Button
                    small
                    style={styles.animatedView__image__view__btn}
                    onPress={() => this.sendCurrentData(this.state.itemReceipt.id)}
                    >
                    <Text>Enter</Text>
                  </Button>
                </View>
              </Image>
            </Row>
            <Row size={10} style={{ justifyContent: 'center'}} >
               <Button
                  transparent
                  small
                  onPress={() => this.props.navigation.navigate('Resultados')}
                  >
                  <Text>Resultados</Text>
              </Button>
            </Row>
          </Grid>
        </ScrollView>
        <View>
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ right: 10 }}
            style={{ backgroundColor: 'steelblue' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="md-share" />
            <Button style={{ backgroundColor: '#3B5998' }}><Icon name="logo-facebook" /></Button>
          </Fab>
        </View>
        {/* {(Platform.OS === 'ios')? <Footer navigation={navigation} viewContract={this.props.screenProps.contracts} /> : null} */}
      </Container>
    )
  }
}
function bindAction(dispatch) {
  return {
    patchReceipt: (data, token, id,navigation) => dispatch(patchReceipt(data, token, id,navigation)),
    getRatePeriod: (rate, token) => dispatch(getRatePeriod(rate, token)),
    postRecord: (data, token) => dispatch(postRecord(data, token)),
    getRecord: (id) => dispatch(getRecord(id)),
  };
}
const mapStateToProps = state => ({
  token: state.user.token,
  rate_period: state.list_rate.rate_period,
  contracts: state.list_contracts.contracts,
  record: state.list_records.results,
});
export default connect(mapStateToProps, bindAction)(MeasurementSingle)
