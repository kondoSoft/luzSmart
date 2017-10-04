

const getIVA = total => {
  if (total) {
    if (typeof total === 'string') {
      const iva = 1.16;
      try {
        total = parseInt(total)
      } catch (e) {
        if (e) {
          return undefined
        }
      }
      return total * iva;
    }else {
      const iva = 1.16;
      return total * iva;
    }
  }else {
    return total
  }

}


const whileCosts = (kilowatt, countKwh) => {
  console.log('kilowatt', kilowatt)
    var consumoTotal = 0;
    if(kilowatt){
      kilowatt = kilowatt.filter((item)=> {return (item.kilowatt>0)}).reverse()
  
      while(countKwh >= 0 && kilowatt.length > 0) {
        let range = kilowatt.pop()
        if (countKwh > range.kilowatt){
          let consumo = countKwh - range.kilowatt
          countKwh -= range.kilowatt
          consumo = range.kilowatt * range.cost
          consumoTotal += consumo
        }

        while ( kilowatt.length == 0 && countKwh > 0){
          consumo = countKwh * range.cost
          consumoTotal += consumo
          countKwh -= range.kilowatt

          if (countKwh < range.kilowatt){
            countKwh = 0
          }
          return consumoTotal
        }
      }
    }
  }

export {
  getIVA,
  whileCosts,
}
