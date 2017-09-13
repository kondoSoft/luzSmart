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
class EditContracts extends Component {

  constructor(props){
    var optionsStates;
    var optionsRates;

    super(props)
    this.state = {
        "name" : props.navigation.state.params['name_contract'],
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
        "avatarSource" : props.navigation.state.params.image? {uri:props.navigation.state.params.image} : require('../../../images/Casaplace.png'),
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


  // ******************************************
  componentWillMount(){
    console.log(this.props);
    const {params} = this.props.navigation.state
    const {states_mx} = this.props
    states_mx.map((item,i)=>{
      if (params.state === item.id) {
        this.setState({state:item.state})
        this.props.getMunicipality(item.id)
      }
    })
    if (params['type_payment'] === 'Bimestral') {
      this.setState({checkedBi: true})
    }
    if (params['type_payment'] === 'Mensual') {
      this.setState({checkedMen: true})
    }
  }
  componentWillReceiveProps(nextProps){
    nextProps.municipality_mx.map(item => {
      if (item.id === this.props.navigation.state.params.municipality) {
        this.setState({municipality: item['name_mun']})
      }
    })
  }
  render(){
    console.log(this.props.navigation.state.params);
    const { navigation, states_mx, municipality_mx, mun_rate } = this.props

    return(
      <Container style={{backgroundColor:'#fff'}}>
        <Header title="Editar Contrato" navigation={this.props.navigation}/>
        {(Platform.OS === 'android')? <Footer navigation={navigation}/> : null}
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
                <Input value={this.state.name} style={{textAlign: 'center',width: '100%',padding: 0}} placeholder='Mi Casa' onChange={event => this.handleName(event)}/>
              </Body>
              <Right style={ styles.row__top__left__right }>
                {/* <Icon name="md-create" style={ styles.row__top__col__right__icon }/> */}
              </Right>
            </Row>
            <View style={{borderBottomWidth: 3, borderColor: 'green', width: '88%'}}></View>
            <Col size={ (Platform.OS === 'ios')? 40 : 29 } style={ styles.col__form }>
              <Item fixedLabel style={styles.col__form__item}>
                <Input value={navigation.state.params['number_contract']} editable={false} keyboardType={'numeric'} style={{paddingLeft:10}}/>
              </Item>
              <Item fixedLabel style={styles.col__form__item}>
                <Input value={this.state.state} editable={false} keyboardType={'numeric'}  style={{paddingLeft:10}}/>
              </Item>
              <Item fixedLabel style={styles.col__form__item}>
                <Input value={this.state.municipality} editable={false} keyboardType={'numeric'} style={{paddingLeft:10}}/>
              </Item>
              <Item fixedLabel style={styles.col__form__item}>
                <Input value={navigation.state.params['rate']} editable={false} keyboardType={'numeric'} style={{paddingLeft:10}}/>
              </Item>
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
        {(Platform.OS === 'ios')? <Footer navigation={navigation}/> : null}
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
export default connect(mapStateToProps, bindAction)(EditContracts);
