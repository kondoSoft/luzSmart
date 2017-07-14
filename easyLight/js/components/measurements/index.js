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
} from 'native-base';
import { Image, TextInput } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Select, Option } from 'react-native-select-list';
import Header from '../header/index';
import Footer from '../footer/index';
import styles from './styles';


class Measurements extends Component {
  static navigationOptions = {
    header: null
  };
  render(){

    return(
      <Container>
        <Header navigation={this.props.navigation}/>
        <Grid>
          <Row size={9} style={styles.grid__row__top}>
            <Text style={styles.grid__row__top__text}>Gasto de Luz</Text>
            <View style={styles.grid__row__top__view}>
              <Text>$2,150</Text>
              <Text>Proyectado</Text>
            </View>
          </Row>
          <Col size={11} style={styles.grid__col__select}>
            <Row style={styles.grid__col__select__row__top}>
              <Text style={styles.grid__row__top__view}>Contrato</Text>
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
              </Select>
            </Row>
            <Row style={styles.grid__col__select__row__bottom}>
              <Text style={styles.grid__row__top__view}>Periodo</Text>
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
              </Select>
            </Row>
          </Col>
          <Row size={20}>
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
          <Row size={36} style={{ alignItems: 'center', justifyContent: 'center'}}>
            <Image resizeMode={'stretch'} source={require('../../../images/medidor.png')} style={{width: '65%', height: '85%'}}>
              <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'space-around', flexDirection: 'column'}}>
                <TextInput keyboardType={'numeric'} style={{ height: 27 ,backgroundColor: 'lightgrey', marginTop: 58, flex: 0, width: '50%', marginLeft: 65, borderWidth:2, borderColor: 'grey'}}/>
                <Button
                  small
                  style={{marginLeft: 95, marginBottom: 33, backgroundColor: 'green'}}
                  >
                  <Text>Enter</Text>
                </Button>
              </View>
            </Image>
          </Row>
        </Grid>
        <Footer navigation={this.props.navigation}/>
        <View>
          <Fab
            active={true}
            direction="up"
            style={{ backgroundColor: 'steelblue', bottom: 60}}
            position="bottomRight"
            >
            <Icon active name="md-share" style={{fontSize: 28, lineHeight: 0}}/>
          </Fab>
        </View>
      </Container>
    )
  }
}

export default Measurements;
