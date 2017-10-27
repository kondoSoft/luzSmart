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
  var consumoTotal = 0
  if (kilowatt) {
    kilowatt = kilowatt.filter((item) => { return (item.kilowatt > 0) }).reverse()

    while (countKwh >= 0 && kilowatt.length > 0) {
      let range = kilowatt.pop()
      if (countKwh > range.kilowatt) {
        let consumo = countKwh - range.kilowatt
        countKwh -= range.kilowatt
        consumo = range.kilowatt * range.cost
        consumoTotal += consumo
      }

      while (kilowatt.length == 0 && countKwh > 0) {
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
  let newMonth = paydayLimit.getMonth()+MonthToPlus
  let newDate = new Date(paydayLimit.getFullYear(), newMonth, paydayLimit.getDate())
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
  let initialDate = new Date(paydayLimit)
  let diffDate = initialDate.getMonth()+MonthToPlus
  let finalDate = new Date(initialDate.getFullYear(), diffDate, initialDate.getDate())
  let rangeDate =  arrMonth[initialDate.getMonth()] + '-' + arrMonth[finalDate.getMonth()]

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
  console.log('diffDaysLastRecord', diffDaysLastRecord);
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
    projected_payment: projectedPayment,
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
}
