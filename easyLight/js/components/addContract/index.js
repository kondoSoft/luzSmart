import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  Container,
  Left,
  Label,
  Body,
  Button,
  Right,
  Thumbnail,
  Text,
  Icon,
  Item,
  Input,
  Form,
  View,
  CheckBox,
  Image,
  Radio
} from 'native-base';
import {
  Platform,
  TouchableOpacity,
  Picker,
  Dimensions,
  ScrollView,
  TextInput,
  Alert
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Select, Option } from 'react-native-select-list';
import Header from '../header/index';
import Footer from '../footer/index';
import styles from './styles';
import { getMunicipality, resetMunicipality, postContract, getRate, resetRate } from '../../actions/list_states_mx'
import ImagePicker from 'react-native-image-picker';
let Screen = Dimensions.get('window')

var arrRangeDate = []
var arrRangeMonth= []
var arrRange = []
class AddContracts extends Component {

  constructor(props){
    var optionsStates;
    var optionsRates;

    super(props)
    this.state = {
        "name" : "",
        "number_contract" : 0,
        "state" : "",
        "municipality" : "",
        "rate" : "",
        "initialDateRange": "",
        "finalDateRange": "",
        "type_payment" : "",
        "receipt" : undefined,
        "cost" : 0,
        "checkedMen": false,
        "checkedBi": false,
        "avatarSource" : require('../../../images/Casaplace.png'),
        "file" : null,
        rates: []
    }
  }
  static propType = {
    postContract: React.PropTypes.func,
    getMunicipality: React.PropTypes.func,
    resetMunicipality: React.PropTypes.func,
    getRate: React.PropTypes.func,

  }
  static navigationOptions = {
    header: null
  };
  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          avatarSource: response.uri,
          file: response
        });
      }
    });
  }
  handleName(event){
    this.setState({name: event.nativeEvent.text});
  }
  handleNumberContract(event){
    this.setState({number_contract: event.nativeEvent.text});
  }
  handleState(value, item){
    this.props.resetMunicipality()
    if (Platform.OS === 'ios') {
      this.props.getMunicipality(value+1)
      this.setState({
        state: value+1
      })
    }else {
      this.props.getMunicipality(value)
      this.setState({
        state: value
      })
    }
  }
  handleMunicipality(value, item){
    this.props.resetRate()
    const mun_id = (Platform.OS === 'ios')? value.id : value
    this.props.getRate(mun_id, this.props.token)
    this.setState({municipality: value.id});
  }
  handlePeriodSummer(value){
    const initialRange = arrRange[value].initialRange
    const finalRange = arrRange[value].finalRange
    const monthInitial = initialRange.getMonth()+1
    const monthFinal = finalRange.getMonth()+1
    const initialDateRange = initialRange.getFullYear() + '-' + ((''+monthInitial).length<2 ? '0': '') + monthInitial + '-' +  ((''+initialRange.getDay()).length<2 ? '0' : '') + initialRange.getDay()
    const finalDateRange = finalRange.getFullYear() + '-' + ((''+monthFinal).length<2 ? '0' : '') + monthFinal + '-' +  ((''+finalRange.getDay()).length<2 ? '0' : '') + finalRange.getDay()
    this.setState({
      initialDateRange,
      finalDateRange,
    })
  }
  handleTypePayment(event){
    this.setState({type_payment: event.nativeEvent.text});
  }
  handleCost(event){
    this.setState({cost: event.nativeEvent.text});
  }
  sendData(){
    if (this.dataValidate(this.state)) {
      this.props.postContract(this.state, this.props.mun_rate,this.props.token)
      this.props.navigation.navigate('Receipt')
    }else {
      Alert.alert(
        'Datos incompletos',
        'Todos los campos son obligatorios',
        [
          {text: 'Aceptar'},
        ],
      )
    }
  }
  dataValidate(data){
    const {
      name,
      state,
      number_contract,
      municipality,
      finalDateRange,
      initialDateRange,
      checkedMen,
      checkedBi
    } = data;
    // Validacion de datos
    if (
        state &&
        name &&
        (number_contract || number_contract.length > 0) &&
        municipality &&
        finalDateRange &&
        initialDateRange &&
        (checkedMen || checkedBi)
      ) {
      return true
    }else {
      return false
    }

  }

  // falta condicion para hacer check en uno u otro
  handleCheckedMen(check){
    if (check === 'mensual') {
      this.setState({
        checkedMen: true,
        type_payment: 'Mensual',
        checkedBi: false
      })
    }else {
      this.setState({
        checkedBi: true,
        type_payment: 'Bimestral',
        checkedMen:false
      })
    }
  }
  // ******************************************
  componentWillMount(){
    optionsStates = this.props.states_mx.map((item,i)=>{
      return (<Option
        key={i}
        value={i}
        optionStyle={styles.select__option}
        >{item.state}</Option>
      )
    })

    if (Platform.OS === 'android') {
      optionsStates = this.props.states_mx.map((item,i)=>{
        return(
          <Picker.Item key={i} label={item.state} value={i}/>
        )
      })
    }
    this.createRangeDate()
  }
  componentWillReceiveProps(nextProps){
    if (typeof nextProps.mun_rate === 'string') {
      //array of rates
      const rates = ['TARIFA 1', 'TARIFA 1A', 'TARIFA 1B', 'TARIFA 1C', 'TARIFA 1D', 'TARIFA 1E', 'TARIFA 1F']
      // put inside of an array the municipality rate
      const rate_unique = [nextProps.mun_rate]
      //function that return a condiciton => return all rates that are different from the municipality
      const inRates = (rate) => {
        return rate != nextProps.mun_rate
      }
      //filter the array of rates => return a new array with all rates except the munucipality rate
      var rate = rates.filter(inRates)
      //concat the arrays of rates => rate and rate_unique
      const selectRates = rate_unique.concat(rate)

      this.setState({
        rates: selectRates
      })
    }
  }
  createRangeDate(){
    var arrMonth = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

    for (var i = 1; i < 5; i++) {
      var initialRange = new Date(new Date().getFullYear(),'0' + i, '01')
      initialRange.setDate(1)
      const finalRange = new Date(new Date(initialRange).setMonth(initialRange.getMonth()+6))

      var finalDay = new Date(finalRange.setDate(0))

      arrRangeDate.push(arrMonth[initialRange.getMonth()] + '-' + arrMonth[finalRange.getMonth()]);
      arrRange.push({initialRange: initialRange, finalRange: finalRange})
    }
  }
  render(){
    
    const { navigation, states_mx, municipality_mx, mun_rate } = this.props
    var periodSummer = (
      <Select
        selectStyle={styles.select}
        padding={10}
        listHeight={200}
        caretSize={0}
        onSelect={value => this.handlePeriodSummer(value)}
        >
        {/* <Option>Periodo</Option> */}
        {arrRangeDate.map((item, i)=>{
          return <Option
            key={i}
            value={i}
            optionStyle={styles.select__option}
            >{item}</Option>
        })}
      </Select>
    )
    var selectMun = (
    <Select
      selectStyle={styles.select}
      padding={10}
      listHeight={250}
      caretSize={0}
      defaultValue={'Estados'}
      onSelect={(value, key) => this.handleMunicipality(value, key)}
      >
        {this.props.municipality_mx.map((item,i)=>{
          return (<Option
            key={i}
            value={item}
            optionStyle={styles.select__option}
            >{item.name_mun}</Option>)
        })}
    </Select>
    )
    var selectRate = (
      <Select
        selectStyle={styles.select}
        padding={10}
        listHeight={250}
        caretSize={0}
        getRate
        >
          {
            (this.state.rates.length != 0)&&
              this.state.rates.map((rate,i)=>{
              return (<Option
                key={i}
                optionStyle={styles.select__option}
                >{rate}</Option>)
              })
          }
      </Select>
    )
    if (Platform.OS === 'android') {
      selectMun = (
      <View style={styles.selectPicker}>
        <Picker
          selectedValue={this.state.municipality}
          onValueChange={(value, key) => this.handleMunicipality(value, key)}
        >
        {this.props.municipality_mx.map((item,i)=>{
          return <Picker.Item key={i} label={item.name_mun} value={i} />
        })
        }
        </Picker>
      </View>
      )
      periodSummer = (
        <View style={styles.selectPicker}>
          <Picker
            selectedValue={this.state.language}
            onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
            {arrRangeDate.map((item, i)=>{
              return <Picker.item
                        key={i}
                        label={item}
                        value={item}
                      />
            })}
          </Picker>
        </View>
      )
      selectRate = (
        <View style={styles.selectPicker}>
          <Picker
            selectedValue={this.state.language}
            onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
            {arrRangeDate.map((item, i)=>{
              return <Picker.item
                        key={i}
                        label={item}
                        value={item}
                      />
            })}
            {selectRates.map((rate,i)=>{
              return <Picker.item
                      key={i}
                      value={rate}
                      value={rate.rate}
                    />
            })}
          </Picker>
        </View>
      )
    }
    return(
      <Container style={{backgroundColor:'#fff'}}>
        <Header title="Agregar Contrato" navigation={this.props.navigation}/>
        {(Platform.OS === 'android')? <Footer navigation={navigation} viewContract={this.props.screenProps.contracts}/> : null}
        <ScrollView scrollEnabled={false}>
          <Grid style={{alignItems: 'center',height: Screen.height / 1.2}}>
            <Row size={7} style={{ justifyContent: 'center', paddingTop: 5, paddingBottom: 5}}>
              <Left style={{marginLeft:19}}>
                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                  <View style={{marginBottom: 0,height: 65,width: '100%',justifyContent:'center'}}>
                   <Thumbnail source={ (this.state.file != null)? this.state.file : this.state.avatarSource} />
                  </View>
                </TouchableOpacity>
              </Left>
              <Body style={{height: 30,flex:2}}>
                <Input style={{width: '100%',padding: 0}} placeholder='Mi Casa' onChange={event => this.handleName(event)}/>
              </Body>
              <Right style={ styles.row__top__left__right }>
                {/* <Icon name="md-create" style={ styles.row__top__col__right__icon }/> */}
              </Right>
            </Row>
            <View style={{borderBottomWidth: 3, borderColor: 'green', width: '88%'}}></View>
            <Col size={ (Platform.OS === 'ios')? 40 : 29 } style={ styles.col__form }>
              <Form>
                <Item fixedLabel style={styles.col__form__item}>
                  <Input keyboardType={'numeric'} placeholder={'No Contrato'} style={{paddingLeft:10,paddingTop:15}} onChange={event => this.handleNumberContract(event)}/>
                </Item>
              { (Platform.OS === 'ios')?
                <Select
                  selectStyle={styles.select}
                  padding={10}
                  listHeight={200}
                  caretSize={0}
                  defaultValue='27'
                  onSelect={(value, key) => this.handleState(value, key)}
                  >
                  {optionsStates}
                </Select> :
                <View style={styles.selectPicker}>
                  <Picker
                    selectedValue={this.state.state}
                    onValueChange={(value, key) => this.handleState(value, key)}
                    >
                    {optionsStates}
                  </Picker>
                </View>
              }
              { (municipality_mx.length == 0) ? <View style={{height:40,marginTop:10,marginBottom:10}}/> : selectMun}
              {/* { (mun_rate.length == 0) ? <View style={{height:40,marginTop:0,marginBottom:0}}/> : <Text style={{height:40,marginTop:0,marginLeft:(Platform.OS === 'ios')? 10 : 5,
                                                                                                                            marginRight:(Platform.OS === 'ios')? 10 : 5,
                                                                                                                            textAlignVertical:'center',
                                                                                                                            paddingLeft:10,
                                                                                                                            paddingTop:7,
                                                                                                                            textAlign:'left'}}>
                                                                                                                            {mun_rate}
                                                                                                                          </Text>} */}
              { (mun_rate.length != 0)? selectRate : <View style={{height:40,marginTop:10,marginBottom:10}}/> }
              { periodSummer }
              </Form>
            </Col>
            {(Platform.OS === 'ios')? <View style={{height:15}}></View> : <View style={{height: 0}}></View>}
            <Row size={6} style={{marginBottom:(Platform.OS === 'ios')? 20 : 0}}>
              <View style={styles.row__bottom__view__top}>
                <CheckBox checked={this.state.checkedMen} style={styles.CheckBox} onPress={()=>this.handleCheckedMen('mensual')}/>
                <Body style={{ flex: 0 }}>
                  <Text>Mensual</Text>
                </Body>
              </View>
              <View style={ styles.row__bottom__view__bottom }>
                <CheckBox checked={this.state.checkedBi} style={styles.CheckBox} onPress={()=>this.handleCheckedMen('bimestral')}/>
                <Body style={{ flex: 0 }}>
                  <Text>Bimestral</Text>
                </Body>
              </View>
            </Row>
            <Row size={5} style={[styles.row__bottom,{ paddingBottom: (Platform.OS === 'ios')? 30 : 0}]}>
              <Button
                small
                primary
                onPress={() => this.sendData()}
                >
                <Text>Agregar</Text>
              </Button>
            </Row>
          </Grid>
        </ScrollView>
        {(Platform.OS === 'ios')? <Footer navigation={navigation} viewContract={this.props.screenProps.contracts} /> : null}
      </Container>
    )
  }
}
function bindAction(dispatch){
  return {
    postContract: (list, rate, token) =>dispatch(postContract(list, rate, token)),
    getMunicipality: state_id =>dispatch(getMunicipality(state_id)),
    resetMunicipality: () => dispatch(resetMunicipality()),
    getRate: (mun_id, token) => dispatch(getRate(mun_id, token)),
    resetRate: ()=> dispatch(resetRate())
  }
}
const mapStateToProps = state => ({
  states_mx: state.list_states_mx.results,
  municipality_mx: state.list_mun_mx.results,
  list_rate: state.list_rate.list_rate,
  mun_rate: state.list_rate.results,
  token: state.user.token,
})
export default connect(mapStateToProps, bindAction)(AddContracts);
