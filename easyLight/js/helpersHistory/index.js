var moment = require('moment');

const addKilowattHistory = (data, state, props) => {
  console.log('stateaad', state);
  let contract
  if(props.newContract){
    contract = props.newContract
  }else{
    contract = props.navigation.state.params.contract
  }
  var arrData = []
  var valueTypePayment
  if (contract.type_payment === 'Bimestral'){
    valueTypePayment = 5
  }else{
    valueTypePayment = 11
  }
  data.map((item,i)=>{
    arrData.push(parseInt(item.kilowatt))
  })
  arrData = arrData.reverse()
  var addData
  arrData = _.slice(arrData, [start=0], [end= valueTypePayment])
  if (arrData.length >= valueTypePayment){
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
