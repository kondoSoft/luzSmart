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
  VictoryGroup,
  VictoryLine,
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
  // Funcion para generar datos de consumo Diario
  dataGenDaily () {
    const {
      results
    } = this.state

    var days = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']
    var arrWeek = []
    var temporalDay = []
    var temporalArrKw = []
    var resultDay = {}
    const data = results.map((item, i) => {
      const date = new Date(item.date)
      const getWeek = moment(date).week()
      
      return { week: getWeek, item: item}

    })
    if (data.length > 0) {
      temporalDay = data[0].week
      data.map((item,i) => {
        if(item.week == temporalDay) {
          temporalArrKw.push({day: item.item.day, kwh: item.item.daily_consumption.slice(0, 3)})
          resultDay[temporalDay] = temporalArrKw
        }
      })
    }
    return temporalArrKw.reverse()
  }
  // Funcion para generar datos Consumo Mensual y Promedio de Gasto Mensual
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
      let costAvg = 0;
      if(item.projection != 0){
        costAvg = item.projection/getDaysOfMonth
      }
      return { mes: getMonthYear, 'kwh': item.cumulative_consumption, 'costAvgMonth': costAvg}
    })
    if (data.length > 0) {
      temporalMonth = data[0].mes
      data.map((item, i) => {
        if(item.mes == temporalMonth) {
          temporalArrKw.push({mes: item.mes, kwh: item.kwh, costAvg: item.costAvgMonth})
          resultMonth[temporalMonth] = temporalArrKw
        } else {
          resultMonth[temporalMonth] = temporalArrKw
          temporalMonth = item.mes
          temporalArrKw = []
          temporalArrKw.push({mes: item.mes, kwh: item.kwh, costAvg: item.costAvgMonth})
          resultMonth[temporalMonth] = temporalArrKw
        }
      })
    }
    const getGreatest = kwhary => {
    var tempGreatest = 0
    return kwhary.map(kwh => {
      kwh.kwh > tempGreatest ? tempGreatest = { kwh: kwh.kwh, costAvgMonth: kwh.costAvg} : tempGreatest = {kwh: 0, costAvgMonth: 0}
      return tempGreatest
      })
    }
    const resultMonthFiltered = Object.keys(resultMonth).map((monthKey) =>{
      const kwh = getGreatest(resultMonth[monthKey])[0]
      const arrMonth = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic',]
      return { mes: arrMonth[monthKey] , kwhMonth: parseInt(kwh.kwh), costAvgMonth: kwh.costAvgMonth}
    })

    const dataMonthFilter = resultMonthFiltered.slice(0, 5)
    return dataMonthFilter
  }

  // Funcion para promedio mensual
  dataGenAvgMonth(){
    const {
      results
    } = this.state

    var arrMonthFinished = []
    var arrStatusFalse = []

    results.map((item, i) => {
      const date = new Date(item.date)
      const getMonthYear = moment(date).month()
      const arrMonth = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic',]
      const getDaysOfMonth = moment(date).daysInMonth()
     
      let costAvg = 0;
      if(item.projection != 0){
        costAvg = item.projection/getDaysOfMonth
      }
      console.log('costAvg', costAvg)

      if(item.status){
        arrMonthFinished.push({month: arrMonth[getMonthYear], cost: parseInt(item.amount_payable), status: item.status, label: item.amount_payable})
      } else {
        arrStatusFalse.push(item)
        const lastItem = arrStatusFalse[0]
        console.log(arrStatusFalse)
        arrMonthFinished.map((item, i)=>{
          if(item.status === false){
            arrStatusFalse.pop()
          }
        })
        arrMonthFinished.pop()
        arrMonthFinished.push({month: arrMonth[getMonthYear], cost: Math.round(lastItem.projected_payment), status: item.status, label: lastItem.projected_payment.slice(0,5), fill: '#069b1c'})
      }
    })

    console.log('arr', arrMonthFinished)
    return arrMonthFinished.reverse()
  }
  // Funcion para generar datos Bimestrasl

  dataGenYear(){
    const {
      results
    } = this.state
    var temporalYear = []
    var temporalArrKw = []
    var resultYear = {}

    const data = results.map((item, i) => {
      const date = new Date(item.date)
      const getYear = moment(date).year()

      return { year: getYear, 'kwh': item.cumulative_consumption}
    })
    if (data.length > 0) {
      temporalYear = data[0].year
      data.map((item, i) => {
        
        if(item.year == temporalYear) {
          temporalArrKw.push({year: item.year, kwh: item.kwh})
          resultYear[temporalYear] = temporalArrKw
        } else {
          resultYear[temporalYear] = temporalArrKw
          temporalYear = item.year
          temporalArrKw = []
          temporalArrKw.push({year: item.year, kwh: item.kwh})
          resultYear[temporalYear] = temporalArrKw
        }
      })
    }
    const getGreatest = kwhary => {
      var tempGreatest = 0
      return kwhary.map(kwh => {
        kwh.kwh > tempGreatest ? tempGreatest = { kwh: kwh.kwh} : tempGreatest = {kwh: 0}
        return tempGreatest
        })
      }
    const resultYearFiltered = Object.keys(resultYear).map((yearKey) =>{
      const kwh = getGreatest(resultYear[yearKey])[0]

      return { year: yearKey , kwh: parseInt(kwh.kwh)}
    })
    return resultYearFiltered

  }
  // Funcion para generar datos de consumo por Semana
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
                      x='day'
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
                <Text style={styles.chartText}>Consumo Semanal</Text>
                <View style={styles.containerCharts}>
                  <VictoryChart animate={{ duration: 1000, easing: 'bounce' }} domainPadding={{x: 40}}>
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
                  <VictoryChart animate={{ duration: 1000, easing: 'bounce' }} domainPadding={{x: 40}}>
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
                <Text style={styles.chartText}>Consumo Anual</Text>
                <View style={styles.containerCharts}>
                  <VictoryChart animate={{ duration: 1000, easing: 'bounce' }} domainPadding={{x: 40}}>
                    <VictoryBar
                      style={styles.chartFillColor}
                      data={this.dataGenYear()}
                      x='year'
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
                <Text style={styles.chartText}>Gasto Promedio Por Periodo</Text>
                <View style={styles.containerCharts}>
                  <VictoryChart animate={{ duration: 1000, easing: 'bounce' }} domainPadding={{x: 40}}>
                    <VictoryGroup >
                      <VictoryLine
                        data={this.dataGenAvgMonth()}
                        x='month'
                        y='cost'
                      />
                      <VictoryBar
                        style={styles.chartFillColor}
                        data={this.dataGenAvgMonth()}
                        x='month'
                        y='cost'
                      />
                    </VictoryGroup>
                  </VictoryChart>
                  {/*<VictoryChart animate={{ duration: 1000, easing: 'bounce' }} domainPadding={{x: 40}}>
                    <VictoryBar
                      style={styles.chartFillColor}
                      data={this.dataGenAvgMonth()}
                      x='month'
                      y='cost'
                    />
                  </VictoryChart>*/}
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
