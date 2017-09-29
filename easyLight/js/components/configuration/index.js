import React, { Component } from 'react';
import {
  View,
  Text,
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

class Configuration extends Component {
  render(){
    console.log('props of configutation',this.props);
    return(
      <Container>
        <Grid style={{backgroundColor:'#fff'}}>
          <Row size={15} style={{alignItems: 'center', justifyContent: 'center',paddingLeft:15,paddingRight:15}}>
            <Thumbnail source={ require('../../../images/profile.png')} style={{ width: 70,height:70,borderRadius: 35}} />
            <View style={{alignItems: 'center',marginRight:0,marginLeft:0,flexDirection: 'column'}}>
              <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',width:'85%'}}>
                <Item regular style={{width:'80%',height: '80%',borderBottomWidth:0,borderTopWidth:0,borderLeftWidth:0,borderRightWidth:0}}>
                  <Input placeholder='Nombre' style={{height: '100%',textAlign:'center',paddingLeft:0,fontSize: 14}} />
                </Item>
                <Icon name="md-create" style={{color:'lightgrey'}}/>
              </View>
              <Item regular style={{width:'90%',height: '30%',borderBottomWidth:0,borderTopWidth:2,borderLeftWidth:0,borderRightWidth:0,borderColor:'lightgrey',paddingRight:25}}>
                <Input placeholder='Correo electrónico' style={{height: '100%',textAlign:'center',fontSize: 14}} />
              </Item>
            </View>
          </Row>
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
              <Button style={{backgroundColor:'#42c2f4',width: 130,alignItems:'center',justifyContent:'center'}}>
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
              <Thumbnail source={ require('../../../images/profile.png')} style={{ width: 60,height:60,borderRadius: 30,marginRight:10}} />
              <Text style={{width:'70%'}}>Asesoria Personalizada: Soporte técnico especializado que te ayudarán a optimizar y ahorrar mucho más.</Text>
            </View>
            <View style={{flexDirection:'row',padding:3}}>
              <Thumbnail source={ require('../../../images/profile.png')} style={{ width: 60,height:60,borderRadius: 30,marginRight:10}} />
              <Text style={{width:'70%'}}>Asesoria Personalizada: Soporte técnico especializado que te ayudarán a optimizar y ahorrar mucho más.</Text>
            </View>
            <View style={{flexDirection:'row',padding:3}}>
              <Thumbnail source={ require('../../../images/profile.png')} style={{ width: 60,height:60,borderRadius: 30,marginRight:10}} />
              <Text style={{width:'70%'}}>Asesoria Personalizada: Soporte técnico especializado que te ayudarán a optimizar y ahorrar mucho más.</Text>
            </View>
            <View style={{flexDirection:'row',padding:3}}>
              <Thumbnail source={ require('../../../images/profile.png')} style={{ width: 60,height:60,borderRadius: 30,marginRight:10}} />
              <Text style={{width:'70%'}}>Asesoria Personalizada: Soporte técnico especializado que te ayudarán a optimizar y ahorrar mucho más.</Text>
            </View>
          </Col>
        </Grid>
      </Container>
    )
  }
}


export default Configuration;
