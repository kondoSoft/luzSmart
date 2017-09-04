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
var pw;

const validate = values => {
  const error = {};
  error.email = "";
  error.password = "";
  ema = values.email;
  pw = values.password;
  if (values.email === undefined) {
    ema = "";
  }
  if (values.password === undefined) {
    pw = "";
  }
  if (!ema.includes("@") && ema !== "") {
    error.email = "Este no es un correo valido";
  }
  if (pw.length > 12) {
    error.password = "Maximo 11 caracteres";
  }
  if (pw.length < 8 && pw.length > 0) {
    error.password = "Contraseña muy corta";
  }
  return error;
};
  var errorLogin;
  var validationPass
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
      // validation: <Text style={{backgroundColor:'red', height:'25%',width: '94%', textAlign: 'center', paddingTop:0,color:'#fff'}}>{this.props.noPassword}</Text>
      validation: '',
    };
    this.renderInput = this.renderInput.bind(this);
    this.handleContracts = this.handleContracts.bind(this);
    this.renderInput = this.renderInput.bind(this)
  }
  renderInput({
    input,
    label,
    type,
    meta: { touched, error, warning },
    inputProps
  }) {
    var hasError = false;
    if (error !== undefined) {
      hasError = true;
    }
    return (
      <Item error={hasError} style={{marginRight:20}}>
        <Input
          autoCapitalize={'none'}
          secureTextEntry={input.name === "email" ? false : true }
          placeholder={input.name === "email" ? "Correo electrónico" : "Contraseña"}
          {...input}
          onFocus={() => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 0 : 0 })}
        />
        {hasError
          ? <Item style={{ borderColor: "transparent" }}>
              <Text style={{ fontSize: 15, color: "red" }}>{error}</Text>
            </Item>
          : <Text />}
      </Item>
    );
  }
  handleContracts(e){
    this.props.loginUser(
      (e.email === undefined)?
      e.email
      : e.email.toLowerCase(),
      (e.password === undefined)?
      e.email
      : e.password.toLowerCase(), this.props.navigation)



    // this.props.navigation.navigate("Contracts")
  }
  compon
  componentWillUpdate(){
    this.props.getStates()

  }
  componentWillMount(){
    this.props.logoutUser()

  }
  componentWillReceiveProps(nextProps){
    if(nextProps.noPassword != ''){
      this.setState({
        validation: nextProps.noPassword,
      })
    }
    if(nextProps.loginError != ''){
      this.setState({
        validation: nextProps.loginError,
      })
    }
    console.log(nextProps.loginError);
  //   if (nextProps.noPassword != undefined) {
  //     validationPass = nextProps.noPassword.toString()
  //   }
  //   console.log(nextProps.noPassword);
  //   this.setState({
  //     validation: <Text style={{backgroundColor:'red', height:'25%',width: '94%', textAlign: 'center', paddingTop:0,color:'#fff'}}>{nextProps.validationPass}</Text>
  //   })
  }
  render() {
    const { validation } = this.state
    const { handleSubmit } = this.props
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
                  { (this.state.validation != '') && <Text style={{backgroundColor:'red', height:'25%',width: '94%', textAlign: 'center', paddingTop:0,color:'#fff'}}>{this.state.validation}</Text>}
                  <Field style={styles.field__email} name="email" component={this.renderInput} />
                  <Field name="password" component={this.renderInput} />
                </Col>
              </Row>
              <Row size={40}>
                <Col style={styles.form}>
                  <Button
                    block
                    type="submit"
                    style={styles.btn}
                    onPress={handleSubmit(this.handleContracts)}
                  >
                    <Text>Entrar</Text>
                  </Button>
                  <Button
                    block
                    style={styles.btn}
                    onPress={() => this.props.navigation.navigate("SignIn",ema)}
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
                <Thumbnail source={ logoFooter } />
              </View>
            </Grid>
        </ScrollView>
      </Container>
    );
  }
}
const LoginSwag = reduxForm(
  {
    form: "test",
    validate
  },
)(Login);
LoginSwag.navigationOptions = {
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

// export default LoginSwag;
export default connect(mapStateToProps, bindAction)(LoginSwag);
