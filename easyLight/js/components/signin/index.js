import React, { Component } from 'react';
import  { Text, Container, Content, Icon, Thumbnail, Button, Form, Item, Label, Input } from 'native-base';
import { Platform, ScrollView, Dimensions } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Header from '../header/index';
import styles from './styles';

const Screen = Dimensions.get('window');


class SignIn extends Component {
  static navigationOptions = {
    header: null
  };
  render(){
    console.log('this is the height of the movile',Screen.height)
    return(
        <Container style={{height:Screen.height}}>
          <Header zIndex navigation={this.props.navigation} title="NUEVO REGISTRO"/>
          <ScrollView
            style={{height: Screen.height - 40}}
            ref='scroll'
            >
            <Grid style={{flex: 1}}>
              <Row style={[styles.row__top,{height: '15%',paddingTop: 5, paddingBottom: 5}]}>
                <Col style={styles.row__top__col__left}>
                  <Thumbnail source={ require('../../../images/profile.png')} />
                </Col>
                <Col style={styles.row__top__col__right}>
                  {/* <Button transparent style={{ backgroundColor: 'blue', textAlign: 'center'}}> */}
                    <Icon name="md-create" style={ styles.row__top__col__right__icon }/>
                  {/* </Button> */}
                </Col>
              </Row>
              <Col style={{height: '75%'}}>
                <Form>
                  <Item inlineLabel last style={{ alignItems: 'center',justifyContent: 'center',paddingTop: (Screen.height > 592)? 10  : 5, paddingBottom: (Screen.height > 552)? 10  : 5}}>
                    <Label>Nombres:</Label>
                    <Input style={{ height: '80%',padding: 0,margin: 0,paddingBottom: 3}} onFocus={() => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 0 : 80 })} />
                  </Item>
                  <Item inlineLabel last style={{ alignItems: 'center',justifyContent: 'center',paddingTop: (Screen.height > 592)? 10  : 5, paddingBottom: (Screen.height > 552)? 10  : 5}}>
                    <Label>Apellidos:</Label>
                    <Input style={{ height: '80%',padding: 0,margin: 0,paddingBottom: 3}} onFocus={() => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 0 : 80 })} />
                  </Item>
                  <Item inlineLabel last style={{ alignItems: 'center',justifyContent: 'center',paddingTop: (Screen.height > 592)? 10  : 5, paddingBottom: (Screen.height > 552)? 10  : 5}}>
                    <Label>Email:</Label>
                    <Input style={{ height: '80%',padding: 0,margin: 0,paddingBottom: 3}} onFocus={() => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 0 : 80 })} />
                  </Item>
                  <Item inlineLabel last style={{ alignItems: 'center',justifyContent: 'center',paddingTop: (Screen.height > 592)? 10  : 5, paddingBottom: (Screen.height > 552)? 10  : 5}}>
                    <Label>Contraseña:</Label>
                    <Input style={{ height: '80%',padding: 0,margin: 0,paddingBottom: 3}} onFocus={() => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 0 : 90 })} />
                  </Item>
                  <Item inlineLabel last style={{ alignItems: 'center',justifyContent: 'center',paddingTop: (Screen.height > 592)? 10  : 5, paddingBottom: (Screen.height > 552)? 10  : 5}}>
                    <Label>Confirmar contraseña:</Label>
                    <Input style={{ height: '80%',padding: 0,margin: 0,paddingBottom: 3}} onFocus={() => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 0 : 100 })} />
                  </Item>
                  <Item inlineLabel last style={{ alignItems: 'center',justifyContent: 'center',paddingTop: 3, paddingBottom: 3}}>
                    <Label>F. nacimiento:</Label>
                    <Input onFocus={() => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 0 : 160 })} />
                  </Item>
                  <Item inlineLabel last style={{ alignItems: 'center',justifyContent: 'center',paddingTop: (Screen.height > 592)? 10  : 5, paddingBottom: (Screen.height > 552)? 10  : 5}}>
                    <Label>Celular:</Label>
                    <Input style={{ height: '80%',padding: 0,margin: 0,paddingBottom: 3}} onFocus={() => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 0 : 200 })} />
                  </Item>
                  <Item inlineLabel last style={{ alignItems: 'center',justifyContent: 'center',paddingTop: (Screen.height > 592)? 10  : 5, paddingBottom: (Screen.height > 552)? 10  : 5}}>
                    <Label>C.P.:</Label>
                    <Input style={{ height: '80%',padding: 0,margin: 0,paddingBottom: 3}} onFocus={() => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 0 : 300 })} />
                  </Item>
                </Form>
              </Col>
              <Row style={[styles.row__botttom,{ height:'10%',paddingTop:10,paddingBottom:10}]}>
                <Button
                  primary
                  style={styles.row__botttom__btn}
                  >
                  <Text>Crear cuenta</Text>
                </Button>
              </Row>
            </Grid>
          </ScrollView>
        </Container>
    )
  }
}

export default SignIn;
