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
import { Grid, Col, Row } from 'react-native-easy-grid'
import styles from './styles'
// import {random, range} from 'lodash'
// import Svg from 'react-native-svg'
import {connect} from 'react-redux'
import {
  VictoryChart,
  VictoryBar,
  VictoryGroup
} from 'victory-native'
import Swiper from 'react-native-swiper'
import { Select, Option } from 'react-native-select-list'
import { getUser } from '../../actions/user'
import { getRecord } from '../../actions/contracts'
var moment = require('moment');
// var mom = moment().format();

class Results extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: false,
      results: []
    }
    this.onSelect = this.onSelect.bind(this)
    this.dataGenDaily = this.dataGenDaily.bind(this)
  }
  componentWillReceiveProps (nextProps) {
    const {
      results
    } = nextProps
    if (results.length > 0) {
      this.setState({results})
    }
  }
  createOptionItems () {
    const {
      contracts
    } = this.props.screenProps
    var items = []
    items = contracts.map((item, i) => {
      return <Option key={i} value={item.id}>{item.name_contract}</Option>
    })
    items.unshift(<Option value={'nulo'}>Selecione contrato</Option>)
    return items
  }
  onSelect (value) {
    const {
      getRecord
    } = this.props
    getRecord(value)
  }
  dataGenDaily () {
    const {
      results
    } = this.state

    var days = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']
    var data = []

    days.map((day) => {
      results.map((item, i) => {
        if (day === item.day.slice(0, 3)) {
          data.push({dia: day, 'kw/h': parseInt(item.cumulative_consumption)})
        } else {
          data.push({dia: day, 'kw/h': 0})
        }
      })
    })
    return data
  }
  dataGenMonth(){
    const {
      results
    } = this.state

    var temporalMonth = []
    var temporalArrKw = []
    var resultMonth = {}

    const data = results.map((item, i) => {
      const date = new Date(item.date)
      const getMonthYear = moment(date).month()
      const getDaysOfMonth = moment(date).daysInMonth()
      const costAvg = item.projection/getDaysOfMonth

      return { mes: 'mes'+getMonthYear, 'kwh': item.cumulative_consumption, 'costAvgMonth': costAvg}
    })
    if (data.length > 0) {
      temporalMonth = data[0].mes
      data.map((item, i) => {
        if(item.mes == temporalMonth) {
          temporalArrKw.push({kwh: item.kwh, costAvg: item.costAvgMonth})
        } else {
          resultMonth[temporalMonth] = temporalArrKw
          temporalMonth = item.mes
          temporalArrKw = []
          temporalArrKw.push({kwh: item.kwh, costAvg: item.costAvgMonth})
          resultMonth[temporalMonth] = temporalArrKw
        }
      })
    }
    const getGreatest = kwhary => {
    var tempGreatest = 0
    return kwhary.map(kwh => {

      kwh.kwh > tempGreatest ? tempGreatest = { kwh: kwh.kwh, costAvgMonth: kwh.costAvg} : {kwh: 0, costAvg: 0}
      return tempGreatest
    })
  }
    const resultMonthFiltered = Object.keys(resultMonth).map(monthKey =>{
      const kwh = getGreatest(resultMonth[monthKey])[0]
      return { mes: monthKey , kwhMonth: parseInt(kwh.kwh), costAvgMonth: kwh.costAvgMonth}
    })
    const dataMonthFilter = resultMonthFiltered.slice(0, 5)
    return dataMonthFilter.reverse()
  }

  dataGenWeek () {
    const {
      results
    } = this.state
    // var data = []
    var arrWeekEquals = []
    var temporalWeek = []
    var temporalArrKw = []
    var resultWeek = {}
    var greatest = 0
    
    const data = results.map((item, i) => {
      const date = new Date(item.date)
      const getWeekYear = moment(date).week()

      return { Sem: 'Sem'+getWeekYear, 'kwh': item.cumulative_consumption}
    })
    if(data.length > 0){
      temporalWeek = data[0].Sem
      data.map((item, i) => {
        if(item.Sem == temporalWeek){
          temporalArrKw.push(item.kwh)
        } else {
          resultWeek[temporalWeek] = temporalArrKw
          temporalWeek = item.Sem
          temporalArrKw = []
          temporalArrKw.push(item.kwh)
          resultWeek[temporalWeek] = temporalArrKw
        }
      })
    }
    
    const resultWeekFiltered = Object.keys(resultWeek).map(weekKey =>{
      const kwh = this.getGreatest(resultWeek[weekKey])[0]

      return { sem: weekKey , kwh: parseInt(kwh)}
    })
    const dataWeekFilter = resultWeekFiltered.slice(0, 5)
    return dataWeekFilter.reverse()
  }
  getGreatest(kwhary){
    var tempGreatest = 0
    return kwhary.map(kwh => {
      kwh > tempGreatest ? tempGreatest = kwh : null

      return tempGreatest
    })
  }
  render () {
    return (
      <Container>
        {/* <Header title='Resultados' navigation={this.props.navigation}/> */}
        <Grid style={{backgroundColor: '#fff'}}>
          <Row style={styles.selectContract} >
            <Select onSelect={this.onSelect}>
              {this.createOptionItems()}
            </Select>
          </Row>
          <Row style={{flex: 10}}>
            <Swiper showsButtons>
              <Col size={100}>
                <Text style={styles.chartText}>Consumo diario</Text>
                <View style={styles.containerCharts}>
                  <VictoryChart animate={{ duration: 1000, easing: 'bounce' }} domainPadding={{x: 40}}>
                    <VictoryBar
                      style={styles.chartFillColor}
                      data={this.dataGenDaily()}
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
                      data={this.dataGenWeek()}
                      x='sem'
                      y='kwh'
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
                      data={this.dataGenMonth()}
                      x='mes'
                      y='kwhMonth'
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
                      data={this.dataGenMonth()}
                      x='mes'
                      y='kwhAvgMonth'
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
          </Row>
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

function bindAction (dispatch) {
  return {
    getUser: token => dispatch(getUser(token)),
    getRecord: id => dispatch(getRecord(id))
  }
}

const mapStateToProps = state => ({
  results: state.list_records.results
})

export default connect(mapStateToProps, bindAction)(Results)
