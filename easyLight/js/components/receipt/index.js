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
  render(){
    return(
      <Container>
        <Header navigation={this.props.navigation} title="RECIBO CFE"/>
        <Grid style={{flexDirection: 'column'}}>
          <Col size={75}>
            <Form style={{paddingLeft: 15, paddingRight: 15}}>
              <Item inlineLabel last style={{borderBottomColor: 'green', borderBottomWidth: 3}}>
                <Label>Password</Label>
                <Input />
              </Item>
            </Form>
          </Col>
          <Col size={25} style={{ alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.link}
              onPress={() => this.props.navigation.navigate("Receipt")}>
              <Text style={{color: 'green'}}>Agregar Historial</Text>
            </TouchableOpacity>
            <Row style={{ paddingTop: 20 }}>
              <Button small >
                <Text>Agregar</Text>
              </Button>
            </Row>
          </Col>
        </Grid>
        <Footer/>
      </Container>
    )
  }
}

export default Receipt;
