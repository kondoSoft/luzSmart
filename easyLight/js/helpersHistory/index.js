var moment = require('moment');

const addKilowattHistory = (data, props) => {
  const { contract } = props.navigation.state.params
  var arrData = []
  var valueTypePayment
  if (contract.type_payment === 'Bimestral'){
    valueTypePayment = 6
  }else{
    valueTypePayment = 12
  }
  data.map((item,i)=>{
    arrData.push(item.cost)
  })
  arrData = arrData.reverse()
  arrData = _.slice(arrData, [start=0], [end= valueTypePayment])

  var addData = arrData.reduce((a, b)=>{ return a+b})

  return {addData: addData, valueTypePayment: valueTypePayment}
}

const setValueByLimitDAC = (valueTotalHistory, props) =>{

  const { limitByRegion, navigation } = props
  const { contract } = navigation.state.params

  var valueLimitDAC

  limitByRegion.map((item,i) => {
    if(item.name_rate.toUpperCase() === contract.rate){
      var valueKilowatt = valueTotalHistory.valueTypePayment * item.kilowatt
      if( valueTotalHistory.addData >= valueKilowatt){
        console.log('rebaso Dac', valueKilowatt, valueTotalHistory.addData);
        valueLimitDAC = true
      }else{
        console.log('no rebaso Dac', valueKilowatt, valueTotalHistory.addData);

        valueLimitDAC = false
      }
    }
  })
  return valueLimitDAC
}
export {
  setValueByLimitDAC,
  addKilowattHistory,
}
