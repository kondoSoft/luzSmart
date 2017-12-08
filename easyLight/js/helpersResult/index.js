
const getLimitChartsDac = (typeSummer, rate, typePayment) => {
  var verano = []
  var noverano = []
  valueTypePayment = getTypePayment(typePayment)
  rate.map((item,i)=>{
    if((typeSummer == 'fueraDeVerano' || typeSummer == 'mixtoVerano') && item.period_name == 'NoVerano'){
      noverano.push(item.kilowatt)
    }
    else if ((typeSummer == 'verano' || typeSummer == 'mixtoNoVerano') && item.period_name == 'Verano'){
      verano.push(item.kilowatt)
    }
  })

  var limitA
  var arrReduce
  let limitC
  if(verano.length > 0){
    limitA = verano.reduce((a ,b) => { return a + b})
  }else if(noverano.length > 0){
    limitA = noverano.reduce((a ,b) => { return a + b})
  }
  limitA = limitA * valueTypePayment
  
 return { limitA: limitA }
}
const getTypePayment = (typePayment) =>{
  var value
  if(typePayment == 'Bimestral'){
    value = 2
  }else{
    value = 1
  }
  return value
}

export {
  getLimitChartsDac
}
