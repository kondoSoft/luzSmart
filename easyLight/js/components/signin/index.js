import React, { Component } from 'react';
import  { Text, Container, Content, Icon, Thumbnail, Button, Form, Item, Label, Input } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import Header from '../header/index';
import styles from './styles';

class SignIn extends Component {
  static navigationOptions = {
    header: null
  };
  render(){
    return(
        <Container>
          <Header navigation={this.props.navigation} title="NUEVO REGISTRO"/>
            <Grid>
              <Row size={15} style={styles.row__top}>
                <Col style={styles.row__top__col__left}>
                  <Thumbnail source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }} />
                </Col>
                <Col style={styles.row__top__col__right}>
                  {/* <Button transparent style={{ backgroundColor: 'blue', textAlign: 'center'}}> */}
                    <Icon name="md-create" style={ styles.row__top__col__right__icon }/>
                  {/* </Button> */}
                </Col>
              </Row>
              <Col size={75}>
                <Form>
                  <Item inlineLabel last>
                    <Label>Nombres:</Label>
                    <Input />
                  </Item>
                  <Item inlineLabel last>
                    <Label>Apellidos:</Label>
                    <Input />
                  </Item>
                  <Item inlineLabel last>
                    <Label>Correo electrónico:</Label>
                    <Input />
                  </Item>
                  <Item inlineLabel last>
                    <Label>Contraseña:</Label>
                    <Input />
                  </Item>
                  <Item inlineLabel last>
                    <Label>Confirmar contraseña:</Label>
                    <Input />
                  </Item>
                  <Item inlineLabel last>
                    <Label>F. nacimiento:</Label>
                    <Input />
                  </Item>
                  <Item inlineLabel last>
                    <Label>Celular:</Label>
                    <Input />
                  </Item>
                  <Item inlineLabel last>
                    <Label>C.P.:</Label>
                    <Input />
                  </Item>
                </Form>
              </Col>
              <Row size={10} style={styles.row__botttom}>
                <Button
                  small primary
                  style={styles.row__botttom__btn}
                  >
                  <Text>Crear</Text>
                </Button>
              </Row>
            </Grid>
        </Container>
    )
  }
}

export default SignIn;
