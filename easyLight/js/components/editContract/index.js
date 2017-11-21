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
  Alert,
  ActivityIndicator,
  AlertIOS
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Select, Option } from 'react-native-select-list';
import styles from './styles';
import {
  getMunicipality,
  getRate,
  resetRate,
  updateContract,
  deleteContract,
  getContract,
} from '../../actions/list_states_mx'
import ImagePicker from 'react-native-image-picker';
import { NavigationActions } from 'react-navigation';


let Screen = Dimensions.get('window')
var arrRangeDate = []
var arrRangeMonth= []
var arrRange = []
var that
class EditContracts extends Component {

  constructor(props){
    var optionsStates;
    var optionsRates;

    super(props)
    this.state = {
        "name" : props.navigation.state.params.contract['name_contract'],
        "number_contract" : 0,
        "state" : "",
        "municipality" : "",
        "rate" : "",
        "municipality_id": "",
        "state_id": "",
        "type_payment" : "",
        "receipt" : undefined,
        "cost" : 0,
        "checkedMen": false,
        "checkedBi": false,
        "avatarSource" : props.navigation.state.params.contract.image? {uri:props.navigation.state.params.contract.image} : require('../../../images/Casaplace.png'),
        "file" : null,
        rates: [],
        isLoading: true
    }
    this.handleRate = this.handleRate.bind(this)
    this.createRateSelect = this.createRateSelect.bind(this)
    that = this
  }
  static navigationOptions = ({ navigation, screenProps }) =>

    ({
      headerLeft: <Button transparent onPress={() => that.__proto__.returnScreen()}><Icon active style={{'color': 'white', fontSize: 35}} name="ios-arrow-back"/></Button>
    });

  returnScreen() {
    that.props.resetRate()
    that.props.navigation.goBack()
  }
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
  handleRate(value, key){
    this.setState({rate:key})
  }
  sendData(){
    var id = this.props.navigation.state.params.contract.id
    if (this.dataValidate(this.state)) {
      this.props.updateContract(this.state, this.props.token, id, this.props.navigation)
      if (Platform.OS === 'ios') {
        AlertIOS.alert(
          'Datos Actualizados',
          'Se han actualizado los datos del contrato',
          [
            {
              text: 'OK',
              onPress: () => { this.props.navigation.goBack() }
            }
          ]
        )
      }else {
        Alert.alert(
          'Datos Actualizados',
          'Se han actualizado los datos del contrato',
          [
            {
              text: 'OK',
              onPress: () => { this.props.navigation.goBack() }
            }
          ]
        )
      }
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

  ejectDelete(id, token){
    this.props.deleteContract(id, token, this.props.navigation)
    // const resetAction = NavigationActions.reset({
    //   index: 0,
    //   actions: [
    //     NavigationActions.navigate({ routeName: 'Contratos'})
    //   ]
    // })
    // this.props.navigation.dispatch(resetAction)
  }

  buttonDelete(params, token){
    console.log(params);
    if (Platform.OS === 'ios') {
      AlertIOS.alert(
        'Eliminar Contrato',
       'Desea eliminar el contrato?',
       [
         {text: 'No' },
         {text: 'Si', onPress: () => this.ejectDelete(params.contract.id, token)},
       ],
      );
    }
    else{
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
      checkedMen,
      checkedBi,
      type_payment,
      rate
    } = data;
    // Validacion de datos
    if (
        type_payment &&
        name &&
        (checkedMen || checkedBi)&&
        rate
      ) {
      return true
    }else {
      return false
    }

  }
  createRateSelect(){
    const {
      rates
    } = this.state

    if (rates.length > 0) {
      return(
        <Select
          selectStyle={styles.select}
          // padding={10}
          listHeight={250}
          caretSize={0}
          getRate
          onSelect={this.handleRate}
          >
          {rates.map((item, i) => {
          // console.log(item);
          return (<Option
            key={i}
            optionStyle={styles.select__option}
            >{item}</Option>)
        })}
      </Select>
      )
    }
  }

  // handleCheckedMen(check){
  //   if (check === 'mensual') {
  //     this.setState({
  //       checkedMen: true,
  //       type_payment: 'Mensual',
  //       checkedBi: false
  //     })
  //   }else {
  //     this.setState({
  //       checkedBi: true,
  //       type_payment: 'Bimestral',
  //       checkedMen:false
  //     })
  //   }
  // }


  // ******************************************
  componentWillMount(){
    const {contract} = this.props.navigation.state.params
    const {states_mx} = this.props

    this.setState({
        contract_id: contract.id,
        state_id:contract.state,
        municipality_id: contract.municipality.id,
        number_contract:contract.number_contract
    })

    states_mx.map((item,i)=>{
      if (contract.state === item.id) {
        this.setState({state:item.state})
        this.props.getMunicipality(item.id)
      }
    })
    if (contract['type_payment'] === 'Bimestral') {
      this.setState({
        checkedBi: true,
        type_payment: 'Bimestral'
      })
    }
    if (contract['type_payment'] === 'Mensual') {
      this.setState({
        checkedMen: true,
        type_payment: 'Mensual'
      })
    }
  }
  componentWillReceiveProps(nextProps){
    nextProps.municipality_mx.map(item => {

      if (item.id === this.props.navigation.state.params.contract.municipality.id) {
        this.setState({municipality: item['name_mun']})
        this.props.getRate(item.id, this.props.token)
      }
    })
    if (typeof nextProps.mun_rate === 'string') {
      //array of rates
      const rates = ['TARIFA 1', 'TARIFA 1A', 'TARIFA 1B', 'TARIFA 1C', 'TARIFA 1D', 'TARIFA 1E', 'TARIFA 1F']
      // put inside of an array the municipality rate
      const rate_unique = [this.props.navigation.state.params.contract.rate]
      //function that return a condiciton => return all rates that are different from the municipality
      const inRates = (rate) => {
        return rate != this.props.navigation.state.params.contract.rate
      }
      //filter the array of rates => return a new array with all rates except the munucipality rate
      var rate = rates.filter(inRates)
      //concat the arrays of rates => rate and rate_unique
      const selectRates = rate_unique.concat(rate)

      this.setState({
        rates: selectRates,
        isLoading: false,
        rate:nextProps.mun_rate
      })
    }
  }
  render(){
    const {
      navigation,
      states_mx,
      municipality_mx,
      mun_rate
    } = this.props
    return(
      <Container style={{backgroundColor:'#fff'}}>
        <ScrollView scrollEnabled={false}>
          <Grid style={{alignItems: 'center',height: Screen.height / 1.2}}>
            <Row size={7} style={{ justifyContent: 'center', paddingTop: 10, paddingBottom: 10}}>
              <Left style={{marginLeft:19}}>
                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                  <View style={{marginBottom: 0,height: 65,width: '100%',justifyContent:'center'}}>
                   <Thumbnail source={ (this.state.file != null)? this.state.file : this.state.avatarSource} />
                  </View>
                </TouchableOpacity>
              </Left>
              <Body style={{height: 30,flex:2}}>
                <Input value={this.state.name} style={{textAlign: 'center',width: '100%',padding: 0}} placeholder='Mi Casa' onChange={event => this.handleName(event)}/>
              </Body>
              <Right style={ styles.row__top__left__right }>
                {/* <Icon name="md-create" style={ styles.row__top__col__right__icon }/> */}
              </Right>
            </Row>
            <View style={{borderBottomWidth: 3, borderColor: 'green', width: '88%'}}></View>
            <Col size={ (Platform.OS === 'ios')? 39 : 29 } style={ styles.col__form }>
              <Item fixedLabel style={styles.col__form__item}>
                <Input value={navigation.state.params.contract['number_contract']} editable={false} keyboardType={'numeric'} style={{paddingLeft:10}}/>
              </Item>
              <Item fixedLabel style={styles.col__form__item}>
                <Input value={this.state.state} editable={false} keyboardType={'numeric'}  style={{paddingLeft:10}}/>
              </Item>
              <Item fixedLabel style={styles.col__form__item}>
                <Input value={this.state.municipality} editable={false} keyboardType={'numeric'} style={{paddingLeft:10}}/>
              </Item>
              {this.createRateSelect()}
            </Col>
            {(Platform.OS === 'ios')? <View style={{height:15}}></View> : <View style={{height: 0}}></View>}
            <Row size={6} style={{marginBottom:(Platform.OS === 'ios')? 20 : 0}}>
              <View style={styles.row__bottom__view__top}>
                <CheckBox checked={this.state.checkedMen} style={styles.CheckBox} />
                <Body style={{ flex: 0 }}>
                  <Text>Mensual</Text>
                </Body>
              </View>
              <View style={ styles.row__bottom__view__bottom }>
                <CheckBox checked={this.state.checkedBi} style={styles.CheckBox} />
                <Body style={{ flex: 0 }}>
                  <Text>Bimestral</Text>
                </Body>
              </View>
            </Row>
            <Row size={6} style={[styles.row__bottom,{ paddingBottom: (Platform.OS === 'ios')? 30 : 0}]}>
              <Button
                large
                primary
                onPress={() => this.sendData()}
                >
                <Text>Actualizar</Text>
              </Button>

            </Row>
            <Row size={5} style={[styles.row__bottom,{ paddingBottom: (Platform.OS === 'ios')? 0 : 0}]}>
              <Button
                small
                danger
                onPress={() => this.buttonDelete(this.props.navigation.state.params, this.props.screenProps.token)}
                >
                <Text>Eliminar</Text>
              </Button>
            </Row>
          </Grid>
        </ScrollView>
        {
          (this.state.isLoading)?
          <View style={styles.loadingContainer}>
            <ActivityIndicator />
          </View> : null
        }

      </Container>
    )
  }
}
function bindAction(dispatch){
  return {
    getMunicipality: state_id =>dispatch(getMunicipality(state_id)),
    getRate: (mun_id, token) => dispatch(getRate(mun_id, token)),
    resetRate: ()=> dispatch(resetRate()),
    updateContract: (data, token, id, navigation)=> dispatch(updateContract(data, token, id, navigation)),
    deleteContract: (id, token, navigation) => dispatch(deleteContract(id, token, navigation)),
    getContract: (token, navigation) => dispatch(getContract(token, navigation))
  }
}
const mapStateToProps = state => ({
  states_mx: state.list_states_mx.results,
  municipality_mx: state.list_mun_mx.results,
  list_rate: state.list_rate.list_rate,
  mun_rate: state.list_rate.results,
  token: state.user.token,
})
export default connect(mapStateToProps, bindAction)(EditContracts);
