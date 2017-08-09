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
} from 'native-base';
import {
  Platform,
  TouchableOpacity,
  Picker,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Select, Option } from 'react-native-select-list';
import Header from '../header/index';
import Footer from '../footer/index';
import styles from './styles';
import { getMunicipality, resetMunicipality, postContract } from '../../actions/list_states_mx'
import ImagePicker from 'react-native-image-picker';

let Screen = Dimensions.get('window')

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
        "period_summer" : "",
        "type_payment" : "",
        "receipt" : undefined,
        "cost" : 0,
        // "image" : require('../../../images/office.png'),
        "checkedMen": false,
        "checkedBi": false,
        "avatarSource" : null,
        "file" : null,
    }
  }
  static propType = {
    postContract: React.PropTypes.func,
    getMunicipality: React.PropTypes.func,
    resetMunicipality: React.PropTypes.func,
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
    this.props.getMunicipality(value+1)
    this.setState({state: value+1});
  }
  handleMunicipality(value, item){
    this.setState({municipality: value.id});
  }
  handleRate(value, item){
    this.setState({rate: item});
  }
  handlePeriodSummer(value){
    this.setState({period_summer: value});
  }
  handleTypePayment(event){
    this.setState({type_payment: event.nativeEvent.text});
  }
  handleCost(event){
    this.setState({cost: event.nativeEvent.text});
  }
  sendData(){
    this.props.postContract(this.state)
    this.props.navigation.navigate('Receipt')
  }
  // falta condicion para hacer check en uno u otro
  handleCheckedMen(){
    this.setState({checkedMen: !this.state.checkedMen,
    type_payment: 'Mensual'})
  }
  handleCheckedBi(){
    this.setState({checkedBi: !this.state.checkedBi,
    type_payment: 'Bimestral'})
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
    optionsRates = this.props.list_rate.map((item,i)=>{
      return (
        <Option
          key={i}
          value={i}
          optionStyle={styles.select__option}
          >{item.name_rate}</Option>
      )
    })
    if (Platform.OS === 'android') {
      optionsStates = this.props.states_mx.map((item,i)=>{
        return(
          <Picker.Item key={i} label={item.state} value={i}/>
        )
      })
      optionsRates = this.props.list_rate.map((item,i)=>{
        return(
          <Picker.Item key={i} label={item.name_rate} value={i}/>
        )
      })
    }
  }

  render(){
    const { navigation, states_mx, municipality_mx } = this.props
    var periodSummer = (
      <Select
        selectStyle={styles.select}
        padding={10}
        listHeight={200}
        caretSize={0}
        onSelect={value => this.handlePeriodSummer(value)}
        >
        <Option
          value={1}
          optionStyle={styles.select__option}
          >Periodo de Verano</Option>
        <Option
          value={2}
          optionStyle={styles.select__option}
          >Feb - Jul</Option>
        <Option
          value={3}
          optionStyle={styles.select__option}
          >Mar - Ago</Option>
        <Option
          value={4}
          optionStyle={styles.select__option}
          >Abr - Sep</Option>
        <Option
          value={5}
          optionStyle={styles.select__option}
          >Mayo - Oct</Option>
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
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
        </View>
      )
    }
    return(
      <Container style={{backgroundColor:'#fff'}}>
        <Header title="Agregar Contrato" navigation={this.props.navigation}/>
        {(Platform.OS === 'android')? <Footer navigation={navigation}/> : null}
        <ScrollView>
          <Grid style={{alignItems: 'center',height: Screen.height / 1.2}}>
            <Row size={12} style={{ justifyContent: 'center', paddingTop: 5, paddingBottom: 5}}>
              <Left style={{marginLeft:19}}>
                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                  <View style={{marginBottom: 0,height: 65,width: '100%',justifyContent:'center'}}>
                  { this.state.avatarSource === null ? <Text style={{textAlign: 'center'}}>Select a Photo</Text> : <Thumbnail source={{ uri: this.state.avatarSource }} />  }
                  </View>
                </TouchableOpacity>
              </Left>
              <Body style={{height: 30,flex:2}}>
                <Input style={{textAlign: 'center',width: '100%',padding: 0}} placeholder='Mi Casa' onChange={event => this.handleName(event)}/>
              </Body>
              <Right style={ styles.row__top__left__right }>
                <Icon name="md-create" style={ styles.row__top__col__right__icon }/>
              </Right>
            </Row>
            <View style={{borderBottomWidth: 3, borderColor: 'green', width: '88%'}}></View>
            <Col size={ (Platform.OS === 'ios')? 40 : 29 } style={ styles.col__form }>
              <Form>
                <Item fixedLabel style={styles.col__form__item}>
                  <Input placeholder={'No Contrato'} onChange={event => this.handleNumberContract(event)}/>
                </Item>
              { (Platform.OS === 'ios')?
                <Select
                  selectStyle={styles.select}
                  padding={10}
                  listHeight={200}
                  caretSize={0}
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
              { (municipality_mx.length == 0) ? <View/> : selectMun}
              { (Platform.OS === 'ios')?
              <Select
                selectStyle={styles.select}
                padding={10}
                listHeight={200}
                caretSize={0}
                onSelect={(value, key) => this.handleRate(value, key)}
                >
                {optionsRates}
              </Select> :
              <View style={styles.selectPicker}>
                <Picker
                  selectedValue={this.state.rate}
                  onValueChange={(value, key) => this.handleRate(value, key)}
                  >
                  {optionsRates}
                </Picker>
              </View>
              }
              { periodSummer }
              </Form>
            </Col>
            {(Platform.OS === 'ios')? <View style={{height:15}}></View> : <View style={{height: 20}}></View>}
            <Row size={6} style={{marginBottom:(Platform.OS === 'ios')? 20 : 20}}>
              <View style={styles.row__bottom__view__top}>
                <CheckBox checked={this.state.checkedMen} style={styles.CheckBox} onPress={()=>this.handleCheckedMen()}/>
                <Body style={{ flex: 0 }}>
                  <Text>Mensual</Text>
                </Body>
              </View>
              <View style={ styles.row__bottom__view__bottom }>
                <CheckBox checked={this.state.checkedBi} style={styles.CheckBox} onPress={()=>this.handleCheckedBi()}/>
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
    postContract: list =>dispatch(postContract(list)),
    getMunicipality: state_id =>dispatch(getMunicipality(state_id)),
    resetMunicipality: () => dispatch(resetMunicipality()),
  }
}
const mapStateToProps = state => ({
  states_mx: state.list_states_mx.results,
  municipality_mx: state.list_mun_mx.results,
  list_rate: state.list_rate.list_rate,
})
export default connect(mapStateToProps, bindAction)(AddContracts);
