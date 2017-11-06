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
   'com.kondosoft.easylight.threemonth',
   'com.kondosoft.easylight.premium'
];



class Configuration extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      products : [ ]

      
    }
  }
  componentWillMount(){

    InAppUtils.loadProducts(products, (error, products) => {
      this.setState({
        products
      })
    });
  }

  payOneMonth() {
    console.log('products', products)
    console.log('in', InAppUtils)

    
  }

  render(){
    console.log(this.state.products)
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
            {
              this.state.products.map((item, i)=>{

                return (<View key={i} style={{flexDirection:'column',alignItems:'center'}}>
                  <Text>{item.title}</Text>
                  <Button style={{
                    backgroundColor:'#42c2f4',
                    width: 130,
                    alignItems:'center',
                    justifyContent:'center', 
                    }}
                    // onPress={() => this.payOneMonth(products)}
                   >
                    <Text style={{color:'#fff'}}>{item.priceString}</Text>
                  </Button>
                </View>)
              })
            }
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
