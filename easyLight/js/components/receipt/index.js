import React, { Component } from 'react';
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
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Select, Option } from 'react-native-select-list';
import Header from '../header/index';
import Footer from '../footer/index';
import styles from './styles';


class Receipt extends Component {
  static navigationOptions = {
    header: null
  };
  showAlert(){
    AlertIOS.alert(
      'Contrato',
     'Desea agregar un historial al contrato Mi Casa',
     [
       {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
       {text: 'Si', onPress: () => this.props.navigation.navigate('Contracts')},
     ],
    )
  }
  render(){
    return(
      <Container>
        <Header navigation={this.props.navigation} title="RECIBO CFE"/>
        <Grid style={styles.grid}>
          <Col size={75}>
            <Form style={styles.form}>
              <Item inlineLabel last style={styles.form__item__title}>
                <Label style={styles.form__item__label}>Contrato #85976431</Label>
              </Item>
              <Item last style={styles.form__item__inputs}>
                <Input placeholder="Fecha Limite de Pago" />
              </Item>
              <Item last style={styles.form__item__inputs}>
                <Input placeholder="Monto a Pagar" />
              </Item>
              <Item last style={styles.form__item__title}>
                <Label style={styles.form__item__label}>Medición de Consumo</Label>
              </Item>
              <Item last style={styles.form__item__inputs}>
                <Input placeholder="Lectura Actual" />
              </Item>
              <Item last style={styles.form__item__inputs}>
                <Input placeholder="Lectura Anterior" />
              </Item>
            </Form>
          </Col>
          <Col size={25} style={styles.col__bottom}>
            <Row style={styles.col__bottom__row__bottom}>
              <Button
                small
                onPress={()=> this.showAlert()}
                >
                <Text>Agregar</Text>
              </Button>
            </Row>
          </Col>
        </Grid>
        <Footer navigation={this.props.navigation}/>
      </Container>
    )
  }
}

export default Receipt;
