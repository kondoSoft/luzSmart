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
} from 'native-base';
import {
  Platform
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Select, Option } from 'react-native-select-list';
import Header from '../header/index';
import Footer from '../footer/index';
import styles from './styles';
import { setContract } from '../../actions/contracts';


class AddContracts extends Component {
  constructor(props){
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
        "image" : require('../../../images/office.png')
    }
  }
  static navigationOptions = {
    header: null
  };
  handleName(event){
    this.setState({name: event.nativeEvent.text});
  }
  handleNumberContract(event){
    this.setState({number_contract: event.nativeEvent.text});
  }
  handleState(event){
    console.log('event', event);
    // this.setState({state: event.nativeEvent.text});
  }
  handleMunicipality(event){
    this.setState({municipality: event.nativeEvent.text});
  }
  handleRate(event){
    this.setState({rate: event.nativeEvent.text});
  }
  handlePeriodSummer(event){
    this.setState({period_summer: event.nativeEvent.text});
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
  }
  static propType = {
    setContract: React.PropTypes.func
  }
  render(){
    const { navigation } = this.props
    return(
      <Container>
        <Header title="AGREGAR CONTRATO" navigation={this.props.navigation}/>
        {(Platform.OS === 'android')? <Footer navigation={navigation}/> : null}
        <Grid>
          <Row size={15}>
            <Left style={ styles.row__top__left__right }>
              <Thumbnail source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }} />
            </Left>
            <Body>
              {/* <Text>Mi Casa</Text> */}
              <Input placeholder='Mi Casa' onChange={event => this.handleName(event)}/>
            </Body>
            <Right style={ styles.row__top__left__right }>
              <Icon name="md-create" style={ styles.row__top__col__right__icon }/>
            </Right>
          </Row>
          <Col size={70} style={styles.col__form}>
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
              onChange={event => this.handleState(event)}
              >
              <Option
                value={1}
                optionStyle={styles.select__option}
                >Tabasco</Option>
              <Option
                value={2}
                optionStyle={styles.select__option}
                >Veracruz</Option>
            </Select>
            <Select
              selectStyle={styles.select}
              padding={10}
              listHeight={100}
              caretSize={0}
              onChange={event => this.handleMunicipality(event)}
              >
              <Option
                value={1}
                optionStyle={styles.select__option}
                >Centro</Option>
              <Option
                value={2}
                optionStyle={styles.select__option}
                >Cardenas</Option>
            </Select>
            <Select
              selectStyle={styles.select}
              padding={10}
              listHeight={100}
              caretSize={0}
              onChange={event => this.handleRate(event)}
              >
              <Option
                value={1}
                optionStyle={styles.select__option}
                >Tarifa</Option>
              <Option
                value={2}
                optionStyle={styles.select__option}
                >Tarifa 1A</Option>
            </Select>
            <Select
              selectStyle={styles.select}
              padding={10}
              listHeight={100}
              caretSize={0}
              onChange={event => this.handlePeriodSummer(event)}
              >
              <Option
                value={1}
                optionStyle={styles.select__option}
                >Periodo</Option>
              <Option
                value={2}
                optionStyle={styles.select__option}
                >Feb - Julio</Option>
            </Select>
            <Row>
              <View style={styles.row__bottom__view__top}>
                <CheckBox checked={false} style={styles.CheckBox} />
                <Body style={{ flex: 0 }}>
                  <Text>Mensual</Text>
                </Body>
              </View>
              <View style={ styles.row__bottom__view__bottom }>
                <CheckBox checked={false} style={styles.CheckBox} />
                <Body style={{ flex: 0 }}>
                  <Text>Bimestral</Text>
                </Body>
              </View>
            </Row>
            </Form>
          </Col>
          <Row size={15} style={styles.row__bottom}>
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
  }
}
const mapStateToProps = state => ({
  contracts: state.list_contracts.contracts
})
export default connect(mapStateToProps, bindAction)(AddContracts);
