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
  Content,
} from 'native-base';
import {
  Col,
  Row,
  Grid
} from 'react-native-easy-grid';
import { NativeModules } from 'react-native';
const { InAppUtils } = NativeModules

var products = [
   'com.kondosoft.easylight.anual',
   'com.kondosoft.easylight.mensual'
];



class Configuration extends Component {

  constructor(props){
    super(props)
    this.state = {
      products : [ ],


    }
  }
  componentWillMount(){
    InAppUtils.loadProducts(products, (error, products) => {
      this.setState({
        products
      })
    })
  }

  payOneMonth(product) {
    var productIdentifier = product.identifier;
    InAppUtils.purchaseProduct(productIdentifier, (error, response) => {
      console.log(response);
       if(response && response.productIdentifier) {
          Alert.alert('Compra Completada', 'Tu ID de transacción es ' + response.transactionIdentifier);
          //unlock store here.
       }
    });
  }

  render(){
    const arrProduct = this.state.products.reverse()

    console.log(this.props);
    return(
      <Container>
        <Grid style={{backgroundColor:'#fff'}}>
          <Col>
          <Col size={1.5}>
            <Col size={1} style={{paddingLeft:15,paddingRight:15, alignItems:'center',justifyContent:'center'}}>
              {/* <Text style={{textAlign:'center', fontSize: 14}}>Quieres pagar menos en tu recibo de luz?</Text> */}
              <Text style={{textAlign:'center', fontSize: 14}}>
                Ser Premium te brinda la experiencia óptima para disminiur tus consumos.
              </Text>
            </Col>
            <Row size={1} style={{alignItems: 'center',justifyContent:'space-around', margin: 0}}>
              {
                arrProduct.map((item, i)=>{

                  return (<View key={i} style={{flexDirection:'column',alignItems:'center'}}>
                    <Text>{item.title}</Text>
                    <Button style={{
                      backgroundColor:'#42c2f4',
                      width: 130,
                      alignItems:'center',
                      justifyContent:'center',
                      }}
                      onPress={() => this.payOneMonth(item)}
                     >
                      <Text style={{color:'#fff'}}>{item.priceString}</Text>
                    </Button>
                  </View>)
                })
              }
            </Row>
          </Col>
          <Col size={2.5} style={{alignItems:'center'}}>
            <Row size={0.4} style={{ marginTop: 5, alignItems: 'flex-end'}}>
              <Text style={{fontSize:18}}>Premium</Text>
            </Row>
            <Row size={1} style={{alignItems: 'center'}}>
              <View style={{flex:1, alignItems: 'center'}}>
                <Icon style={{fontSize: 50,}} name='locate' />
              </View>
              <View style={{flex:4, padding: 5, justifyContent: 'flex-start', paddingRight: 20}}>
                <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'justify' }}>Asesoría Técnica Personal en:</Text><Text style={{fontSize: 11,  textAlign: 'justify'}}>Ahorro de energía, tarifa DAC, validaciones de consumos, análisis de carga y otros (uso de paneles solares, inverter, etc.).</Text>
              </View>
            </Row>
            <Row size={1} style={{alignItems: 'center'}}>
              <View style={{flex:1, alignItems: 'center'}}>
                <Icon style={{fontSize: 50,}} name='albums' />
              </View>
              <View style={{flex:4, padding: 5, justifyContent: 'flex-start', paddingRight: 20}}>
                <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'justify' }}>Historial:</Text><Text style={{fontSize: 11, textAlign: 'justify'}}>Conserva todos los datos, registros e información de tu cuenta de contrato de luz.</Text>
              </View>
            </Row>
            <Row size={1} style={{alignItems: 'center'}}>
              <View style={{flex:1, alignItems: 'center'}}>
                <Icon style={{ fontSize: 50,}} name='infinite' />
              </View>
              <View style={{flex:4, padding: 5, justifyContent: 'flex-start', paddingRight: 20}}>
                <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'justify' }}>Contratos Ilimitados:</Text><Text style={{fontSize: 11, textAlign: 'justify'}}>Administra múltiples contratos de luz.</Text>
              </View>
            </Row>
            <Row size={1} style={{alignItems: 'center'}}>
              <View style={{flex:1, alignItems: 'center'}}>
                <Icon style={{ fontSize: 50,}} name='stats' />
              </View>
              <View style={{flex:4, padding: 5, justifyContent: 'flex-start', paddingRight: 20}}>
                <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'justify' }}>Gráficas y Reportes:</Text><Text style={{fontSize: 11, textAlign: 'justify'}}>Usa gráficas especializadas para tomar el control de tus consumos de luz y ahorrar más.</Text>
              </View>
            </Row>
          </Col>
        </Col>
        </Grid>
      </Container>
    )
  }
}


export default Configuration;
