import React, { Component } from 'react';
import {
  Container,
  Content,
  View,
  Text,
  Fab,
  Icon,
  Button,
} from 'native-base';
import {
  Platform
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Select, Option } from 'react-native-select-list';
import Header from '../header/index';
import Footer from '../footer/index';
import styles from './styles';
import { random, range } from "lodash";
import Svg from "react-native-svg";
import {
  VictoryChart,
  VictoryGroup,
  VictoryBar,
} from "victory-native";

class Results  extends Component {
  static navigationOptions = {
    header: null
  };
  render(){
    const {  navigation } = this.props;
    return(
      <Container>
        <Header title="Resultados" navigation={this.props.navigation}/>
        {(Platform.OS === 'android')? <Footer navigation={navigation}/> : null}
        <Grid style={{ backgroundColor: '#fff' }}>
          <Row size={10} style={styles.row__top}>
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
          <Row size={50} style={{paddingBottom: 40}}>
            <VictoryChart domain={{x: [0, 4]}}>
              <VictoryGroup
                labels={["a", "b", "c"]}
                offset={10}
                colorScale={"qualitative"}
              >
                <VictoryBar
                  data={[
                    {x: 1, y: 1},
                    {x: 2, y: 2},
                    {x: 3, y: 5}
                  ]}
                />
                <VictoryBar
                  data={[
                    {x: 1, y: 2},
                    {x: 2, y: 1},
                    {x: 3, y: 7}
                  ]}
                />
                <VictoryBar
                  data={[
                    {x: 1, y: 3},
                    {x: 2, y: 4},
                    {x: 3, y: 9}
                  ]}
                />
              </VictoryGroup>
            </VictoryChart>
          </Row>
          <Row size={10} style={styles.row__center}>
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
          <Row size={20} style={styles.row__bottom}>
            <Button small style={{backgroundColor:'green'}}>
              <Text>Enviar CSV</Text>
            </Button>
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
