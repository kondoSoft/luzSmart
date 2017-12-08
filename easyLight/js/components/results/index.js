import React, { Component } from 'react'
import {
  View
} from 'react-native'
import {
  Container,
  Text,
  Fab,
  Icon,
  Button,
  Card,
  CardItem,
  Body,
  Content,
} from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import styles from './styles'
import {connect} from 'react-redux'
import {
  VictoryChart,
  VictoryBar,
  VictoryGroup,
  VictoryLine,
  VictoryStack,
} from 'victory-native'
import Swiper from 'react-native-swiper'
import { Select, Option } from 'react-native-select-list'
import { getUser } from '../../actions/user'
import { getRecord, getHistory, getRatePeriod } from '../../actions/contracts'
import {getLimitChartsDac} from '../../helpersResult'
import { getDateBetween } from '../../helpers'
var moment = require('moment');

// var mom = moment().format();
var promCost;

class Results extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: false,
      results: [],
      dataKwh: 100,
      dataHistory: [],
    }
    this.onSelect = this.onSelect.bind(this)
    this.dataGenDaily = this.dataGenDaily.bind(this)
    this.createOptionItems = this.createOptionItems.bind(this)
    this.typeSummer
  }
  componentDidMount(){
    // setTimeout(()=>{
    //   this.setState({
    //     dataKwh: 250
    //   })
    // },5000)
    // setTimeout(()=>{
    //   this.setState({
    //     dataKwh: 450
    //   })
    // },10000)
  }
  componentWillReceiveProps (nextProps) {
    const {
      results, dataHistory
    } = nextProps
    if (results.length > 0) {
      this.setState({results, dataHistory})
    }
  }
  createOptionItems () {
    const {
      contracts
    } = this.props.screenProps
    var items = []
    items = contracts.map((item, i) => {
      return <Option key={i} value={item.id} >{item.name_contract}</Option>
    })
    items.unshift(<Option key={0} value={'nulo'}>Selecione contrato</Option>)

    return items

  }
  onSelect (value) {
    const {
      getRecord, getHistory
    } = this.props
    getRecord(value)
    getHistory(value, this.props.screenProps.token)
    var rate
    var contract
    this.props.screenProps.contracts.map((item,i) => {
      if(value === item.id)
      contract = item
      rate = item.rate
      return rate
    })
    this.props.getRatePeriod(rate, this.props.screenProps.token)
    this.typeSummer = getDateBetween(contract)


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
          temporalArrKw.push({day: item.item.day.slice(0,3), kwh: item.item.daily_consumption.slice(0, 3)})
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
    //Costos de datos pagados y map de barra
    results.map((item, i) => {
      const date = new Date(item.date)
      const getMonthYear = moment(date).month()
      const arrMonth = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic',]
      const getDaysOfMonth = moment(date).daysInMonth()
      let costAvg = 0;
      if(item.projection != 0){
        costAvg = item.projection/getDaysOfMonth
      }else{
        costAvg = item.amount_payable
    }

    if(item.status){
      arrMonthFinished.push({month: arrMonth[getMonthYear], cost: parseInt(item.amount_payable), costavg: costAvg, status: item.status, label: item.amount_payable})
    } else {
      arrStatusFalse.push(item)
      const lastItem = arrStatusFalse[0]

      arrMonthFinished.map((item, i)=>{
        if(item.status === false){
          arrStatusFalse.pop()
        }
      })
      arrMonthFinished.pop()

      arrMonthFinished.push({month: arrMonth[getMonthYear], cost: Math.round(lastItem.projected_payment), costavg: costAvg , status: item.status, label: lastItem.projected_payment.slice(0,5), fill: '#069b1c'})
      }
    })
    // se ańade mapeo de barra mas promedio de grafica en linea
    var sumArr = [];
    var sumaArrTotal;
    var valueCostFalse;
    var tempSumArrTotal = []

    const mapKeyMonth = Object.keys(arrMonthFinished).map(keys=> {
      var item = arrMonthFinished[keys]
      if(item.status){
        sumArr.push(item.cost)
         if(sumArr.length > 0){
          sumaArrTotal = sumArr.reduce(function(a,b){
            return a + b
          })
          tempSumArrTotal.push(sumaArrTotal)
        }
      }else{

        valueCostFalse = item.cost
      }
      tempSumArrTotal = tempSumArrTotal.reverse()


      return { month: item.month, cost: item.cost, status: item.status , fill: '#069b1c'}
    })

    const greatestArrTotal = itemSumTotal =>{
      var tempGreatest = 0
      return itemSumTotal.map(cost => {
        cost > tempGreatest ? tempGreatest = cost : null
        return tempGreatest
      })
    }
    const valueFinal = greatestArrTotal(tempSumArrTotal)[0]

    sumTotal = valueFinal + valueCostFalse
    if(sumTotal){
      divForAvg = (sumTotal / arrMonthFinished.length)
      promCost = { promCost: divForAvg.toFixed(2)}
    }

    //Array para imprimir la grafica con costo promedio
    const printGraph = mapKeyMonth.map((item, i) => {
      let avgCost;
      if (promCost != undefined){
        avgCost = promCost
      }else{
        avgCost = {promCost: '0'}
      }
      (item.status === false) ? fill = 'gold' : fill = "#069b1c"
      return { month: item.month, cost: item.cost, promCost:  parseInt(avgCost.promCost), status: item.status, fill: fill}
      })
    return printGraph.reverse().slice(0,5)

  }
  // Funcion para generar datos por años

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

      return { year: getYear, 'kwh': item.daily_reading}
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
    const getResult = kwhary => {
      const kwh = kwhary[0].kwh - kwhary[kwhary.length-1].kwh
      return { kwh: kwh }
      }
    const resultYearFiltered = Object.keys(resultYear).map((yearKey) =>{
      const kwh = getResult(resultYear[yearKey])
      return { year: yearKey , kwh: parseInt(kwh.kwh), label:kwh.kwh}
    })
    return resultYearFiltered

  }

  // Funcion Grafica daily_consumption
  dataGenDAC(){
    const {
      results, dataHistory
    } = this.state
    const {
      contracts
    } = this.props.screenProps
    var arrData = []
    var addData
    var average
    const contractId = results[0].contracts
    let contract;

    contracts.map((item, i) => {
      if(item.id == contractId)
        contract = item
    })
    const typePayment = contract.type_payment
    var valueTypePayment
    if (typePayment == 'Bimestral'){
      valueTypePayment = 2
    }else{
      valueTypePayment = 1
    }

    addData = parseInt(results[0].projection)
    average = parseFloat(results[0].average_global)


    var limitKilowatt
    this.props.limitByRegion.map((item)=>{
      if(item.name_rate.toUpperCase() === contract.rate){
        limitKilowatt = valueTypePayment * item.kilowatt
      }

    })
    var getLimitA = getLimitChartsDac(this.typeSummer, this.props.rate, contract.type_payment)
    return { addData: addData, limitKilowatt: limitKilowatt, limitA: getLimitA.limitA, average: average}
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

    const arrMonthAvg = this.dataGenAvgMonth().map((item,i)=>{
      return item.month
    })

    var dataDac = (this.state.results.length>0) && this.dataGenDAC()
    var averagePeriod = (this.state.results.length>0) && this.dataGenAvgMonth()
    // var func = (this.state.results.length>0) &&

    return (
      <Container>
        {/* <Header title='Resultados' navigation={this.props.navigation}/> */}
        <Grid style={{backgroundColor: '#fff'}}>
          <Row style={styles.selectContract} >
            <Select onSelect={this.onSelect}>
              {this.createOptionItems()}
            </Select>
          </Row>
          <Row style={{flex: 8}}>
            <Swiper showsButtons
              buttonWrapperStyle={{
               paddingHorizontal: 5
              }}
              paginationStyle={{
                bottom: 75, left: 10, right: 10
              }}
              >
              <View style={styles.containerSlide}>
                {/* <Text style={styles.chartText}>Consumo diario</Text> */}
               <View style={{
                  // height: '55%',
                  flex: 1,
                  // alignItems: 'center',
                  flexDirection: 'row',
                  paddingLeft: 40,
                  paddingRight: 40,
                }}>
                 <View style={{ flex: 2, flexDirection: 'column', }}>
                    <Content >
                      <Card style={{ marginTop: 50, backgroundColor: 'transparent' }}>
                        <CardItem style={{ backgroundColor: 'transparent' }}>
                          <Text style={{ fontSize:30, textAlign: 'center', width: '100%'  }}>
                            DAC
                          </Text>
                        </CardItem>
                        <CardItem style={{ backgroundColor: 'transparent' }}>
                          <Text style={{ fontWeight: 'bold', fontSize:20, textAlign: 'center', width: '100%' }}>
                            {(dataDac) && `KwH ${dataDac.addData.toLocaleString()}`}
                          </Text>
                        </CardItem>
                        <CardItem style={{ backgroundColor: 'transparent' }}>
                          <Text style={{ fontSize:15, textAlign: 'center', width: '100%'}}>
                          {(dataDac) && `${dataDac.average.toFixed(2)} kwh/día`}
                          </Text>
                        </CardItem>
                      </Card>
                    </Content>

                  </View>
                  <View style={{
                    flex: 1,
                    // backgroundColor: 'blue',
                    // height: '40%',
                    justifyContent: 'center',
                    // alignItems: 'center',
                    paddingBottom: 25,

                    }}
                  >
                    <View style={{ flex: 1, paddingLeft: 5, justifyContent: 'center' }}>

                      { (dataDac.addData <= dataDac.limitA ) ?
                          <VictoryStack
                            style={{ margin: 0, data: { width: 50 } }}
                            colorScale={["#069b1c", "yellow", "tomato"]}
                            domain={{x: [1, 2], y: [0, dataDac.limitKilowatt]}}
                            // animate={{ duration: 1000, easing: 'bounce' }}
                            >
                            <VictoryBar data={[{x: "b", y: (dataDac.addData)}]}/>

                          </VictoryStack>
                          : (dataDac.addData > dataDac.limitA && dataDac.addData <= dataDac.limitKilowatt) ?
                          <VictoryStack
                            style={{ margin: 0, data: { width: 50 } }}
                            colorScale={["#069b1c", "yellow", "tomato"]}
                            domain={{x: [1, 2], y: [0, dataDac.limitKilowatt]}}
                            // animate={{ duration: 1000, easing: 'bounce' }}
                            >
                            <VictoryBar data={[{x: "b", y: dataDac.limitA}]}/>
                            <VictoryBar data={[{x: "b", y: (dataDac.addData-dataDac.limitA)}]}/>

                          </VictoryStack>
                          : (dataDac.addData > dataDac.limitKilowatt) &&
                          <VictoryStack
                            style={{ margin: 0, data: { width: 50 } }}
                            colorScale={["#069b1c", "yellow", "tomato"]}
                            domain={{x: [1, 2], y: [0, dataDac.addData * 2]}}
                            // animate={{ duration: 1000, easing: 'bounce' }}
                            >
                            <VictoryBar data={[{x: "b", y: dataDac.limitA}]}/>
                            <VictoryBar data={[{x: "b", y: (dataDac.addData-dataDac.limitA)}]}/>
                            <VictoryBar data={[{x: "b", y: (dataDac.addData-dataDac.limitKilowatt-dataDac.limitA)}]}/>

                          </VictoryStack>

                        // console.log('1')


                        // <View>
                        //   {console.log('2')}
                        //   <VictoryBar
                        //   data={[{x: "b", y: 200}]}
                        //   />
                        //   <VictoryBar
                        //   data={[{x: "b", y: (dataKwh-200)}]}
                        //   />
                        // </View>
                        // else if(dataKwh > 400){
                        // <VictoryBar
                        //   data={[{x: "b", y: 200}]}
                        // />
                        // }
                      }


                    </View>


                  </View>
                </View>
                <View style={{
                  // height: '55%',
                  flex: 1,
                  alignContent: 'center',
                  flexDirection: 'row',
                  paddingLeft: 40,
                  paddingRight: 40,
                }}>
                  <View style={{ flex: 2 }}>
                    <Card style={{ flex: 0 }}>
                      <CardItem>
                        <Body>
                          <Text style={{ fontSize:14 }}>
                             La proyección indica que su proyeccion de "Mi Casa" <Text style={{ fontWeight: 'bold', fontSize:15 }}>se encuentra en tarifa de alto consumo (DAC) </Text>
                          </Text>
                        </Body>
                      </CardItem>
                    </Card>
                  </View>
                </View>
              </View>
              {/* <View style={styles.containerSlide}>
                <View style={styles.containerTitle}>
                  <Text style={styles.chartText}>Consumo Semanal</Text>
                </View>
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
              </View> */}
              <View style={styles.containerSlide}>
                <View style={styles.containerTitle}>
                  <Text style={styles.chartText}>Consumo Mensual</Text>
                </View>
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
              </View>
              {/* <Col size={100}>
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
              </Col> */}
              <View style={styles.containerSlide}>
                <View style={styles.containerTitle}>
                  <Text style={styles.chartText}>Gasto Promedio por Periodo</Text>
                </View>
                <View style={styles.containerCharts}>
                  <VictoryChart animate={{ duration: 1000, easing: 'bounce' }} domain={{ x: [0, 6], y: [0, (averagePeriod) ? averagePeriod[0].cost : 1000] }} domainPadding={{x: 50, y:40}} size={4}>
                    <VictoryGroup >
                      <VictoryBar
                        style={styles.chartFillColor}
                        data={this.dataGenAvgMonth()}
                        x='month'
                        y='cost'
                        // categories={{
                        //   x: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic',]
                        // }}
                        categories={{x: arrMonthAvg}}
                      />
                      <VictoryLine
                        data={this.dataGenAvgMonth()}
                        x='month'
                        y='promCost'
                        labels={(datum) => datum.y}
                        categories={{x: arrMonthAvg}}

                      />
                    </VictoryGroup>
                  </VictoryChart>
                </View>
                <View style={styles.containerExportButton}>
                  <Button small primary>
                    <Text>Exportar CSV</Text>
                  </Button>
                </View>
              </View>
              {/* <Col size={10}>
                <Text style={styles.chartText}>Consumo y Ahorro</Text>
                <View style={styles.containerCharts}> */}
                   {/* <VictoryChart animate={{ duration: 1000, easing: 'bounce' }} domainPadding={{x: 40}} domain={[0, 6]} >                    <VictoryGroup
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
                  </VictoryChart> */}
                {/* </View>
                <View style={styles.containerExportButton}>
                  <Button small primary>
                    <Text>Exportar CSV</Text>
                  </Button>
                </View>
              </Col> */}
            </Swiper>
          </Row>
        </Grid>
        <Fab
          active={this.state.active}
          direction='up'
          containerStyle={{bottom: 10, right: 10}}
          style={{backgroundColor: 'steelblue'}}
          position='bottomRight'
          onPress={() => this.setState({ active: !this.state.active })}
          >
          <Icon name='share' />
          <Button style={{ backgroundColor: '#3B5998' }}>
            <Icon name='logo-facebook' />
          </Button>
        </Fab>
      </Container>
    )
  }
}

function bindAction (dispatch) {
  return {
    getUser: token => dispatch(getUser(token)),
    getRecord: id => dispatch(getRecord(id)),
    getHistory: (contract_id, token) => dispatch(getHistory(contract_id, token)),
    getRatePeriod: (rate, token) => dispatch(getRatePeriod(rate,token)),

  }
}

const mapStateToProps = state => ({
  results: state.list_records.results,
  dataHistory: state.list_records.history,
  limitByRegion: state.list_contracts.limitByRegion,
  rate: state.list_rate.rate_period,
})

export default connect(mapStateToProps, bindAction)(Results)
