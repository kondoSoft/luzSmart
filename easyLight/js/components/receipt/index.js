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
import { postReceipt } from '../../actions/contracts';
import ReceiptPickerDate from '../datePicker/receipt';
import { getContract } from "../../actions/list_states_mx";
import { getWeekday } from "../../helpers"
var contract;

class Receipt extends Component {
  constructor(props){
    super(props)
      this.state = {
        payday_limit: '',
        amount_payable: 0,
        current_reading: 0,
        previous_reading: 0,
        contract_id: 0,
        amount_payable_ui: '',
        current_reading_ui: 0,
        previous_reading_ui: 0,
        period: '',
        status: false,
      }
      this._keyboardDidHide = this._keyboardDidHide.bind(this)
      this.handlePaydayLimit = this.handlePaydayLimit.bind(this)
    }
  static propType = {
    setBill: React.PropTypes.func,
    getContract: React.PropTypes.func,
  }
  static navigationOptions = ({ navigation, screenProps }) => (
  {
    // headerRight: (navigation.state.params) && <Button transparent onPress={() => navigation.navigate('Medicion', { contract: navigation.state.params.contract})}><Icon active style={{'color': 'white', fontSize: 35}} name="ios-arrow-forward"/></Button>,
    headerLeft: <Button transparent onPress={() => navigation.goBack()}><Icon active style={{'color': 'white', fontSize: 35}} name="ios-arrow-back"/></Button>,

  });
  componentWillMount () {
   this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
   if (this.props.navigation.state.params !== undefined) {
     this.setState({contract_id: this.props.navigation.state.params.contract.id})
   }
  }
  componentWillReceiveProps(nextProps){
    if(this.props.navigation.state.params === undefined){
      this.setState({contract_id: nextProps.newContract.id})
    }
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
        payday_limit: date,
      });
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
  showAlert(){
    if (Platform.OS === 'ios') {
      AlertIOS.alert(
        'Contrato',
       'Desea agregar un historial al contrato Mi Casa?',
       [
         {text: 'No', onPress: () => this.props.navigation.navigate('Contracts')},
         {text: 'Si', onPress: () => this.props.navigation.navigate('History')},
       ],
      );
    }
    else {
      Alert.alert(
        'Contrato',
        'Desea agregar un historial al contrato Mi Casa?',
        [
          { text: 'No', onPress: () => this.props.navigation.navigate('Contracts') },
          { text: 'Si', onPress: () => this.props.navigation.navigate('History') },
        ],
      );
    }
  }
  sendData() {
    if (this.dataValidate(this.state)) {
      // se agrega estatus y despues se hace un post
      this.setState({
        status: true
      },() => this.props.postReceipt(this.state, this.props.token))
      this.showAlert();

      setTimeout( () => {
        this.props.navigation.navigate('Contratos', this.props.getContract(this.props.screenProps.token, this.props.navigation));
      }, 3000)
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
    console.log('me ejecuto', this.props.contracts)
    // console.log('function', getWeekday('10/08/2017'))
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
                  onPress={()=>this.sendData()}
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
              <Col size={25} style={styles.col__bottom}>
                <Row style={styles.col__bottom__row__bottom}>
                  <Button
                    style={{ height: 35}}
                    onPress={()=>this.sendData()}
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
    getContract: (token, navigation) => dispatch(getContract(token, navigation)),
  };
}
const mapStateToProps = state => ({
  newContract: state.list_contracts.newContract,
  token: state.user.token,
  contracts: state.list_contracts.contracts
});

export default connect(mapStateToProps, bindAction)(Receipt);
