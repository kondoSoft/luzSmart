import React, { Component } from 'react';
import {
  Container,
  Content,
  View,
  Text,
} from 'native-base';
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
    return(
      <Container>
        <Header title={this.props.navigation.state.routeName}/>
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
            <Row size={25} style={styles.row__center}>
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
        <Footer/>
      </Container>
    )
  }
}

export default Results;
