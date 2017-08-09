import React, { Component } from 'react';
import  { Text, Container, Content, Icon, Thumbnail, Button, Form, Item, Label, Input } from 'native-base';
import { Platform, ScrollView, Dimensions, Keyboard, View, KeyboardAvoidingView } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Header from '../header/index';
import styles from './styles';

const Screen = Dimensions.get('window');

class SignIn extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props){
    super(props)

    this._keyboardDidHide = this._keyboardDidHide.bind(this)
  }
  componentWillMount () {
   this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }
  componentWillUnmount () {
    this.keyboardDidHideListener.remove();
  }
  _keyboardDidHide () {
    this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 0 : 0})
  }
  render(){
    return(
        <Container style={{height:Screen.height}}>
          <Header zIndex navigation={this.props.navigation} title="Nuevo Registro"/>
          <ScrollView
            style={{backgroundColor: '#fff'}}
            ref='scroll'
            >
            <Grid>
              <Row style={styles.row__top}>
                <Col style={styles.row__top__col__left}>
                  <Thumbnail style={{width: 70, height:70}} source={ require('../../../images/profile.png')} />
                </Col>
                <Col style={styles.row__top__col__right}>
                  {/* <Button transparent style={{ backgroundColor: 'blue', textAlign: 'center'}}> */}
                    <Icon name="md-create" style={ styles.row__top__col__right__icon }/>
                  {/* </Button> */}
                </Col>
              </Row>
              <Col>
                <Form>
                  <Item inlineLabel last style={styles.form__item}>
                    <Label style={styles.text}>Nombres:</Label>
                    <Input
                      style={styles.form__item__input}
                      onFocus={() => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 0 : 80 })}
                    />
                  </Item>
                  <Item inlineLabel last style={styles.form__item}>
                    <Label style={styles.text}>Apellidos:</Label>
                    <Input
                      style={styles.form__item__input}
                      onFocus={() => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 0 : 80 })}
                    />
                  </Item>
                  <Item inlineLabel last style={styles.form__item}>
                    <Label style={styles.text}>Email:</Label>
                    <Input
                      style={styles.form__item__input}
                      onFocus={() => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 80 : 80 })}
                    />
                  </Item>
                  <Item inlineLabel last style={styles.form__item}>
                    <Label style={styles.text}>Contraseña:</Label>
                    <Input
                      style={styles.form__item__input}
                      onFocus={() => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 90 : 90 })}
                    />
                  </Item>
                  <Item inlineLabel last style={styles.form__item}>
                    <Label style={styles.text}>Confirmar contraseña:</Label>
                    <Input
                      style={styles.form__item__input}
                      onFocus={() => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 100 : 100 })}
                    />
                  </Item>
                  <Item inlineLabel last style={styles.form__item}>
                    <Label style={styles.text}>F. nacimiento:</Label>
                    <Input
                      style={styles.form__item__input}
                      onFocus={() => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 160 : 160 })}
                    />
                  </Item>
                  <Item inlineLabel last style={styles.form__item}>
                    <Label style={styles.text}>Celular:</Label>
                    <Input
                      style={styles.form__item__input}
                      onFocus={()=>this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 200 : 200 })}
                    />
                  </Item>
                  <Item inlineLabel last style={styles.form__item}>
                    <Label style={styles.text}>C.P.:</Label>
                    <Input
                      style={styles.form__item__input}
                      onFocus={()=>this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 250 : 300 })}
                    />
                  </Item>
                </Form>
              </Col>
              <Row style={styles.row__botttom}>
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
