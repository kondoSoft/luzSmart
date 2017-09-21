import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'


var date = new Date()
var formatDate = date.getFullYear()+ '-' + (date.getMonth() + 1) + '-' + date.getDate()


export default class ReceiptPickerDate extends Component {
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
        style={{width: '100%', marginBottom: 10, paddingTop: 5}}
        // date={this.state.date}
        mode="date"
        showIcon={false}
        placeholder="Fecha final de consumo"
        format="YYYY-MM-DD"
        // minDate={formatDate}
        // maxDate="2016-06-01"
        confirmBtnText="Confirmar"
        cancelBtnText="Cancelar"
        customStyles={{
          dateInput: {
            height:60,
            alignItems: 'flex-start',
            borderWidth:2,
            borderColor: 'lightgrey',
            paddingLeft: 20,
          },
          dateText:{
            fontSize: 16,
          },
          placeholderText:{
            color:'#000',
            fontSize: 15,
          }
        }}
        onDateChange={(date) => {
          this.setDate(date)
        }}
      />
    )
  }
}
