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
import { Image, TextInput, Platform, ScrollView, Dimensions, Keyboard } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Select, Option } from 'react-native-select-list';
import Header from '../header/index';
import Footer from '../footer/index';
import styles from './styles';
import AnimatedView from '../animatedView/index';
import FabButton from '../fabButton';
import { patchReceipt } from '../../actions/contracts'

let Screen = Dimensions.get('window')

var SelectContract
var rangeDate
class Measurements extends Component {

  static navigationOptions = {
    header: null
  };
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
      kwhValidation: 'KWh'
    }
    this._keyboardDidHide = this._keyboardDidHide.bind(this)
    this.changeCheckedData = this.changeCheckedData.bind(this)
  }

  componentWillMount () {
    if (this.props.navigation.state.params.currentContract.length === 1) {
      const arrayReceipts = this.props.navigation.state.params.currentContract[0]
      const itemsReceipts = []
      arrayReceipts.receipt.map((item,i)=>{
        itemsReceipts.push(item)
        return item
      })
      const itemReceipt = itemsReceipts[itemsReceipts.length-1]
      this.setState({
        itemReceipt
      })
    }

    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }
  componentDidMount(){

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
    },2000);
  }
  sendCurrentData(id){
    // this.props.patchReceipt(this.state.current_data, this.props.token, id)
    this.setState({
      kwhValidation: require('../../../images/succes.png')
    },this.changeCheckedData())
    // this.props.navigation.goBack()
  }
  setDataContract(contract_id){

    const itemContract = []
    var itemReceipt;

    var arrContracts = this.props.contracts.map((item, i) => {
      if(item.id == contract_id){
        itemContract.push(item.receipt)
      }
    })
    itemContract.map((item,i)=>{
      itemReceipt = item[item.length-1]
    })
    this.setState({
      itemReceipt
    })
  }
  // Funcion rango de fecha
  setRangeDate(){
    const arrMonth = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    const d = new Date()
    const month = d.getMonth();
    const day = d.getDate();
    const year = d.getFullYear();
    const currentDate = ((''+day).length<2 ? '0' : '') + day + '/' + ((''+month).length<2 ? '0' : '') + month + '/' + d.getFullYear()
    const indexPaydayLimit = this.state.itemReceipt.payday_limit.slice(5,7)
    const dayPaydayLimit = this.state.itemReceipt.payday_limit.slice(8,10)
    const initialDate = new Date(year, indexPaydayLimit, dayPaydayLimit)

    var finalDate = initialDate.setDate(initialDate.getDate()+30)
    finalDate = initialDate.getMonth()-1
    rangeDate = arrMonth[indexPaydayLimit-1] + '-' + arrMonth[finalDate]

  }
  render(){

    this.setRangeDate()

    const { navigation, contracts} = this.props

    // Contrato que viene desde la pantalla recibos
    const { currentContract } = this.props.navigation.state.params
    const receipt = this.props.navigation.state.params.currentContract[0].receipt
    // Array de recibos para sacar el ultimo
    const arrReceipt = receipt.map((item, i)=>{
      return item
    })
    //  Ultimo recibo
    const lastReceipt = arrReceipt[receipt.length-1]
    // Rango automatico del periodo
    const TextReceipt = (rangeDate != 'undefined-undefined') && <Text>{rangeDate}</Text>
    // Select Contract
    const TextContract = <Text>#{currentContract[0].number_contract}</Text>

    SelectContract =
    <Select
      selectStyle={styles.col__row__top__select}
      padding={5}
      listHeight={100}
      caretSize={0}
      onSelect={(id) => this.setDataContract(id)}
      >
      {contracts.map((item,i)=>{

        return <Option
          key={i}
          value={item.id}
          optionStyle={styles.col__row__select__option}
          > {'#' + item.number_contract }</Option>
      })}
    </Select>
    // Math

    return(
      <Container style={{backgroundColor: '#fff'}}>
        <Header navigation={this.props.navigation} zIndex title="Mediciones"/>
        {(Platform.OS === 'android')? <Footer navigation={navigation}/> : null}
        <ScrollView
          ref='scroll'
          style={{height: Screen.height}}
          scrollEnabled={this.state.scroll}
          >
          <Grid style={{height:Screen.height}}>
            <Row size={4} style={styles.grid__row__top}>
              <Text style={styles.grid__row__top__text}>Gasto de Luz</Text>
              <View style={styles.grid__row__top__view}>
                <Text>$2,150</Text>
                <Text>Proyectado</Text>
              </View>
            </Row>
            <Col size={6} style={styles.grid__col__select}>
              <Row style={styles.grid__col__select__row__top}>
                <Text style={styles.grid__row__top__view}>Contrato</Text>
                 {(currentContract.length == 1) ? TextContract  : SelectContract }

                  {/* {SelectContract} */}
              </Row>
              <Row style={styles.grid__col__select__row__bottom}>
                <Text style={styles.grid__row__top__view}>Periodo</Text>
                {(Platform.OS === 'ios')?
                (receipt.length >= 1) && TextReceipt
                :
                <View style={styles.selectPicker}>
                  <Picker
                    style={{flex:1}}
                    selectedValue={this.state.language}
                    onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                  </Picker>
                </View>
              }
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
                  <Text style={styles.row__bottom__list__listItem__textBottom}>{(this.state.itemReceipt.current_reading)}</Text>
                </ListItem>
                <ListItem last style={styles.row__bottom__list__listItem}>
                  <Text style={styles.row__bottom__list__listItem__textTop}>Consumo en KWh</Text>
                  <Text style={styles.row__bottom__list__listItem__textBottom}>{this.state.itemReceipt.current_reading - this.state.itemReceipt.previous_reading }</Text>
                </ListItem>
              </List>
            </Row>
            <Row size={30} style={{alignItems: 'flex-start', justifyContent: 'center',paddingTop: (Platform.OS === 'android' && Screen.height <= 640)? 30 : 0}}>
              <Image resizeMode={'stretch'} source={require('../../../images/medidor.png')} style={styles.animatedView__image}>
                <View style={styles.animatedView__image__view}>
                  <View style={{flexDirection: 'row',height:40,justifyContent:'center', alignItems:'center',marginTop: 65,marginLeft:37}}>
                    <TextInput
                      keyboardType={'numeric'}
                      style={styles.animatedView__image__view__input}
                      onChangeText={(current_data)=> this.setState({ current_data })}
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
            <Button style={{ backgroundColor: '#3B5998' }}>
              <Icon name="logo-facebook" />
            </Button>
          </Fab>
        </View>
        {(Platform.OS === 'ios')? <Footer navigation={navigation}/> : null}
      </Container>
    )
  }
}
function bindAction(dispatch) {
  return {
    patchReceipt: (data, token, id) => dispatch(patchReceipt(data, token, id)),
  };
}
const mapStateToProps = state => ({
  contracts: state.list_contracts.contracts,
  token: state.user.token,
});
export default connect(mapStateToProps, bindAction)(Measurements)
