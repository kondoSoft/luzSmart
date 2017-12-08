var moment = require('moment');

const addKilowattHistory = (data, state, props) => {
  let contract
  if(props.newContract.length>0){
    contract = props.newContract
  }else{
    contract = props.navigation.state.params.contract
  }
  var arrData = []
  var valueTypePayment
  if (contract.type_payment === 'Bimestral'){
    valueTypePayment = 6
  }else{
    valueTypePayment = 12
  }
  data.map((item,i)=>{
    arrData.push(parseInt(item.kilowatt))
  })
  arrData = arrData.reverse()
  var addData
  arrData = _.slice(arrData, [start=0], [end= valueTypePayment-1])
  if ((arrData.length+1) >= valueTypePayment){
    addData = arrData.reduce((a, b)=>{ return a+b})
    addData = addData +  (state.current_reading - state.previous_reading)
  }else{
    addData = state.current_reading - state.previous_reading
  }
  return {addData: addData, valueTypePayment: valueTypePayment}
}

const setValueByLimitDAC = (valueTotalHistory, props) =>{

  const { limitByRegion, navigation } = props
  const { contract } = navigation.state.params

  var valueLimitDAC

  limitByRegion.map((item,i) => {
    if(item.name_rate.toUpperCase() === contract.rate){
      var valueKilowatt = 12 * item.kilowatt
      if( valueTotalHistory.addData >= valueKilowatt){
        valueLimitDAC = true
      }else{
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
