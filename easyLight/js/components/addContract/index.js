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
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Select, Option } from 'react-native-select-list';
import Header from '../header/index';
import Footer from '../footer/index';
import styles from './styles';
import { setContract } from '../../actions/contracts';
import { getMunicipality, resetMunicipality } from '../../actions/list_states_mx'
import ImagePicker from 'react-native-image-picker';

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
        "image" : require('../../../images/office.png'),
        "checkedMen": false,
        "checkedBi": false,
        "avatarSource" : null,
    }
  }
  static propType = {
    setContract: React.PropTypes.func,
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
        let source = { uri: response.origURL };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
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
    this.setState({state: item});
  }
  handleMunicipality(value, item){
    console.log('valor municipio', value, item);
    this.setState({municipality: item});
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
    this.props.setContract(this.state)

    this.props.navigation.navigate('Contracts')
    console.log(this.state);
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
        >{item.state}</Option>)
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
  }
  render(){
    const { navigation, states_mx, municipality_mx } = this.props
    const selectMun =
    <Select
      selectStyle={styles.select}
      padding={10}
      listHeight={100}
      caretSize={0}
      onSelect={(value, key) => this.handleMunicipality(value, key)}
      >
        {this.props.municipality_mx.map((item,i)=>{
          return (<Option
            key={i}
            value={i}
            optionStyle={styles.select__option}
            >{item.name_mun}</Option>)
        })}
    </Select>
    return(
      <Container>
        <Header title="Agregar Contrato" navigation={this.props.navigation}/>
        {(Platform.OS === 'android')? <Footer navigation={navigation}/> : null}
        <Grid>
          <Row size={15}>
            <Left style={ styles.row__top__left__right }>
              <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                <View style={{marginBottom: 20}}>
                { this.state.avatarSource === null && <Text>Select a Photo</Text>
                  // {/* <Image  source={this.state.avatarSource} /> */}
                }
                </View>
              </TouchableOpacity>
              {/* <Thumbnail source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }} /> */}
            </Left>
            <Body>
              {/* <Text>Mi Casa</Text> */}
              <Input placeholder='Mi Casa' onChange={event => this.handleName(event)}/>
            </Body>
            <Right style={ styles.row__top__left__right }>
              <Icon name="md-create" style={ styles.row__top__col__right__icon }/>
            </Right>
          </Row>
          <Col size={(Platform.OS === 'ios')? 40 : 70} style={ styles.col__form }>
            <Form>
              <Item fixedLabel style={styles.col__form__item}>
              <Label>No Contrato</Label>
              <Input onChange={event => this.handleNumberContract(event)}/>
            </Item>
            <Select
              selectStyle={styles.select}
              padding={10}
              listHeight={100}
              caretSize={0}
              onSelect={(value, key) => this.handleState(value, key)}
              >
              {optionsStates}
            </Select>
            { (municipality_mx.length == 0) ? <View/> : selectMun}
            <Select
              selectStyle={styles.select}
              padding={10}
              listHeight={100}
              caretSize={0}
              onSelect={(value, key) => this.handleRate(value, key)}
              >
              {optionsRates}
            </Select>
            <Select
              selectStyle={styles.select}
              padding={10}
              listHeight={100}
              caretSize={0}
              onSelect={value => this.handlePeriodSummer(value)}
              >
              <Option
                value={1}
                optionStyle={styles.select__option}
                >Periodo</Option>
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
            </Form>
          </Col>
          <Row size={8}>
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
          <Row size={7} style={[styles.row__bottom,{ paddingBottom: (Platform.OS === 'ios')? 30 : 10 }]}>
            <Button
              small
              primary
              onPress={() => this.sendData()}
              >
              <Text>Agregar</Text>
            </Button>
          </Row>
        </Grid>
        {(Platform.OS === 'ios')? <Footer navigation={navigation}/> : null}
      </Container>
    )
  }
}
function bindAction(dispatch){
  return {
    setContract: name =>dispatch(setContract(name)),
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
