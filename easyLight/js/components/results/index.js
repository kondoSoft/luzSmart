import React, { Component } from 'react'
import {
  View
} from 'react-native'
import {
  Container,
  Text,
  Fab,
  Icon,
  Button
} from 'native-base'
import { Grid, Col } from 'react-native-easy-grid'
import styles from './styles'
// import {random, range} from 'lodash'
// import Svg from 'react-native-svg'
import {
  VictoryChart,
  VictoryBar,
  VictoryGroup
} from 'victory-native'
import Swiper from 'react-native-swiper'

class Results extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: false
    }
  }
  render () {
    return (
      <Container>
        {/* <Header title='Resultados' navigation={this.props.navigation}/> */}
        <Grid style={{ backgroundColor: '#fff' }}>
          <Swiper showsButtons={true}>
            <Col size={100}>
              <Text style={styles.chartText}>Consumo diario</Text>
              <View style={styles.containerCharts}>
                <VictoryChart animate={{ duration: 1000, easing: 'bounce' }} domainPadding={{x: 40}}>
                  <VictoryBar
                    style={styles.chartFillColor}
                    data={[
                      {dia: 'Lun', 'kw/h': 35},
                      {dia: 'Mar', 'kw/h': 50},
                      {dia: 'Mie', 'kw/h': 10},
                      {dia: 'Jue', 'kw/h': 20},
                      {dia: 'Vie', 'kw/h': 40},
                      {dia: 'Sab', 'kw/h': 10},
                      {dia: 'Dom', 'kw/h': 30}
                    ]}
                    x='dia'
                    y='kw/h'
                  />
                </VictoryChart>
              </View>
              <View style={styles.containerExportButton}>
                <Button small primary>
                  <Text>Exportar CSV</Text>
                </Button>
              </View>
            </Col>
            <Col size={100}>
              <Text style={styles.chartText}>Consumo Semanal</Text>
              <View style={styles.containerCharts}>
                <VictoryChart domainPadding={{x: 40}}>
                  <VictoryBar
                    style={styles.chartFillColor}
                    data={[
                      {sem: 'Sem1', 'kw/h': 35},
                      {sem: 'Sem2', 'kw/h': 50},
                      {sem: 'Sem3', 'kw/h': 10},
                      {sem: 'Sem4', 'kw/h': 20}
                    ]}
                    x='sem'
                    y='kw/h'
                  />
                </VictoryChart>
              </View>
              <View style={styles.containerExportButton}>
                <Button small primary>
                  <Text>Exportar CSV</Text>
                </Button>
              </View>
            </Col>
            <Col size={100}>
              <Text style={styles.chartText}>Consumo Mensual</Text>
              <View style={styles.containerCharts}>
                <VictoryChart domainPadding={{x: 40}}>
                  <VictoryBar
                    style={styles.chartFillColor}
                    data={[
                      {mes: 'Ene', 'kw/h': 35},
                      {mes: 'Feb', 'kw/h': 50},
                      {mes: 'Mar', 'kw/h': 10},
                      {mes: 'Abr', 'kw/h': 20},
                      {mes: 'May', 'kw/h': 40},
                      {mes: 'Jun', 'kw/h': 10},
                    ]}
                    x='mes'
                    y='kw/h'
                  />
                </VictoryChart>
              </View>
              <View style={styles.containerExportButton}>
                <Button small primary>
                  <Text>Exportar CSV</Text>
                </Button>
              </View>
            </Col>
            <Col size={100}>
              <Text style={styles.chartText}>Gasto Promedio Mensual</Text>
              <View style={styles.containerCharts}>
                <VictoryChart domainPadding={{x: 40}}>
                  <VictoryBar
                    style={styles.chartFillColor}
                    data={[
                      {mes: 'Ene', 'kw/h': 35},
                      {mes: 'Feb', 'kw/h': 50},
                      {mes: 'Mar', 'kw/h': 10},
                      {mes: 'Abr', 'kw/h': 20},
                      {mes: 'May', 'kw/h': 40},
                      {mes: 'Jun', 'kw/h': 10, fill:'#000'}
                    ]}
                    x='mes'
                    y='kw/h'
                  />
                </VictoryChart>
              </View>
              <View style={styles.containerExportButton}>
                <Button small primary>
                  <Text>Exportar CSV</Text>
                </Button>
              </View>
            </Col>
            <Col size={100}>
              <Text style={styles.chartText}>Consumo Bimestral</Text>
              <View style={styles.containerCharts}>
                <VictoryChart domainPadding={{x: 40}}>
                  <VictoryBar
                    style={styles.chartFillColor}
                    data={[
                      {bimes: 'Ene', 'kw/h': 35},
                      {bimes: 'Mar', 'kw/h': 50},
                      {bimes: 'May', 'kw/h': 10},
                      {bimes: 'Jul', 'kw/h': 20},
                      {bimes: 'Sep', 'kw/h': 40},
                      {bimes: 'Nov', 'kw/h': 10}
                    ]}
                    x='bimes'
                    y='kw/h'
                  />
                </VictoryChart>
              </View>
              <View style={styles.containerExportButton}>
                <Button small primary>
                  <Text>Exportar CSV</Text>
                </Button>
              </View>
            </Col>
            <Col size={100}>
              <Text style={styles.chartText}>Consumo Anual</Text>
              <View style={styles.containerCharts}>
                <VictoryChart domainPadding={{x: 40}}>
                  <VictoryBar
                    style={styles.chartFillColor}
                    data={[
                      {anual: '15', 'kw/h': 35},
                      {anual: '16', 'kw/h': 50},
                      {anual: '17', 'kw/h': 10},
                      {anual: '18', 'kw/h': 20},
                      {anual: '19', 'kw/h': 40}
                    ]}
                    x='anual'
                    y='kw/h'
                  />
                </VictoryChart>
              </View>
              <View style={styles.containerExportButton}>
                <Button small primary>
                  <Text>Exportar CSV</Text>
                </Button>
              </View>
            </Col>
            <Col size={100}>
              <Text style={styles.chartText}>Consumo y Ahorro</Text>
              <View style={styles.containerCharts}>
                <VictoryChart domainPadding={{x: 40}} domain={[0, 6]} >
                  <VictoryGroup
                    offset={10}
                    // data={[
                    //   {mes: 'Ene', y: 1},
                    //   {mes: 'Feb', y: 2},
                    //   {mes: 'Mar', y: 5}
                    // ]}
                    // x='mes'
                  >
                    <VictoryBar
                      style={styles.chartFillConsumo}
                      data={[
                        {mes: 'Ene', y: 1},
                        {mes: 'Feb', y: 2},
                        {mes: 'Mar', y: 5},
                        {mes: 'Abr', y: 4},
                        {mes: 'May', y: 6},
                        {mes: 'Jun', y: 2}
                      ]}
                      x='mes'
                    />
                    <VictoryBar
                      data={[
                        {mes: 'Ene', y: 1},
                        {mes: 'Feb', y: 3},
                        {mes: 'Mar', y: 5},
                        {mes: 'Abr', y: 8},
                        {mes: 'May', y: 2},
                        {mes: 'Jun', y: 4}
                      ]}
                      x='mes'
                    />
                    <VictoryBar
                      data={[
                        {mes: 'Ene', y: 2},
                        {mes: 'Feb', y: 4},
                        {mes: 'Mar', y: 6},
                        {mes: 'Abr', y: 3},
                        {mes: 'May', y: 1},
                        {mes: 'Jun', y: 9}
                      ]}
                      x='mes'
                    />
                  </VictoryGroup>
                </VictoryChart>
              </View>
              <View style={styles.containerExportButton}>
                <Button small primary>
                  <Text>Exportar CSV</Text>
                </Button>
              </View>
            </Col>
          </Swiper>
        </Grid>
        <Fab
          active={this.state.active}
          direction='up'
          containerStyle={{bottom: 30, right: 10}}
          style={{backgroundColor: 'steelblue'}}
          position='bottomRight'
          onPress={() => this.setState({ active: !this.state.active })}
          >
          <Icon name='share' />
          {/* <Button style={{ backgroundColor: '#34A34F' }}>
            <Icon name='logo-whatsapp' />
          </Button> */}
          <Button style={{ backgroundColor: '#3B5998' }}>
            <Icon name='logo-facebook' />
          </Button>
          {/* <Button disabled style={{ backgroundColor: '#DD5144' }}>
            <Icon name='mail' />
          </Button> */}
        </Fab>
      </Container>
    )
  }
}

export default Results
