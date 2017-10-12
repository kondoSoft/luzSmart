import React, { Component } from 'react'
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
  Input
} from 'native-base'
import { Image, TextInput, Platform, ScrollView, Dimensions, Keyboard, AlertIOS } from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid'
import { Select, Option } from 'react-native-select-list'
import styles from './styles'
import AnimatedView from '../animatedView/index'
import FabButton from '../fabButton'
import { patchReceipt, getRatePeriod } from '../../actions/contracts'
import { getIVA, costProject } from '../../helpers'
import { captureScreen } from 'react-native-view-shot'
// import { ShareDialog } from 'react-native-fbsdk';

let Screen = Dimensions.get('window')

var selectContract
var rangeDate
var arrayContract = []
class Measurements extends Component {
  constructor (props) {
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
        payday_limit: ''
      },
      kwhValidation: 'KWh',
      record: {

      },

    }
    this.contract_id
    this.subTotal
    this.total
    this.rate_contract
    this._keyboardDidHide = this._keyboardDidHide.bind(this)
    this.changeCheckedData = this.changeCheckedData.bind(this)
  }
  componentWillMount () {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }
  componentWillReceiveProps (nextProps) {
    arrayContract = []
    nextProps.screenProps.contracts.map((item, i) => {
      if (item.receipt.length != 0 || nextProps.screenProps.contracts.length === 1) {
        arrayContract.push(item)
      }
    })
    if (arrayContract.length === 1) {
      this.setReceiptByOneContract(arrayContract[0])
    }
    selectContract = this.selectContracts(arrayContract)
    if (this.contract_id != undefined) {
      if (this.props.screenProps.contracts === 1) {
        let filItemID = nextProps.screenProps.contracts.filter((item,i)=>{
              return item.id === this.contract_id;
            })
        let prevCurrentReading = this.state.itemReceipt.current_reading_updated;
        let nextCurrentReading = filItemID[0].receipt[0].current_reading_updated;

        if (nextCurrentReading > prevCurrentReading) {
          this.setState({
            itemReceipt: {
              id: this.state.itemReceipt.id,
              previous_reading: this.state.itemReceipt.previous_reading,
              current_reading: this.state.itemReceipt.current_reading,
              current_reading_updated: nextCurrentReading,
              payday_limit: this.state.itemReceipt.payday_limit,
              period: this.state.itemReceipt.period,
              amount_payable: this.state.itemReceipt.amount_payable
            }
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
            itemReceipt: {
              id: this.state.itemReceipt.id,
              previous_reading: this.state.itemReceipt.previous_reading,
              current_reading: this.state.itemReceipt.current_reading,
              current_reading_updated: nextCurrentReading,
              payday_limit: this.state.itemReceipt.payday_limit,
              period: this.state.itemReceipt.period,
              amount_payable: this.state.itemReceipt.amount_payable
            }
          })
        }
      }
    }
  }
  componentWillUnmount () {
    this.keyboardDidHideListener.remove()
  }
  _keyboardDidHide () {
    this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios') ? 0 : 0})
  }
  changeCheckedData () {
    setTimeout(() => {
      this.setState({
        kwhValidation: 'KWh'
      })
    }, 1000)
    this.setState({
      current_data: ''
    })
  }
  setReceiptByOneContract (contract) {
    this.rate_contract = contract.rate
    this.setState({
      itemReceipt: contract.receipt[0]
    })
  }
  setRatePeriod(contract){
    this.rate_contract = contract.rate
    this.props.getRatePeriod(this.rate_contract, this.props.token)
  }

  setRecord(){

    this.setState({
      record:{
        contract_id: this.contract_id,

      }
    })
  }

  //PATCH Receipt
  sendCurrentData(id){
    if (this.state.current_data != '' && this.state.current_data > this.state.itemReceipt.current_reading) {
        this.props.patchReceipt(this.state.current_data, this.props.token, id, this.props.navigation)
        this.setState({
          kwhValidation: require('../../../images/succes.png')
        },()=>{
         this.changeCheckedData()
         this.getTotalPayment()
         this.forceUpdate()
        })
    }else{
      if (this.state.current_data === '') {
        AlertIOS.alert(
          'Validacion',
          'Se necesita datos para calcular el consumo de KHw',
          [
            {text: 'OK'},
          ],
        )
      }else if(this.state.current_data <= this.state.itemReceipt.current_reading){

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
  setDataContract (contract_id) {
    this.contract_id = contract_id
    const itemContract = []
    var itemReceipt
    var type_payment

    var arrContracts = this.props.screenProps.contracts.map((item, i) => {
      if (item.id == contract_id) {
        this.rate_contract = item.rate
        type_payment = item.type_payment
        itemContract.push(item.receipt)
      }
    })
    itemContract.map((item, i) => {
      itemReceipt = item[0]
    })
    this.setState({
      itemReceipt,
      type_payment: type_payment
    }, () => {
      this.props.getRatePeriod(this.rate_contract, this.props.token)
      this.setRecord()
    })
  }
  // Funcion rango de fecha
  setRangeDate (firstMonth, finalMonth) {
    const arrMonth = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    return rangeDate = arrMonth[firstMonth] + '-' + arrMonth[finalMonth]
  }
  getTotalPayment () {
    // console.log('rate_period', this.props.rate_period)
    // console.log('this.rate_contract', this.rate_contract)
    if (this.props.rate_period.length > 0) {
      if (this.rate_contract === this.props.rate_period[0].name_rate) {
        this.subTotal = costProject(this.props.rate_period,this.state.itemReceipt.current_reading - this.state.itemReceipt.previous_reading)
        this.total = getIVA(this.subTotal);
      }
    }
  }
  selectContracts (contracts) {
    if (contracts.length === 1) {
      return <Text>#{contracts[0].number_contract}</Text>
    } else if (contracts.length > 1) {
      if (Platform.OS === 'ios') {
        return (<Select
          selectStyle={styles.col__row__top__select}
          padding={5}
          listHeight={100}
          caretSize={0}
          onSelect={(id) => this.setDataContract(id)}
          >
          {contracts.map((item, i) => {
            return <Option
              key={i}
              value={item.id}
              optionStyle={styles.col__row__select__option}
                > {'#' + item.number_contract }</Option>
          })
          }
        </Select>)
      } else {
        return (<View style={styles.selectPicker}>
          <Picker
            style={{flex: 1}}
            selectedValue={this.contract_id}
            onValueChange={(itemValue, id) => this.setDataContract(itemValue)}>
            {
              contracts.map((item, i) => {
                return <Picker.Item key={i} label={`#${item.number_contract}`} value={item.id} />
              })
            }
          </Picker>
        </View>)
      }
    }
  }
  snapshot () {
    captureScreen({
      format: 'jpg',
      quality: 0.8
    })
    .then(
      uri => console.log('Image saved to', uri),
      error => console.error('Oops, snapshot failed', error)
    )
  }

  render () {
    this.getTotalPayment()
    const { navigation } = this.props
    // Contrato que viene desde la pantalla recibos
    const { contracts } = this.props.screenProps
    if (this.state.type_payment == 'Bimestral') {
      count_days = 60
    } else {
      count_days = 30
    }
    const payday_limit = this.state.itemReceipt.payday_limit.replace(/-/g, '\/')
    const finalMonth = new Date(payday_limit)
    const firstMonth = new Date(finalMonth).setDate(new Date(finalMonth).getDate() - count_days)
    this.setRangeDate(new Date(firstMonth).getMonth(), finalMonth.getMonth())

    // Rango automatico del periodo
    const TextReceipt = (rangeDate != 'undefined-undefined') && <Text>{rangeDate}</Text>
    // Select Contract
    return(
      <Container style={{backgroundColor: '#fff'}}>
        <ScrollView
          ref='scroll'
          style={{height: Screen.height}}
          scrollEnabled={this.state.scroll}
          >
          <Grid style={{height: Screen.height}}>
            <Row size={4} style={styles.grid__row__top}>
              <Text style={styles.grid__row__top__text}>Gasto de Luz</Text>
              <View style={styles.grid__row__top__view}>
                <Text>{(this.total != undefined) ? `$${this.total.toLocaleString()}` : `$ 0`}</Text>
                <Text>Proyectado</Text>
              </View>
            </Row>
            <Col size={6} style={styles.grid__col__select}>
              <Row style={styles.grid__col__select__row__top}>
                <Text style={styles.grid__row__top__view}>Contrato</Text>
                { selectContract }
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
            <Row size={22} style={{alignItems: 'flex-start', justifyContent: 'center', paddingTop: (Platform.OS === 'android' && Screen.height <= 640) ? 30 : 0}}>
              <Image resizeMode={'stretch'} source={require('../../../images/medidor.png')} style={styles.animatedView__image}>
                <View style={styles.animatedView__image__view}>
                  <View style={{flexDirection: 'row', height: 40, justifyContent: 'center', alignItems: 'center', marginTop: 55, marginLeft: 37}}>
                    <TextInput
                      underlineColorAndroid={'transparent'}
                      keyboardType={'numeric'}
                      style={styles.animatedView__image__view__input}
                      onChangeText={(current_data) => this.setState({ current_data })}
                      value={this.state.current_data}
                      onFocus={() => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios') ? 185 : 300 })}
                    />
                    {(typeof this.state.kwhValidation !== 'string') ? <Image style={{width: 35, height: 30, marginRight: 0}} source={this.state.kwhValidation} /> : <Text style={{color: 'grey'}}>{this.state.kwhValidation}</Text>}
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
            <Row size={14} style={{ justifyContent: 'center'}} >
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
            direction='up'
            containerStyle={{ right: 10 }}
            style={{ backgroundColor: 'steelblue' }}
            position='bottomRight'
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name='md-share' />
            <Button onPress={() => this.snapshot()} style={{ backgroundColor: '#3B5998' }}>
              <Icon name='logo-facebook' />
            </Button>
          </Fab>
        </View>
        {/* {(Platform.OS === 'ios')? <Footer navigation={navigation} viewContract={this.props.screenProps.contracts} /> : null} */}
      </Container>
    )
  }
}
function bindAction (dispatch) {
  return {
    patchReceipt: (data, token, id, navigation) => dispatch(patchReceipt(data, token, id, navigation)),
    getRatePeriod: (rate, token) => dispatch(getRatePeriod(rate, token))
  }
}
const mapStateToProps = state => ({
  token: state.user.token,
  rate_period: state.list_rate.rate_period,
  contracts: state.list_contracts.contracts
})
export default connect(mapStateToProps, bindAction)(Measurements)
