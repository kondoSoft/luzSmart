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
import { Image, TextInput, Platform } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Select, Option } from 'react-native-select-list';
import Header from '../header/index';
import Footer from '../footer/index';
import styles from './styles';
import AnimatedView from '../animatedView/index';
import FabButton from '../fabButton';


class Measurements extends Component {
  static navigationOptions = {
    header: null
  };
  render(){
    const { navigation } = this.props
    return(
      <Container>
        <Header navigation={this.props.navigation} zIndex title="Mediciones"/>
        {(Platform.OS === 'android')? <Footer navigation={navigation}/> : null}
        <AnimatedView>
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
            <View style={{width: '100%', height: (Platform.OS === 'ios')? '40%' : '50%', alignItems: 'center', justifyContent: (Platform.OS === 'ios')? null : 'center' }}>
              <Image resizeMode={'stretch'} source={require('../../../images/medidor.png')} style={styles.animatedView__image}>
                <View style={styles.animatedView__image__view}>
                  <TextInput keyboardType={'numbers-and-punctuation'} style={styles.animatedView__image__view__input}/>
                  <Button
                    small
                    style={styles.animatedView__image__view__btn}
                    onPress={() => this.props.navigation.navigate("Contact")}
                    >
                    <Text>Enter</Text>
                  </Button>
                </View>
              </Image>
            </View>
          </Grid>
        </AnimatedView>
        {(Platform.OS === 'ios')? <Footer navigation={navigation}/> : null}
        {/* <FabButton
          navigation={this.props.navigation}
          onTap={()=>{navigation.navigate("Receipt")}}
          >
          <Text style={{ borderRadius: 50, width: 42, height: 42, textAlign: 'center', fontSize: 30, color: '#fff'}}>+</Text>
        </FabButton> */}
      </Container>
    )
  }
}

export default Measurements;
