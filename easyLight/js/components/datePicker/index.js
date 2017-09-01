import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'


var date = new Date()
var formatDate = date.getFullYear()+ '-' + (date.getMonth() + 1) + '-' + date.getDate()

export default class PickerDate extends Component {
  constructor(props){

    super(props)
    this.state = {date: formatDate}
    this.setDate = this.setDate.bind(this)
  }
  setDate(date){
    this.setState({
      date: date
    })
    this.props.func(date)
  }

  render(){
    return (
      <DatePicker
        style={{width: '70%'}}
        date={this.state.date}
        mode="date"
        showIcon={false}
        placeholder="select date"
        format="YYYY-MM-DD"
        // minDate={formatDate}
        // maxDate="2016-06-01"
        confirmBtnText="Confirmar"
        cancelBtnText="Cancelar"
        customStyles={{
          dateInput: {
            height: 39,
            alignItems: 'flex-start',
            paddingLeft: 120,
            borderWidth:0,
          },
          dateText:{
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
