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
} from 'react-native';
import Modal from 'react-native-modalbox';
import { Col, Row, Grid } from "react-native-easy-grid";
import Header from '../header/index';
import Footer from '../footer/index';
import styles from './styles';

class History extends Component{
  constructor(props){
    super(props)

    this.openModal = this.openModal.bind(this)

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
  render(){
    return(
      <Container>
        <ModalForm visible={this.state.open}/>
        <Header navigation={this.props.navigation} title="HISTORIAL" />
        <Content>
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
            </Col>
          </Grid>
        </Content>
        <View style={{ flex: 1}}>
          <Fab
            active={true}
            direction="up"
            style={{ backgroundColor: 'steelblue'}}
            position="bottomRight"
            // onPress={() => this.props.navigation.navigate("Receipt")}
            onPress={()=> this.openModal()}
            >
            <Icon active name="add" style={{fontSize: 35, lineHeight: 0}}/>
          </Fab>
        </View>
        <Footer navigation={this.props.navigation} />
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
          animationDuration={10000}
          style={{height: 300, width: 300, justifyContent: 'center',alignItems: 'center', borderRadius: 10}}
          >
          <Grid>
            <Row size={10} style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ alignItems: 'center'}}>AGREGA UN NUEVO HISTORIAL</Text>
            </Row>
            <Col size={60}>
              <Form>
                <Item fixedLabel last>
                  <Label style={{ flex: 2 }}>Periodo:</Label>
                  <Input />
                </Item>
                <Item fixedLabel last>
                  <Label style={{ flex: 2 }}>Consumo:</Label>
                  <Input />
                </Item>
                <Item fixedLabel last>
                  <Label style={{ flex: 2 }}>Pago:</Label>
                  <Input />
                </Item>
              </Form>
            </Col>
            <Row size={30} style={{justifyContent: 'space-between'}}>
              <Button small danger>
                <Text>Cancelar</Text>
              </Button>
              <Button small success>
                <Text>Guardar</Text>
              </Button>
            </Row>
          </Grid>
        </Modal>
    )
  }
}


export default History;
