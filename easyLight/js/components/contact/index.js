import React , { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Item,
  Input,
  Text,
  Button,
  View,
} from 'native-base';
import {
  TextInput,
  Platform,
  ScrollView,
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Select, Option } from 'react-native-select-list';
import Header from '../header/index';
import Footer from '../footer/index';
import styles from './styles';

class Contact extends Component{
  static navigationOptions = {
    header: null
  };
  render(){
    console.log(this.props.user);
    return(
      <Container>
        <Header navigation={this.props.navigation} title="CONTACTO"/>
        {(Platform.OS === 'android')? <Footer navigation={this.props.navigation}/> : null}
        <ScrollView style={ styles.grid } contentContainerStyle={{flex:1}}>
          <Row size={20} style={styles.row__top}>
            <Text style={styles.row__top__text}>Gracias por usar Easy light, tu asistente de confianza.</Text>
            <Text style={styles.row__top__text}>Tu opinión es muy importante para nosotros</Text>
          </Row>
          <Col size={20} style={styles.col__select}>
            <Select
              style={styles.select}
              padding={10}
              listHeight={100}
              caretSize={0}
              >
                <Option
                  value={1}
                  optionStyle={styles.select__option}
                  >Por qué nos contacta?</Option>
                <Option
                  value={2}
                  optionStyle={styles.select__option}
                  >No puedo agregar un recibo fallas en la App</Option>
            </Select>
          </Col>
          <Col size={60} style={styles.row__bottom}>
            {/* <Item regular last style={styles.col__bottom__item}>
              <Input />
            </Item> */}
            <TextInput
              style={styles.col__bottom__item}
              multiline = {true}
              numberOfLines = {4}
            />
            <View style={styles.col__view__bottom}>
              <Button small primary style={{}}>
                <Text>Enviar</Text>
              </Button>
            </View>
          </Col>
        </ScrollView>
          {(Platform.OS === 'ios')? <Footer navigation={this.props.navigation}/> : null}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.userData,
})
export default connect(mapStateToProps, null)(Contact)
