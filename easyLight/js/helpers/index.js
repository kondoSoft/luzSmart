var moment = require('moment');

const getWeekday = (date) => {
  date = new Date(date)
  days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
  date = days[date.getDay()]
  return date
}

const getIVA = total => {
  if (total) {
    if (typeof total === 'string') {
      const iva = 1.16
      try {
        total = parseInt(total)
      } catch (e) {
        if (e) {
          return undefined
        }
      }
      return total * iva
    } else {
      const iva = 1.16
      return total * iva
    }
  } else {
    return total
  }
}

const costProject = (kilowatt, countKwh) => {
  console.log('costProject',kilowatt)
  var consumoTotal = 0

  if (kilowatt) {
    kilowatt = kilowatt.filter((item) => { 
      return (item.cost > 0) 
    }).reverse()
    while (countKwh >= 0 && kilowatt.length > 0) {
      let range = kilowatt.pop()
      let valueKilowatt = range.kilowatt 
      if (countKwh > valueKilowatt) {

        let consumo = countKwh - valueKilowatt
        countKwh -= valueKilowatt
        consumo = valueKilowatt * range.cost
        consumoTotal += consumo
      }
      
      while (kilowatt.length === 0 && countKwh > 0) {
        // range = kilowatt.pop()
        consumo = countKwh * range.cost
        consumoTotal += consumo
        countKwh -= range.kilowatt

        if (countKwh < range.kilowatt) {
          countKwh = 0
        }
        return consumoTotal
      }
    }
  }
}

const getDateBetweenPeriods = (contract, receipt, ratePeriod) => {
  
  const dateLimit = moment(receipt.payday_limit)
  const typePayment = (contract.type_payment == 'Bimestral') ? 2 : 1;
    const dateFinal = (dateLimit, typePayment) => {
      const monthsToAdd = dateLimit.month()+typePayment
      const finalDate = moment(new Date(dateLimit.year(), monthsToAdd, dateLimit.date()))
      dateLimit = moment(dateLimit)
      return { dateInitialReceipt: dateLimit, dateFinalReceipt: finalDate}
    }
  // *****************************************************
  var ratePeriodFinal;

  const initialDatePeriod = moment(contract.initialDateRange)
  const finalDatePeriod = moment(contract.finalDateRange)
  const monthFinalDatePeriod = finalDatePeriod.month()
  const rangeDatePeriod = dateFinal(dateLimit, typePayment)
  const { dateInitialReceipt, dateFinalReceipt } = rangeDatePeriod

  // empuje de datos en el arreglo de verano y fuera de verano
  var verano = [];
  var noverano = [];
  var sendPeriod
  ratePeriod.map((period, i) => {
    if(period.period_name === 'Verano') {
      verano.push(period)
      }
    else {
      noverano.push(period);
      }
    });

  if( dateInitialReceipt < finalDatePeriod && dateFinalReceipt > finalDatePeriod){
    var outputPeriod = []
    ratePeriod.map((period, i) => {
      if(typePayment === 2){
        outputPeriod.push({ period_name: period.period_name, kilowatt: period.kilowatt, cost: period.cost})
      }
      else{
        diffInitial = finalDatePeriod.diff(dateInitialReceipt, 'days')
        diffFinal = dateFinalReceipt.diff(finalDatePeriod, 'days')
        if (diffInitial > diffFinal){
          sendPeriod = verano
        }
        else{
          sendPeriod = noverano
        }

      }
    })
    if(outputPeriod.length > 0){
      outputPeriod.splice(3,1);
      sendPeriod = outputPeriod
    }

  }
  else if( dateInitialReceipt < finalDatePeriod && dateFinalReceipt < finalDatePeriod){
    var outputPeriod = []
    if(typePayment === 2){
      outputPeriod.push({ period_name: verano.period_name, kilowatt: verano.kilowatt*2, cost: verano.cost})
    }else{
      outputPeriod.push({period_name: verano.period_name, kilowatt: verano.kilowatt, cost: verano.cost}) 
    }
    sendPeriod = outputPeriod
  }
  else{
    if(typePayment === 2){
      outputPeriod.push({ period_name: noverano.period_name, kilowatt: noverano.kilowatt*2, cost: noverano.cost})
    }else{
      outputPeriod.push({period_name: noverano.period_name, kilowatt: noverano.kilowatt, cost: noverano.cost}) 
    }
    sendPeriod = outputPeriod
  }

  return sendPeriod
}

const getDayInDates = (fechaMinima, fechaMaxima) => {
  let fechaMin = Date.parse(fechaMinima)
  let fechaMax = Date.parse(fechaMaxima)
  let time = fechaMax - fechaMin
  let daysInMiliSeconds = time / 1000
  let daysInSeconds = daysInMiliSeconds / 60
  let daysInMinutes = daysInSeconds / 60
  let daysInHours = daysInMinutes / 24
  return daysInHours
}

const getProjected = ( consumo, average, restDay) => {
  let mult = restDay * average
  let projected = mult + consumo
  return projected
}

const getHoursTotals = (timeInitial, timeFinal) => {
  let time = timeFinal - timeInitial
  let seconds = time / 1000
  let minutes = seconds / 60
  let diffHour = minutes / 60

  return diffHour
}
const getTotalDays = (timeInitial, timeFinal) => {
  
  return getHoursTotals(timeInitial, timeFinal) / 24
}
const getFinalDate = (typePayment, paydayLimit) => {
  let MonthToPlus = getMonthByTypePayment (typePayment)
  paydayLimit = moment(paydayLimit)
  let newMonth = paydayLimit.month()+MonthToPlus
  let year = paydayLimit.year()
  let day = paydayLimit.date()
  let newDate = new Date(year, newMonth, day)
  let getDays = getTotalDays(paydayLimit, newDate )
  
  return Math.ceil(getDays)
}

const getMonthByTypePayment = typePayment => {
  let cantidadMeses;
  if(typePayment === 'Bimestral'){
    cantidadMeses = 2
  }
  else {
    cantidadMeses = 1
  }
  return cantidadMeses
}

const getRangeMonth = (typePayment, paydayLimit) => {
  let MonthToPlus = getMonthByTypePayment (typePayment)
  let arrMonth = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

  let initialDate = moment(paydayLimit)
  let getMonthPlus = initialDate.month()+MonthToPlus
  let getYear = initialDate.year()
  let getDay = initialDate.date()
  let finalDate = new Date(getYear, getMonthPlus, getDay)
  let momentFinalDate = moment(finalDate)

  let rangeDate =  arrMonth[initialDate.month()] + '-' + arrMonth[momentFinalDate.month()] 

  return rangeDate
}

const getMinimunYears = year => {
  return year - 18
}

const setRecord = data => {
  // Obtiene el ultimo dato actualizado
  const lastRecord = data.lastRecord
  const amount_payable = data.amount_payable
  //Fecha de actualizacion de record
  const date = new Date()    
  const year = date.getFullYear();
  const month = date.getMonth()+1; 
  const day = date.getDate();
  const dateFormat = year + '-' + month + '-' + day
  //Dia de la semana
  const weekday = getWeekday(date)
  //Fecha inicial del recibo
  const paydayLimit = new Date(data.itemReceipt.payday_limit)
  // Obtener los dias restantes dependiendo el tipo pago
  const typePayment = data.type_payment

  // const restDay = getRestDay(typePayment, paydayLimit)
  // Horas Totales
  const hoursTotals = getHoursTotals(paydayLimit.getTime(), date.getTime())
  const totalDays = getFinalDate(typePayment, paydayLimit)
  // Horas transcurridas
  const hoursElapsed = hoursTotals - lastRecord.hours_totals
  // Dias transcurridos
  const diffDays = getDayInDates(paydayLimit, date)
  // Dias Restantes
  const restDay = totalDays - Math.ceil(diffDays)
  // Dias transcurridos desde el ultimo record
  const diffDaysLastRecord = diffDays - lastRecord.days_totals
  // Consumo diario
  const { current_reading_updated, current_reading } = data.itemReceipt
  // Obtener valor del dia
  const dailyConsumption = current_reading_updated - current_reading
  // Consumo
  const cumulativeConsumption = data.current_data - current_reading
  // promedio Global
  const average = (cumulativeConsumption / diffDays).toFixed(4)
  // Se obtiene el valor proyectado
  const projection = getProjected(cumulativeConsumption, average, restDay)
  const projectedPayment = costProject(data.ratePeriod, projection)
  const projectedPaymentIVA = getIVA(projectedPayment)
  
  // const projectedPayment = 0
  const record = {
    contract_id: data.contract_id,
    date: dateFormat,
    datetime:dateFormat+'T12:00:00Z',
    day: weekday,
    daily_reading: data.current_data,
    hours_elapsed: hoursElapsed.toFixed(4),
    hours_totals: hoursTotals.toFixed(4),
    days_elapsed: diffDaysLastRecord.toFixed(4),
    days_totals: diffDays.toFixed(4),
    daily_consumption: dailyConsumption.toFixed(4),
    cumulative_consumption: cumulativeConsumption,
    projected_payment: projectedPaymentIVA,
    average_global: average,
    rest_day: restDay,
    projection: projection,
    amount_payable: amount_payable,
  }
  return record

}
export {
  getIVA,
  costProject,
  getWeekday,
  getDayInDates,
  getMinimunYears,
  getHoursTotals,
  getFinalDate,
  getTotalDays,
  getProjected,
  getMonthByTypePayment,
  getRangeMonth,
  setRecord,
  // ------------------
  getDateBetweenPeriods,
}
