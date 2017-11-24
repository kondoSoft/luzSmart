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
import { patchReceipt, getRatePeriod, postRecord, getRecord, getHighConsumption } from '../../actions/contracts'
import {
  getRangeMonth,
  setRecord,
  getDateBetweenPeriods,
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
      type_payment: (this.props.navigation.state.params) && this.props.navigation.state.params.contract.type_payment,
      projected_payment: 0,
    }
    this.contract_id;
    this.subTotal;
    this.total;
    this.rate_contract;
    this.propsNextRecords;
    this._keyboardDidHide = this._keyboardDidHide.bind(this)
    this.changeCheckedData = this.changeCheckedData.bind(this)
    this.navigationGoBack = this.navigationGoBack.bind(this)
  }
  static navigationOptions = ({ navigation, screenProps }) => (
  {
    headerLeft: <Button transparent onPress={() => navigation.state.params.headerLeft()}><Icon active style={{'color': 'white'}} name="arrow-back"/></Button>,
    headerRight: <Button transparent onPress={() => navigation.navigate('Contratos')}><Icon active style={{'color': 'white'}} name="home"/></Button>,
  });

  navigationGoBack(){
    this.props.navigation.goBack()
  }

  componentWillMount () {
    this.props.navigation.setParams({
      headerLeft: this.navigationGoBack,
    });
    // Navegacion por parametros
    if(this.props.navigation.state.params){
      this.setState({
        itemReceipt: this.props.navigation.state.params.contract.receipt[0],
      })
    }

    this.rate_contract = this.props.navigation.state.params.contract.rate
    this.contract_id = this.props.navigation.state.params.contract.id
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    this.props.getRecord(this.contract_id)
    this.props.getHighConsumption(this.props.navigation.state.params.contract.municipality.region, this.props.screenProps.token)
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.record[0]){
      if(nextProps.record.length > 1 && this.state.record.projected_payment === undefined){
        this.setState({
          projected_payment: nextProps.record[0].projected_payment,

        })
      }else{
        this.setState({
          projected_payment: this.state.record.projected_payment,
        })
      }
    }
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
      }else {
        let filItemID = nextProps.screenProps.contracts.filter((item,i)=>{
              return item.id === this.contract_id;
            })
        let prevCurrentReading = this.state.itemReceipt.current_reading_updated;
        let nextCurrentReading = filItemID[0].receipt[0].current_reading_updated;
        if (nextCurrentReading > prevCurrentReading) {
          this.setState({
            // type_payment: arrayContract[0].type_payment,
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

    const ratePeriod = getDateBetweenPeriods(this.props.navigation.state.params.contract, this.state.itemReceipt, this.props.rate_period)
    let contract;
    if(this.props.navigation.state.params){
      contract = this.props.navigation.state.params.contract
    }
    // Obtiene el ultimo dato actualizado
    const lastRecord = this.propsNextRecords[this.propsNextRecords.length-1]
    // Se obtiene de nuevo Record
    this.props.getRecord(this.contract_id)
    const data = {
      contract_id: this.contract_id,
      lastRecord: lastRecord,
      itemReceipt: this.state.itemReceipt,
      type_payment: this.state.type_payment,
      current_data: this.state.current_data,
      ratePeriod: ratePeriod,
      amount_payable: 0,
      contract: contract,
      highConsumption: this.props.highConsumption
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
        // this.props.getHighConsumption(this.muniRegion.region.id, this.props.screenProps.token)


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

  render(){
    const { navigation } = this.props;
    // Contrato que viene desde la pantalla recibos
    const { contract } = this.props.navigation.state.params;
    const rangeDate = getRangeMonth(this.state.type_payment, this.state.itemReceipt.payday_limit)
    // Rango automatico del periodo
    const TextReceipt = (rangeDate != 'undefined-undefined') && <Text style={{ fontSize: 14 }}>{rangeDate}</Text>
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
            <Row size={4} style={styles.grid__row__top, {backgroundColor: 'transparent', borderBottomWidth: 1, borderColor: 'lightgray'}}>
              <View style={{ flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',}}>
                <Text style={styles.grid__row__top__text}>Gasto de Luz:</Text>
              </View>
              <View style={styles.view_right_text}>
                <Text style={{ fontSize: 14, backgroundColor: 'transparent', }}>{`$${parseFloat(this.state.projected_payment).toFixed(0)}`}</Text>
                <Text style={{ fontSize: 14, backgroundColor: 'transparent', }}> Proyectado</Text>
              </View>
            </Row>
            <Row size={4} style={styles.grid__row__top, {backgroundColor: 'lightgray', borderBottomWidth: 1, borderColor: 'white'}}>
              <View style={{ flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',}}>
                <Text style={styles.grid__row__top__text}>Contrato:</Text>
              </View>
              <View style={styles.view_right_text}>
                <Text style={{ fontSize: 14 }}>#{contract.number_contract}</Text>
              </View>
            </Row>
            <Row size={4} style={styles.grid__row__top, {backgroundColor: 'transparent', borderBottomWidth: 1, borderColor: 'lightgray'}}>
              <View style={{ flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',}}>
                <Text style={styles.grid__row__top__text}>Periodo:</Text>
              </View>
              <View style={styles.view_right_text}>
                { TextReceipt }
              </View>
            </Row>


            <Row size={4} style={styles.row__bottom__list__listItem,{backgroundColor: 'lightgray', borderBottomWidth: 1, borderColor: 'white'}}>
              <View style={{ flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',}}>
                <Text style={styles.grid__row__top__text}>Lectura Inicial:</Text>
              </View>
              <View style={styles.view_right_text}>
                <Text style={styles.row__bottom__list__listItem__textBottom}>{this.state.itemReceipt.previous_reading}</Text>
              </View>
            </Row>
            <Row size={4} style={styles.row__bottom__list__listItem, {backgroundColor: 'transparent', borderBottomWidth: 1, borderColor: 'lightgray'}}>
              <View style={{ flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',}}>
                <Text style={styles.grid__row__top__text}>Ultima Lectura Diaria</Text>
              </View>
              <View style={styles.view_right_text}>
                <Text style={styles.row__bottom__list__listItem__textBottom}>{(this.state.itemReceipt.current_reading_updated)}</Text>
              </View>
            </Row>
            <Row size={4} style={styles.row__bottom__list__listItem, {backgroundColor: 'lightgray', borderBottomWidth: 1, borderColor: 'white'}}>
              <View style={{ flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',}}>
                <Text style={styles.grid__row__top__text}>Consumo en KWh</Text>
              </View>
              <View style={styles.view_right_text }>
                <Text style={styles.row__bottom__list__listItem__textBottom}>{(this.state.itemReceipt.current_reading_updated === undefined)? 0 : this.state.itemReceipt.current_reading_updated - this.state.itemReceipt.previous_reading }</Text>
              </View>
            </Row>
            <Row size={24} style={{alignItems: 'center', justifyContent: 'center',paddingTop: (Platform.OS === 'android' && Screen.height <= 640)? 20 : 0}}>
              <Image resizeMode={'stretch'} source={require('../../../images/medidor.png')} style={styles.animatedView__image}>
                <View style={styles.animatedView__image__view}>
                  <View style={{flexDirection: 'row',height:40,justifyContent:'center', alignItems:'center', marginTop: 65,marginLeft:37}}>
                    <TextInput
                      underlineColorAndroid={'transparent'}
                      keyboardType={'numeric'}
                      style={styles.animatedView__image__view__input}
                      onChangeText={(current_data)=> this.setState({ current_data })}
                      value={this.state.current_data}
                      onFocus={ () => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 185 : 300 }) }
                    />
                    {(typeof this.state.kwhValidation != 'string')? <Image style={{width:35,height:30,marginRight:0}} source={this.state.kwhValidation}/> : <Text style={{color: 'grey', marginTop: 13 }}>{this.state.kwhValidation}</Text>}
                  </View>
                  <View>
                    <Button
                      small
                      style={styles.animatedView__image__view__btn}
                      onPress={() => this.sendCurrentData(this.state.itemReceipt.id)}
                      >
                      <Text style={{backgroundColor: 'transparent'}}>Enter</Text>
                    </Button>

                  </View>
                </View>
              </Image>
            </Row>
            <Row size={13} style={{ justifyContent: 'center'}} >
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
    getHighConsumption: (region_id, token) => dispatch(getHighConsumption(region_id, token)),

  };
}
const mapStateToProps = state => ({
  token: state.user.token,
  rate_period: state.list_rate.rate_period,
  contracts: state.list_contracts.contracts,
  record: state.list_records.results,
  highConsumption: state.list_contracts.highConsumption,

});
export default connect(mapStateToProps, bindAction)(MeasurementSingle)
