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

const whileCosts = (kilowatt, countKwh) => {
    // console.log(kilowatt, countKwh)
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
const getKwHrsTransCurrid = (kwInicial, kwFinal, translatedDays) => {
  let diffKw = kwFinal - kwInicial
  let perDays = diffKw / translatedDays
  return perDays
}

const getProjected = ( consumo, average, restDay) => {
  let mult = consumo * average
  let projected = mult / restDay
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
  // let fechaInicial =
  var cantidadMeses;
  if(typePayment === 'Bimestral'){
    cantidadMeses = 2
  }
  else {
    cantidadMeses = 1
  }
  let newMonth = paydayLimit.getMonth()+cantidadMeses
  let newDate = new Date(paydayLimit.getFullYear(), newMonth, paydayLimit.getDate())
  let getDays = getTotalDays(paydayLimit, newDate )
  // new Date(limitReceipt).setDate(new Date(limitReceipt).getDate() - count_days
  return Math.ceil(getDays)
}

const getMinimunYears = year => {
  return year - 18
}
export {
  getIVA,
  whileCosts,
  getWeekday,
  getDayInDates,
  getKwHrsTransCurrid,
  getMinimunYears,
  getHoursTotals,
  getFinalDate,
  getTotalDays,
  getProjected,
}
