import React, { Component } from 'react';
import {
  View,
  Text,
  Alert,
} from 'react-native';
import {
  Container,
  Thumbnail,
  Icon,
  Input,
  Item,
  Button,
} from 'native-base';
import {
  Col,
  Row,
  Grid
} from 'react-native-easy-grid';

import { NativeModules } from 'react-native';

global.PaymentRequest = require('react-native-payments').PaymentRequest;

const METHOD_DATA = [{
  supportedMethods: ['apple-pay'],
  data: {
    merchantIdentifier: 'merchant.com.kondosoft.easylight.premium',
    supportedNetworks: ['visa', 'mastercard'],
    countryCode: 'MX',
    currencyCode: 'MXN'
  }
}];

const DETAILS = {
  id: 'basic-example',
  displayItems: [
    {
      label: 'Premium Mensual',
      amount: { currency: 'MXN', value: '89.00' }
    },
    {
      label: 'Premium Anual',
      amount: { currency: 'MXN', value: '890.00' }
    }
  ],
  total: {
    label: 'Merchant Name',
    amount: { currency: 'MXN', value: '15.00' }
  }
};
const OPTIONS = {
  requestPayerName: true
};
const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS, OPTIONS);

class Configuration extends Component {
  
  componentWillMount(){

  }
  payOneMonth(){
    // paymentRequest.show()
    // console.log(PaymentDetails)
    console.log(paymentRequest._details.displayItems)
  }

  render(){
    return(
      <Container>
        <Grid style={{backgroundColor:'#fff'}}>
          <Col size={15} style={{paddingLeft:15,paddingRight:15,alignItems:'center',justifyContent:'center'}}>
            <Text>Quieres pagar menos en tu recibo de luz?</Text>
            <Text style={{textAlign:'center'}}>
              Ser Premium te brinda la experiencia óptima para disminiur tus consumos y contribuyendo
              así con el medio ambiente.
            </Text>
          </Col>
          <Row size={14} style={{alignItems: 'center',justifyContent:'space-around'}}>
            <View style={{flexDirection:'column',alignItems:'center'}}>
              <Text>Mensual</Text>
              <Button style={{
                backgroundColor:'#42c2f4',
                width: 130,
                alignItems:'center',
                justifyContent:'center', 
                }}
                onPress={() => this.payOneMonth(paymentRequest)}
               >
                <Text style={{color:'#fff'}}>$89.00</Text>
              </Button>
            </View>
            <View style={{flexDirection:'column',alignItems:'center'}}>
              <Text>Anual</Text>
              <Button style={{backgroundColor:'#42c2f4',width: 130,alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:'#fff'}}>$890.00</Text>
              </Button>
            </View>
          </Row>
          <Col size={55} style={{alignItems:'center'}}>
            <Text style={{fontSize:18,height:30}}>Premium</Text>
            <View style={{flexDirection:'row',padding:3}}>
              <Thumbnail source={ require('../../../images/almacenamiento.png')} style={{ width: 60,height:60,borderRadius: 30,marginRight:10}} />
              <Text style={{width:'70%'}}>Asesoria Personalizada: Soporte técnico especializado que te ayudarán a optimizar y ahorrar mucho más.</Text>
            </View>
            <View style={{flexDirection:'row',padding:3}}>
              <Thumbnail source={ require('../../../images/asesoria.png')} style={{ width: 60,height:60,borderRadius: 30,marginRight:10}} />
              <Text style={{width:'70%'}}>Asesoria Personalizada: Soporte técnico especializado que te ayudarán a optimizar y ahorrar mucho más.</Text>
            </View>
            <View style={{flexDirection:'row',padding:3}}>
              <Thumbnail source={ require('../../../images/contactos.png')} style={{ width: 60,height:60,borderRadius: 30,marginRight:10}} />
              <Text style={{width:'70%'}}>Asesoria Personalizada: Soporte técnico especializado que te ayudarán a optimizar y ahorrar mucho más.</Text>
            </View>
            <View style={{flexDirection:'row',padding:3}}>
              <Thumbnail source={ require('../../../images/graficas.png')} style={{ width: 60,height:60,borderRadius: 30,marginRight:10}} />
              <Text style={{width:'70%'}}>Asesoria Personalizada: Soporte técnico especializado que te ayudarán a optimizar y ahorrar mucho más.</Text>
            </View>
          </Col>
        </Grid>
      </Container>
    )
  }
}


export default Configuration;
