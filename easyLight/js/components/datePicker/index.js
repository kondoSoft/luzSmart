import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'
import {
  getMinimunYears
} from '../../helpers'

var date = new Date()
var formatDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()

export default class PickerDate extends Component {
  constructor (props) {
    super(props)
    this.state = {date: formatDate}
    this.setDate = this.setDate.bind(this)
    this.date
    this.maxDate
  }
  setDate (date) {
    this.setState({
      date
    })
    this.props.func(date)
  }
  componentWillMount () {
    let date = new Date()
    let year = date.getFullYear()
    this.date = getMinimunYears(year)
    this.maxDate = new Date(this.date, date.getMonth(), date.getDate())
    this.setState({
      date: this.maxDate
    })
  }
  render () {
    return (
      <DatePicker
        style={{width: '57%'}}
        date={this.state.date}
        mode='date'
        showIcon={false}
        placeholder='select date'
        format='YYYY-MM-DD'
        // minDate={formatDate}
        maxDate={'1999-12-31'}
        confirmBtnText='Confirmar'
        cancelBtnText='Cancelar'
        customStyles={{
          dateInput: {
            height: 40,
            alignItems: 'flex-start',
            paddingLeft: 90,
            width: '20%',
            borderWidth: 0
          },
          dateText: {
            fontSize: 16
          }
        }}
        onDateChange={(date) => {
          this.setDate(date)
        }}
      />
    )
  }
}
