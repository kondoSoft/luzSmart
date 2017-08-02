import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  Button,
  Container,
  View,
  Text,
  Form,
  Item,
  Label,
  Input,
} from 'native-base';
import {
  TouchableOpacity,
  AlertIOS,
  Platform,
  Alert,
  ScrollView,
  Keyboard,
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Select, Option } from 'react-native-select-list';
import Header from '../header/index';
import Footer from '../footer/index';
import styles from './styles';
import { postReceipt } from '../../actions/contracts'


class Receipt extends Component {
  constructor(props){
    super(props)
      this.state = {
        payday_limit: '',
        amount_payable: 0,
        current_reading: 0,
        previous_reading: 0,
      }
      this._keyboardDidHide = this._keyboardDidHide.bind(this)
    }
  static navigationOptions = {
    header: null
  };
  static propType = {
    setBill: React.PropTypes.func
  }
  componentWillMount () {
   this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }
  componentWillUnmount () {
    this.keyboardDidHideListener.remove();
  }
  _keyboardDidHide () {
    this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 0 : 0})
  }
  handlePaydayLimit(event){
    this.setState({payday_limit: event.nativeEvent.text});
  }
  handleAmountPayable(event){
    this.setState({amount_payable: event.nativeEvent.text});
  }
  handleCurrentReading(event){
    this.setState({current_reading: event.nativeEvent.text});
  }
  handlePreviousReading(event){
    this.setState({previous_reading: event.nativeEvent.text});
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
      )
    }else{
      Alert.alert(
        'Contrato',
        'Desea agregar un historial al contrato Mi Casa?',
        [
          {text: 'No', onPress: () => this.props.navigation.navigate('Contracts')},
          {text: 'Si', onPress: () => this.props.navigation.navigate('History')},
        ],
      )
    }
  }
  sendData(){
    this.props.postReceipt(this.state)
    this.showAlert()
  }
  render(){
    const { navigation } = this.props
    const contract = navigation.state.params.contract
    var receiptView = (
      <Container>
        <Header zIndex navigation={this.props.navigation} title="Recibo CFE"/>
        <Footer navigation={navigation}/>
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
                <Item last style={styles.form__item__inputs}>
                  <Input
                    placeholder="Fecha Limite de Pago"
                    onChange={event => this.handlePaydayLimit(event)}
                  />
                </Item>
                <Item last style={styles.form__item__inputs}>
                  <Input
                    placeholder="Monto a Pagar"
                    onChange={event => this.handleAmountPayable(event)}
                    onFocus={() => this.refs['scroll'].scrollTo({y: 80 })}
                  />
                </Item>
                <Item last style={styles.form__item__title}>
                  <Label style={styles.form__item__label}>Medición de Consumo</Label>
                </Item>
                <Item last style={styles.form__item__inputs}>
                  <Input
                    placeholder="Lectura Actual"
                    onChange={event => this.handleCurrentReading(event)}
                    onFocus={() => this.refs['scroll'].scrollTo({y: 140 })}
                  />
                </Item>
                <Item last style={styles.form__item__inputs}>
                  <Input
                    placeholder="Lectura Anterior"
                    onChange={event => this.handlePreviousReading(event)}
                    onFocus={() => this.refs['scroll'].scrollTo({y: 140 })}
                  />
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
    if (Platform.OS === 'ios') {
      var receiptView = (
        <Container>
          <Header zIndex navigation={this.props.navigation} title="Recibo CFE"/>
          {(Platform.OS === 'android')? <Footer navigation={navigation}/> : null}
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
                  <Item last style={styles.form__item__inputs}>
                    <Input
                      placeholder="Fecha Limite de Pago"
                      onChange={event => this.handlePaydayLimit(event)}
                    />
                  </Item>
                  <Item last style={styles.form__item__inputs}>
                    <Input
                      placeholder="Monto a Pagar"
                      onChange={event => this.handleAmountPayable(event)}
                      onFocus={() => this.refs['scroll'].scrollTo({y: 0 })}
                    />
                  </Item>
                  <Item last style={styles.form__item__title}>
                    <Label style={styles.form__item__label}>Medición de Consumo</Label>
                  </Item>
                  <Item last style={styles.form__item__inputs}>
                    <Input
                      placeholder="Lectura Actual"
                      onChange={event => this.handleCurrentReading(event)}
                      onFocus={() => this.refs['scroll'].scrollTo({y: 40})}
                    />
                  </Item>
                  <Item last style={styles.form__item__inputs}>
                    <Input
                      placeholder="Lectura Anterior"
                      onChange={event => this.handlePreviousReading(event)}
                      onFocus={() => this.refs['scroll'].scrollTo({y: 40})}
                    />
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
          <Footer navigation={navigation}/>
        </Container>
      )
    }
    return receiptView
  }
}
function bindAction(dispatch) {
  return {
    postReceipt: list => dispatch(postReceipt(list)),
  }
}
const mapStateToProps = state => ({
  receipts: state.list_contracts.receipts
})

export default connect(mapStateToProps, bindAction)(Receipt);
