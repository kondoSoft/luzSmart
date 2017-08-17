import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'

export default class PickerDate extends Component {
  constructor(props){
    super(props)
    this.state = {date:"2016-05-15"}
  }

  render(){
    return (
      <DatePicker
        style={{width: '100%'}}
        date={this.state.date}
        mode="date"
        showIcon={false}
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2016-06-01"
        confirmBtnText="Confirmar"
        cancelBtnText="Cancelar"
        customStyles={{
          dateInput: {
            marginBottom: 20,
            height: 45,
            borderColor: 'lightgrey',
            borderTopWidth: 2,
            borderLeftWidth: 2,
            borderBottomWidth: 2,
            borderRightWidth: 2,
            alignItems: 'flex-start',
            paddingLeft: 18
          },
          dateText:{
            fontSize: 16
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
    )
  }
}
