import React, { Component } from "react";
import { Image, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from "react-native";
import { connect } from "react-redux";
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  Container,
  Content,
  Body,
  Button,
  Item,
  Input,
  Icon,
  View,
  Text,
  Thumbnail,
  Title,
  Form,
  Footer,
  Label,
  Right,
} from "native-base";
import { Dimensions, Platform } from 'react-native';
import { Field, reduxForm } from "redux-form";
import { setUser, loginUser, logoutUser } from "../../actions/user";
import styles from "./styles";
import Header from '../header/index';
import { getStates } from "../../actions/list_states_mx";
const background = require("../../../images/shadow.png");
const Screen = Dimensions.get('window');
const logoFooter = require('../../../images/easylight.png');

var ema;

class Login extends Component {

  static propTypes = {
    setUser: React.PropTypes.func,
    loginUser: React.PropTypes.func,
    getStates: React.PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      loginNavigate: false,
      validation: '',
      email: '',
      password: '',
    };
    this.reGex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    this.handleContracts = this.handleContracts.bind(this);
  }
  handleContracts(){
    if(this.state.email != '' && this.state.password != ''){
      this.props.loginUser(this.state.email,this.state.password,this.props.navigation)
    }
    else{
      if (this.state.email === '' && this.state.password === '') {
        this.setState({
          validation: `Must include either "username" or "email" and "password".`,
          isValidEmail: require('../../../images/Failure.png'),
          isValidPass: require('../../../images/Failure.png'),
        })
      }else if (this.state.email === '') {
        this.setState({
          validation: 'email requerido',
        })
      }else if (this.state.password === '') {
        this.setState({
          validation: 'password requerido',
        })
      }
    }
  }
  componentWillUpdate(){
    this.props.getStates()

  }
  componentWillMount(){
    this.props.logoutUser()

  }
  componentWillUnmount(){
    ema = ""
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.loginError === 'No puede iniciar sesión con las credenciales proporcionadas.') {
      this.setState({
        validation: nextProps.loginError,
        isValidPass: require('../../../images/Failure.png'),
        isValidEmail: require('../../../images/Failure.png'),
      })
    }
  }
  render() {
    const { validation } = this.state
    console.log(validation)
    const { handleSubmit } = this.props
    var validText;
    if (validation === `Must include either "username" or "email" and "password".`) {
      validText = <Text style={styles.textValidation}>Ambos campos son ˜ñ</Text>
    } else if(validation === 'email requerido') {
      validText = <Text style={styles.textValidation}>Ingrese un correo valido</Text>
    }else if (validation === 'password requerido') {
      validText = <Text style={styles.textValidation}>Ingrese una contraseña valida</Text>
    }
    return (
      <Container scrollEnabled={false}>
        <Header title={"INICIO DE SESIÓN"} zIndex navigation={this.props.navigation}/>
        <ScrollView
          style={styles.container}
          ref='scroll'
          scrollEnabled={false}
          >
            <Grid style={styles.grid}>
              <Row  size={40}>
                <Col style={styles.col__inputs__login}>
                  {/*  this.state.validation : null  } */}
                  { validText }
                  <Item style={{marginRight:20 }}>
                    <Input
                     keyboardType={"email-address"}
                     autoCapitalize={'none'}
                     placeholder={"Correo electrónico"}
                     onChangeText={email => {
                        this.setState({email})
                      }}
                     onBlur={()=>{
                      if (this.reGex.test(this.state.email)) {
                        ema = this.state.email
                        this.setState({
                          isValidEmail: require('../../../images/succes.png'),
                        }) 
                      } else {
                        this.setState({
                          isValidEmail: require('../../../images/Failure.png')
                        })
                      }
                     }}
                    />
                   <Image style={{width:30,height:30,marginRight:10}} source={this.state.isValidEmail}/>
                  </Item>
                  <Item style={{marginRight:20}}>
                    <Input
                     autoCapitalize={'none'}
                     placeholder={"Contraseña"}
                     secureTextEntry={true}
                     onChangeText={password => {this.setState({password})}}
                     returnKeyType={'done'}
                     onBlur={()=>{
                        if (this.state.password != '' && this.state.password.length >= 8) {
                          this.setState({
                            isValidPass: require('../../../images/succes.png')
                          })
                        }else {
                          this.setState({
                            isValidPass: require('../../../images/Failure.png')
                          })
                        }
                     }}
                    />
                    <Image style={{width:30,height:30,marginRight:10}} source={this.state.isValidPass}/>
                  </Item>
                </Col>
              </Row>
              <Row size={40}>
                <Col style={styles.form}>
                  <Button
                    block
                    type="submit"
                    style={styles.btn}
                    onPress={()=>{
                        this.handleContracts()  
                    }}
                  >
                    <Text>Entrar</Text>
                  </Button>
                  <Button
                    block
                    style={styles.btn}
                    onPress={() => this.props.navigation.navigate("SignIn",{ema})}
                  >
                    <Text>Crear Cuenta</Text>
                  </Button>
                </Col>
              </Row>
              <Row size={30}>
                <Col style={styles.btnView}>
                  <TouchableOpacity
                    style={styles.link}
                    onPress={() => this.props.navigation.navigate("Home")}>
                    <Text>Recuperar Contraseña</Text>
                  </TouchableOpacity>
                </Col>
              </Row>
              <View style={styles.footer}>
                <Thumbnail style={{width:80,height:80,borderRadius:40}} source={ logoFooter } />
              </View>
            </Grid>
        </ScrollView>
      </Container>
    );
  }
}
Login.navigationOptions = {
  header: null
};
function bindAction(dispatch) {
  return {
    setUser: name => dispatch(setUser(name)),
    loginUser: (email, password, navigate) => dispatch(loginUser(email, password, navigate)),
    getStates: () => dispatch(getStates()),
    logoutUser: () => dispatch(logoutUser()),

  };
}
const mapStateToProps = state => ({
  loginError: state.user.loginError,
  noPassword: state.user.noPassword,
})

export default connect(mapStateToProps, bindAction)(Login);
