import React, { Component } from "react";
import { Image, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from "react-native";
import { connect } from "react-redux";
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  Container,
  Content,
  // Header,
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
import { setUser } from "../../actions/user";
import styles from "./styles";
import Header from '../header/index';
const background = require("../../../images/shadow.png");
const Screen = Dimensions.get('window');

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
  if (ema.length < 8 && ema !== "") {
    error.email = "too short";
  }
  if (!ema.includes("@") && ema !== "") {
    error.email = "@ not included";
  }
  if (pw.length > 12) {
    error.password = "max 11 characters";
  }
  if (pw.length < 5 && pw.length > 0) {
    error.password = "Weak";
  }
  return error;
};

class Login extends Component {
  static propTypes = {
    setUser: React.PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
    this.renderInput = this.renderInput.bind(this);
  }
  setUser(name) {
    this.props.setUser(name);
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
      <Item error={hasError}>
        <Input
          placeholder={input.name === "email" ? "Correo electrónico" : "Contraseña"}
          {...input}
          onFocus={() => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 0 : 0 })}
        />
        {hasError
          ? <Item style={{ borderColor: "transparent" }}>
              <Icon active style={{ color: "red", marginTop: 5 }} name="bug" />
              <Text style={{ fontSize: 15, color: "red" }}>{error}</Text>
            </Item>
          : <Text />}
      </Item>
    );
  }
  render() {

    return (
      <Container scrollEnabled={false}>
        <Header title={"INICIO DE SESIÓN"} zIndex navigation={this.props.navigation}/>
        <ScrollView style={styles.container} ref='scroll'>
            <Grid style={{ height: Screen.height - 140, paddingTop: (Platform.OS === 'ios')? 100 : 120 }}>
              <Row  size={40}>
                <Col style={{justifyContent: 'flex-end', paddingLeft: 15}}>
                  <Field style={{backgroundColor: '#fff'}} name="email" component={this.renderInput} />
                  <Field name="password" component={this.renderInput} />
                </Col>
              </Row>
              <Row size={30}>
                <Col style={styles.form}>
                  <Button
                    block
                    style={styles.btn}
                    onPress={() => this.props.navigation.navigate("Contracts")}
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
            </Grid>
          <View style={styles.footer,{ alignItems:'center' }}>
            <Thumbnail source={ require('../../../images/easylight.png') } />
          </View>
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
  function bindActions(dispatch) {
    return {
      setUser: name => dispatch(setUser(name))
    };
  }
)(Login);
LoginSwag.navigationOptions = {
  header: null
};
export default LoginSwag;
