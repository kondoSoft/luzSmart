import React, { Component } from 'react';
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


class AddContracts extends Component {
  static navigationOptions = {
    header: null
  };
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
              <Text>Mi Casa</Text>
            </Body>
            <Right style={ styles.row__top__left__right }>
              <Icon name="md-create" style={ styles.row__top__col__right__icon }/>
            </Right>
          </Row>
          <Col size={70} style={styles.col__form}>
            <Form>
              <Item fixedLabel style={styles.col__form__item}>
              <Label>No Contrato</Label>
              <Input />
            </Item>
            <Select
              selectStyle={styles.select}
              padding={10}
              listHeight={100}
              caretSize={0}
              >
              <Option
                value={1}
                optionStyle={styles.select__option}
                >Villahermosa</Option>
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
              >
              <Option
                value={1}
                optionStyle={styles.select__option}
                >Tarifa</Option>
              <Option
                value={2}
                optionStyle={styles.select__option}
                >$5000</Option>
            </Select>
            <Select
              selectStyle={styles.select}
              padding={10}
              listHeight={100}
              caretSize={0}
              >
              <Option
                value={1}
                optionStyle={styles.select__option}
                >Periodo</Option>
              <Option
                value={2}
                optionStyle={styles.select__option}
                >Ene - Feb</Option>
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
              onPress={() => this.props.navigation.navigate('Contracts')}
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

export default AddContracts;
