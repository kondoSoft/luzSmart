import React, { Component } from 'react';
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

let Screen = Dimensions.get('window')


class Measurements extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props){
    super(props)

    this.state = {
      active: false,
      scroll: false,
    }
    this._keyboardDidHide = this._keyboardDidHide.bind(this)
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
  render(){
    const { navigation } = this.props
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
                {(Platform.OS === 'ios')?
                <Select
                  selectStyle={styles.col__row__top__select}
                  padding={5}
                  listHeight={100}
                  caretSize={0}
                  >
                  <Option
                    value={1}
                    optionStyle={styles.col__row__select__option}
                    >#123456</Option>
                  <Option
                    value={2}
                    optionStyle={styles.col__row__select__option}
                    >List Item 2</Option>
                  <Option
                    value={3}
                    optionStyle={styles.col__row__select__option}
                    >List Item 3</Option>
                </Select> :
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
              <Row style={styles.grid__col__select__row__bottom}>
                <Text style={styles.grid__row__top__view}>Periodo</Text>
                {(Platform.OS === 'ios')?
                <Select
                  selectStyle={styles.col__row__top__select}
                  padding={5}
                  listHeight={100}
                  caretSize={0}
                  >
                  <Option
                    value={1}
                    optionStyle={styles.col__row__select__option}
                    >Marzo 2017</Option>
                  <Option
                    value={2}
                    optionStyle={styles.col__row__select__option}
                    >List Item 2</Option>
                  <Option
                    value={3}
                    optionStyle={styles.col__row__select__option}
                    >List Item 3</Option>
                </Select> :
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
                  <Text style={styles.row__bottom__list__listItem__textBottom}>5,400</Text>
                </ListItem>
                <ListItem last>
                  <Text style={styles.row__bottom__list__listItem__textTop}>Ultima Lectura Diaria</Text>
                  <Text style={styles.row__bottom__list__listItem__textBottom}>5,500</Text>
                </ListItem>
                <ListItem last style={styles.row__bottom__list__listItem}>
                  <Text style={styles.row__bottom__list__listItem__textTop}>Consumo en KWh</Text>
                  <Text style={styles.row__bottom__list__listItem__textBottom}>100</Text>
                </ListItem>
              </List>
            </Row>
            <Row size={30} style={{alignItems: 'flex-start', justifyContent: (Platform.OS === 'ios')? 'center' : 'center',paddingTop: (Screen.height <= 640)? 30 : 0}}>
              <Image resizeMode={'stretch'} source={require('../../../images/medidor.png')} style={styles.animatedView__image}>
                <View style={styles.animatedView__image__view}>
                  <TextInput
                    keyboardType={'numbers-and-punctuation'}
                    style={styles.animatedView__image__view__input}
                    onFocus={ (Platform.OS === 'android')? () => this.refs['scroll'].scrollTo({y: 300 }) : null }
                  />
                  <Button
                    small
                    style={styles.animatedView__image__view__btn}
                    onPress={() => this.props.navigation.navigate("Contact")}
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
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="share" />
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

export default Measurements;
