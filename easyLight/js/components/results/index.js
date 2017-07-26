import React, { Component } from 'react';
import {
  Container,
  Content,
  View,
  Text,
  Fab,
  Icon
} from 'native-base';
import {
  Platform
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Select, Option } from 'react-native-select-list';
import Header from '../header/index';
import Footer from '../footer/index';
import styles from './styles';

class Results  extends Component {
  static navigationOptions = {
    header: null
  };
  render(){
    console.log(this.props.navigation);
    const {  navigation } = this.props;
    return(
      <Container>
        <Header title="RESULTADOS" navigation={this.props.navigation}/>
        {(Platform.OS === 'android')? <Footer navigation={navigation}/> : null}
        <Grid style={{  }}>
          <Row size={50} style={styles.row__top}>
            <Select
              selectStyle={{ width: 300}}
              padding={10}
              listHeight={100}
              caretSize={0}
              >
              <Option
                value={1}
                optionStyle={styles.col__row__select__option}
                >Consumo diario</Option>
              <Option
                value={2}
                optionStyle={styles.col__row__select__option}
                >Consumo Acumulado</Option>
                <Option
                  value={3}
                  optionStyle={styles.col__row__select__option}
                  >Gasto Energetico</Option>
            </Select>
          </Row>
          <Row size={10} style={styles.row__center}>
            <Select
              selectStyle={{ }}
              padding={10}
              listHeight={100}
              caretSize={0}
              >
              <Option
                value={1}
                optionStyle={styles.col__row__select__option}
                >Contrato</Option>
              <Option
                value={2}
                optionStyle={styles.col__row__select__option}
                >Casa</Option>
            </Select>
          </Row>
          <Row size={25} style={styles.row__bottom}>
            <Select
              selectStyle={{}}
              padding={10}
              listHeight={100}
              caretSize={0}
              >
              <Option
                value={1}
                optionStyle={styles.col__row__select__option}
                >Periodo</Option>
              <Option
                value={2}
                optionStyle={styles.col__row__select__option}
                >Periodo</Option>
            </Select>
          </Row>
        </Grid>
        <Fab
          active={true}
          direction="up"
          style={{ backgroundColor: 'steelblue', bottom: 60}}
          position="bottomRight"
          >
          <Icon active name="md-share" style={{fontSize: 28, lineHeight: 0}}/>
        </Fab>
        {(Platform.OS === 'ios')? <Footer navigation={navigation}/> : null}
      </Container>
    )
  }
}

export default Results;
