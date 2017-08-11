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
import { setUser, loginUser } from "../../actions/user";
import styles from "./styles";
import Header from '../header/index';
import { getStates } from "../../actions/list_states_mx";
const background = require("../../../images/shadow.png");
const Screen = Dimensions.get('window');
const logoFooter = require('../../../images/easylight.png');


const validate = values => {
  const error = {};
  error.email = "";
  error.password = "";
  var ema = values.email;
  var pw = values.password;
  if (values.email === undefined) {
    ema = "";
  }
  if (values.password === undefined) {
    pw = "";
  }
  // if (ema.length < 8 && ema !== "") {
  //   error.email = "too short";
  // }
  // if (!ema.includes("@") && ema !== "") {
  //   error.email = "@ not included";
  // }
  if (pw.length > 12) {
    error.password = "Max 11 caracteres";
  }
  if (pw.length < 8 && pw.length > 0) {
    error.password = "Muy corta";
  }
  return error;
};
  var errorLogin;
class Login extends Component {

  static propTypes = {
    setUser: React.PropTypes.func,
    loginUser: React.PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      loginNavigate: false
    };
    this.renderInput = this.renderInput.bind(this);
    this.handleContracts = this.handleContracts.bind(this);
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
      <Item error={hasError} style={{marginRight: 20}}>
        <Input
          returnKeyType={'done'}
          secureTextEntry={input.name === 'email' ? false : true}
          placeholder={input.name === "email" ? "Correo electrónico" : "Contraseña"}
          {...input}
          onFocus={() => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 0 : 0 })}
        />
        {hasError
          ? <Item style={{ borderColor: "transparent" }}>
              {/* <Icon active style={{ color: "red", marginTop: 5 }} name="bug" /> */}
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
      : e.password.toLowerCase())
    this.props.navigation.navigate("Contracts")
  }

  componentWillUpdate(){
    this.props.getStates()

  }
  render() {

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
                    onPress={() => this.props.navigation.navigate("SignIn")}
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
    loginUser: (email, password) => dispatch(loginUser(email, password)),
    getStates: () => dispatch(getStates()),
  };
}
const mapStateToProps = state => ({
  loginError: state.user.loginError
})

// export default LoginSwag;
export default connect(mapStateToProps, bindAction)(LoginSwag);
