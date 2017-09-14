

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

export {getIVA}
