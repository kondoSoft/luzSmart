import React, { Component } from 'react';
import { connect } from 'react-redux'
import  { Text, Container, Content, Icon, Thumbnail, Button, Form, Item, Label, Input } from 'native-base';
import { Platform, ScrollView, Dimensions, Keyboard, View, KeyboardAvoidingView, TouchableOpacity, Image, AlertIOS } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Header from '../header/index';
import styles from './styles';
import { registerUser } from '../../actions/user'
const Screen = Dimensions.get('window');
import ImagePicker from 'react-native-image-picker';
import PickerDate from '../datePicker';

class SignIn extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props){
    super(props)
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password1: '',
      password2: '',
      phone: 0,
      birth_date: '',
      zip_code: 0,
      avatarSource : require('../../../images/persona.png'),
      file: null,
    }
    this._keyboardDidHide = this._keyboardDidHide.bind(this)
    this.setBirthDay = this.setBirthDay.bind(this)
  }
  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {

        this.setState({
          avatarSource: response.uri,
          file: response,
        });
      }
    });
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
  setBirthDay(date){
    if (date === '') {

    }else {
      this.setState({
          birth_date: date
        })
    }
  }
  sendData(){
    this.props.registerUser(this.state)
    this.props.navigation.navigate("Login")
  }
  render(){
    const { first_name,last_name,email,password1,password2,avatarSource, birth_date, phone, zip_code } = this.state;
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
                  <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                    <View style={{marginBottom: 0,height: 65,width: '100%',justifyContent:'center'}}>
                      <Thumbnail source={ (this.state.file != null)? this.state.file : this.state.avatarSource}/>
                    </View>
                  </TouchableOpacity>
                </Col>
                <Col style={styles.row__top__col__right}>
                  <Image style={{width:30,height:30,marginRight:10}} source={(this.state.file != null)&& require('../../../images/succes.png')}/>
                  {/* <Button transparent style={{ backgroundColor: 'blue', textAlign: 'center'}}> */}
                    {/* <Icon name="md-create" style={ styles.row__top__col__right__icon }/> */}
                  {/* </Button> */}
                </Col>
              </Row>
              <Col>
                <Form>
                  <Item inlineLabel last style={styles.form__item}>
                    <Label style={styles.text}>Nombres<Text style={{color:'red',paddingBottom:10}}>*</Text>:</Label>
                    <Input
                      ref="first_name"
                      multiline
                      style={styles.form__item__input}
                      onChangeText={(first_name)=> this.setState({first_name})}
                      onFocus={() => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 0 : 80 })}
                    />
                    <Image style={{width:30,height:30,marginRight:10}} source={(this.state.first_name != "" && this.state.first_name.length > 6)&& require('../../../images/succes.png')}/>
                  </Item>
                  <Item inlineLabel last style={styles.form__item}>
                    <Label style={styles.text}>Apellidos<Text style={{color:'red',paddingBottom:10}}>*</Text>:</Label>
                    <Input
                      ref="last_name"
                      style={styles.form__item__input}
                      onChangeText={(last_name)=> this.setState({last_name})}
                      onFocus={() => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 0 : 80 })}
                    />
                    <Image style={{width:30,height:30,marginRight:10}} source={(this.state.last_name != "" && this.state.last_name.length > 6)&& require('../../../images/succes.png')}/>
                  </Item>
                  <Item inlineLabel last style={styles.form__item}>
                    <Label style={styles.text}>Email<Text style={{color:'red',paddingBottom:10}}>*</Text>:</Label>
                    <Input
                      autoCapitalize={'none'}
                      keyboardType='email-address'
                      ref='email'
                      style={styles.form__item__input}
                      onChangeText={(email)=> this.setState({email})}
                      value={(this.props.navigation.state.params != "")&& this.props.navigation.state.params }
                      onFocus={() => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 80 : 80 })}
                    />
                    <Image style={{width:30,height:30,marginRight:10}} source={(this.state.email != "" && this.state.email.includes('@') && this.state.email.includes('.'))&& require('../../../images/succes.png')}/>
                  </Item>
                  <Item inlineLabel last style={styles.form__item}>
                    <Label style={styles.text}>Contraseña<Text style={{color:'red',paddingBottom:10}}>*</Text>:</Label>
                    <Input
                      autoCapitalize={'none'}
                      ref="password1"
                      secureTextEntry={true}
                      style={styles.form__item__input}
                      onChangeText={(password1)=> this.setState({password1})}
                      onFocus={() => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 90 : 90 })}
                    />
                    <Image style={{width:30,height:30,marginRight:10}} source={(password1.length >= 8 && password1 === password2)&& require('../../../images/succes.png')}/>
                  </Item>
                  <Item inlineLabel last style={styles.form__item}>
                    <Label style={styles.text}>Confirmar contraseña<Text style={{color:'red',paddingBottom:10}}>*</Text>:</Label>
                    <Input
                      autoCapitalize={'none'}
                      ref="password2"
                      secureTextEntry={true}
                      style={styles.form__item__input}
                      onChangeText={(password2)=> this.setState({password2})}
                      onFocus={() => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 100 : 100 })}
                    />
                    <Image style={{width:30,height:30,marginRight:10}} source={(password2.length >= 8 && password1 === password2)&& require('../../../images/succes.png')}/>
                  </Item>
                  <Item inlineLabel last style={styles.form__item}>
                    <Label style={styles.text}>F. nacimiento<Text style={{color:'red',paddingBottom:10}}>*</Text>:</Label>
                    <PickerDate func={this.setBirthDay}/>
                    <Image style={{width:30,height:30,marginRight:10}} source={(birth_date != "")&& require('../../../images/succes.png')}/>
                  </Item>
                  <Item inlineLabel last style={styles.form__item}>
                    <Label style={styles.text}>Celular:</Label>
                    <Input
                      keyboardType='phone-pad'
                      maxLength={13}
                      ref="phone_number"
                      style={styles.form__item__input}
                      onChangeText={(phone)=> this.setState({phone})}
                      onFocus={()=>this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 200 : 200 })}
                    />
                    <Image style={{width:30,height:30,marginRight:10}} source={(phone != "" && phone.length >= 10)&& require('../../../images/succes.png')}/>
                  </Item>
                  <Item inlineLabel last style={styles.form__item}>
                    <Label style={styles.text}>C.P.:</Label>
                    <Input
                      maxLength={5}
                      keyboardType='numeric'
                      ref="zip_code"
                      style={styles.form__item__input}
                      onChangeText={(zip_code)=> this.setState({zip_code})}
                      onFocus={()=>this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 250 : 300 })}
                    />
                    <Image style={{width:30,height:30,marginRight:10}} source={(zip_code != "" && zip_code.length === 5)&& require('../../../images/succes.png')}/>
                  </Item>
                </Form>
              </Col>
              <Row style={styles.row__botttom}>
                <Button
                  primary
                  style={styles.row__botttom__btn}
                  onPress={()=>{
                    if (avatarSource != "" && first_name != "" && last_name != "" && email != "" && password1 != "" && password2 != "") {
                      if (password1 === password2) {
                          this.sendData()
                      }
                      else {
                          AlertIOS.alert(
                           'Contraseña incorrecta',
                           'Verifique que ambas contraseñas sean iguales.'
                          );
                            validation = require('../../../images/Failure.png')
                      }
                    }else {
                      AlertIOS.alert(
                       'Validacion de Formulario',
                       'Verifique que todos los campos obligatorios esten llenos.'
                      );
                    }
                  }}
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


function bindAction(dispatch) {
  return {
    registerUser: state => dispatch(registerUser(state)),
  };
}
export default connect(null, bindAction)(SignIn);
