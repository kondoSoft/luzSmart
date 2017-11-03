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
const { InAppUtils } = NativeModules

var products = [
   'com.kondosoft.easylight.item',
];



class Configuration extends Component {
  

  componentWillMount(){
    InAppUtils.restorePurchases((error, response) => {
     if(error) {
        Alert.alert('itunes Error', 'Could not connect to itunes store.');
     } else {
        Alert.alert('Restore Successful', 'Successfully restores all your purchases.');
        console.log('response', response)
        if (response.length === 0) {
          Alert.alert('No Purchases', "We didn't find any purchases to restore.");
          return;
        }

        response.forEach((purchase) => {
          if (purchase.productIdentifier === 'com.kondosoft.easylight.item') {
            // Handle purchased product.
          }
        });
     }
  });
    
  }

  payOneMonth() {
    console.log('products', products)
    console.log('in', InAppUtils)

    InAppUtils.loadProducts(products, (error, products) => {
      //update store here.
      
      console.log('InAppUtils',products, error)
    });
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
                onPress={() => this.payOneMonth(products)}
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
