import React, { Component } from 'react';
import {
  Container,
  Content,
  Text,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Fab,
  Icon,
  Form,
  Item,
  Label,
  Input,
  Button,
} from 'native-base';
import {
  View,
  Dimensions,
  Platform,
} from 'react-native';
import Modal from 'react-native-modalbox';
import ModalWrapper from 'react-native-modal-wrapper';
import { Col, Row, Grid } from "react-native-easy-grid";
import Header from '../header/index';
import Footer from '../footer/index';
import styles from './styles';
import FabButton from '../fabButton/index';


let Window = Dimensions.get('window');

class History extends Component{
  constructor(props){
    super(props)

    this.openModal = this.openModal.bind(this)
    this.onClose = this.onClose.bind(this)

    this.state = {
      open: false
    }
  }
  static navigationOptions = {
    header: null
  };
  openModal(){
    this.setState({
      open: !this.state.open
    })
  }
  onClose(){
    this.setState({
      open: !this.state.open
    })
  }
  render(){
    const { navigation } = this.props
    return(
      <Container>
        {(Platform.OS === 'ios')? <ModalForm visible={this.state.open} onClose={this.onClose} navigation={this.props.navigation}/> : <ModalAndroid visible={this.state.open} navigation={this.props.navigation} onCancel={this.onClose}/>}
        <Header navigation={this.props.navigation} title="Historial" />
        {(Platform.OS === 'android')? <Footer navigation={navigation}/> : null}
        <Content style={{backgroundColor: '#fff'}}>
          <Grid>
            <Col>
              <List>
                <ListItem last style={styles.listItem__gray}>
                  <Left style={styles.listItem__left}>
                    <Text>Marzo 17</Text>
                  </Left>
                  <Body style={styles.listItem__body}>
                    <Text>45000 kWh</Text>
                  </Body>
                  <Right style={styles.listItem__right}>
                    <Text>$2,150</Text>
                  </Right>
                </ListItem>
                <ListItem last style={styles.listItem__white}>
                  <Left style={styles.listItem__left}>
                    <Text>Abril 17</Text>
                  </Left>
                  <Body style={styles.listItem__body}>
                    <Text>46000 kWh</Text>
                  </Body>
                  <Right style={styles.listItem__right}>
                    <Text>$3,100</Text>
                  </Right>
                </ListItem>
                <ListItem last style={styles.listItem__gray}>
                  <Left style={styles.listItem__left}>
                    <Text>Mayo 17</Text>
                  </Left>
                  <Body style={styles.listItem__body}>
                    <Text>30000 kWh</Text>
                  </Body>
                  <Right style={styles.listItem__right}>
                    <Text>$1,150</Text>
                  </Right>
                </ListItem>
              </List>
              {/* <DatePickerC/> */}
            </Col>
          </Grid>
        </Content>
        <FabButton
          navigation={this.props.navigation}
          onTap={()=> this.openModal()}
          >
          <Text style={{ width: (Platform.OS === 'ios')? 42 : 50 , height: (Platform.OS === 'ios')? 42 : 50, textAlign: 'center', fontSize: 30, color: '#fff'}}>+</Text>
        </FabButton>
        {(Platform.OS === 'ios')? <Footer navigation={navigation}/> : null}
      </Container>
    )
  }
}

class ModalForm extends Component {
  render(){
    return(
        <Modal
          position={'center'}
          backdrop={true}
          isOpen={this.props.visible}
          entry={'bottom'}
          backdropOpacity={0.8}
          animationDuration={600}
          onClosed={this.props.onClose}
          style={{ height: '40%', borderRadius: 10, width: '80%'}}
          >
          <Grid>
            <Row size={10} style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ alignItems: 'center'}}>Agrega un nuevo historial</Text>
            </Row>
            <Col size={75}>
              <Form>
                <Item fixedLabel style={{marginRight: 15}}>
                  <Label style={{ flex: 0.7 }}>Periodo:</Label>
                  <Input />
                </Item>
                <Item fixedLabel style={{marginRight: 15}}>
                  <Label style={{ flex: 0.9 }}>Consumo:</Label>
                  <Input />
                </Item>
                <Item fixedLabel style={{marginRight: 15}}>
                  <Label style={{ flex: 0.5 }}>Pago:</Label>
                  <Input keyboardType={'numeric'} />
                </Item>
              </Form>
            </Col>
            <Row size={15} style={{ }}>
              <Button
                small
                style={{ flex: 1,height: '100%', backgroundColor: 'transparent', borderTopWidth: 1, borderRadius: 0, borderColor: 'lightgrey'}}
                onPress={()=>this.props.navigation.navigate('History')}
                >
                <Text style={{color: '#007aff', textAlign: 'center', flex: 1}}>Cancelar</Text>
              </Button>
              <Button
                small
                style={{ flex: 1, height: '100%', backgroundColor: 'transparent', borderTopWidth: 1, borderLeftWidth: 1, borderRadius: 0, borderColor: 'lightgrey'}}
                onPress={()=>this.props.navigation.navigate('History')}
                >
                <Text style={{color: '#007aff', textAlign: 'center', flex: 1}}>Guardar</Text>
              </Button>
            </Row>
          </Grid>
        </Modal>
    )
  }
}

class ModalAndroid extends Component {
  render(){
    return(
      <ModalWrapper
        style={{ width: 300, height: 280, paddingLeft: 24, paddingRight: 24, justifyContent: 'flex-start', paddingTop: 20, alignItems: 'center' }}
        visible={this.props.visible}
        >
        <Text style={{fontSize:18}}>Agrega un nuevo historial</Text>
        <Form style={{width: '100%',marginTop:10}}>
          <Item fixedLabel style={{marginRight: 15,borderColor: 'green'}}>
            <Input placeholder={"Periodo:"} style={{paddingTop:10}} />
          </Item>
          <Item fixedLabel style={{marginRight: 15,borderColor: 'green'}}>
            <Input placeholder={"Consumo:"} style={{paddingTop:10}} />
          </Item>
          <Item fixedLabel style={{marginRight: 15,borderColor: 'green'}}>
            <Input placeholder={"Pago:"} style={{paddingTop:10}} keyboardType={'numeric'} />
          </Item>
        </Form>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', width:'110%', marginTop:20}}>
          <Button
            style={{ height: 35,backgroundColor: 'red'}}
            onPress={this.props.onCancel}
            >
            <Text>Cancelar</Text>
          </Button>
          <Button
            style={{ height: 35,backgroundColor: 'green'}}
            onPress={()=>this.props.navigation.navigate('History')}
            >
            <Text>Agregar</Text>
          </Button>
        </View>
      </ModalWrapper>
    )
  }
}

export default History;
