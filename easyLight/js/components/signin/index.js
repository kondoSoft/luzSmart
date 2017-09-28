import React, { Component } from 'react';
import { connect } from 'react-redux'
import  { Text, Container, Content, Icon, Thumbnail, Button, Form, Item, Label, Input } from 'native-base';
import { Platform, ScrollView, Dimensions, Keyboard, View, KeyboardAvoidingView, TouchableOpacity, Image, AlertIOS } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Header from '../header/index';
import styles from './styles';
import { registerUser } from '../../actions/user'
import ImagePicker from 'react-native-image-picker';
import PickerDate from '../datePicker';

const Screen = Dimensions.get('window');
var reGex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

class SignIn extends Component {

  constructor(props){
    super(props)
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password1: '',
      password2: '',
      phone: '',
      birth_date: '',
      zip_code: 0,
      avatarSource : require('../../../images/persona.png'),
      file: null,
      isValidAvatar: '',
      isValidName: '',
      isValidLastName: '',
      isValidEmail: '',
      isValidPassword: '',
      isValidBDay: '',
      isValidPhone: '',
      isValidZipCode: '',

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
        this.setState({
          isValidAvatar: require('../../../images/Failure.png')
        })
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
    if (this.props.navigation.state.params != "") {
      this.setState({
        email: this.props.navigation.state.params.ema
      })
    }
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
      this.setState({
        isValidBDay: require('../../../images/Failure.png')
      })
    }else {
      this.setState({
          birth_date: date,
          isValidBDay: require('../../../images/succes.png')
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
                  <Image style={{width:30,height:30,marginRight:10}} source={(this.state.file != null)? require('../../../images/succes.png') : this.state.isValidAvatar}/>
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
                      onBlur={()=>{
                        if (first_name.length < 3) {
                          this.setState({
                            isValidName: require('../../../images/Failure.png')
                          })  
                        }else {
                          this.setState({
                            isValidName: require('../../../images/succes.png')
                          })
                        }
                        
                      }}
                    />
                    <Image style={{width:30,height:30,marginRight:10}} source={this.state.isValidName}/>
                  </Item>
                  <Item inlineLabel last style={styles.form__item}>
                    <Label style={styles.text}>Apellidos<Text style={{color:'red',paddingBottom:10}}>*</Text>:</Label>
                    <Input
                      ref="last_name"
                      style={styles.form__item__input}
                      onChangeText={(last_name)=> this.setState({last_name})}
                      onFocus={() => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 0 : 80 })}
                      onBlur={()=>{
                        if (last_name != '') {
                          this.setState({
                            isValidLastName: require('../../../images/succes.png')
                          })
                        } else {
                          this.setState({
                            isValidLastName: require('../../../images/Failure.png')
                          })
                        }
                      }}
                    />
                    <Image style={{width:30,height:30,marginRight:10}} source={this.state.isValidLastName}/>
                  </Item>
                  <Item inlineLabel last style={styles.form__item}>
                    <Label style={styles.text}>Email<Text style={{color:'red',paddingBottom:10}}>*</Text>:</Label>
                    <Input
                      autoCapitalize={'none'}
                      keyboardType='email-address'
                      ref='email'
                      style={styles.form__item__input}
                      onChangeText={(email)=> this.setState({email})}
                      value={this.state.email}
                      onFocus={() => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 80 : 80 })}
                      onBlur={()=>{
                        if (reGex.test(email)) {
                          this.setState({
                            isValidEmail: require('../../../images/succes.png')
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
                    <Image style={{width:30,height:30,marginRight:10}} source={this.state.isValidPassword}/>
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
                      onBlur={()=>{
                        if (password1 === password2 && password1.length === 8 && password2.length === 8) {
                          this.setState({
                            isValidPassword: require('../../../images/succes.png')
                          })
                        } else {
                          this.setState({
                            isValidPassword: require('../../../images/Failure.png')
                          })
                        }
                      }}
                    />
                    <Image style={{width:30,height:30,marginRight:10}} source={this.state.isValidPassword}/>
                  </Item>
                  <Item inlineLabel last style={styles.form__item}>
                    <Label style={styles.text}>F. nacimiento<Text style={{color:'red',paddingBottom:10}}>*</Text>:</Label>
                    <PickerDate func={this.setBirthDay}/>
                    <Image style={{width:30,height:30,marginRight:10}} source={this.state.isValidBDay}/>
                  </Item>
                  <Item inlineLabel last style={styles.form__item}>
                    <Label style={styles.text}>Celular<Text style={{color:'red',paddingBottom:10}}>*</Text>:</Label>
                    <Input
                      keyboardType='phone-pad'
                      maxLength={13}
                      ref="phone_number"
                      style={styles.form__item__input}
                      onChangeText={(phone)=> this.setState({phone})}
                      onFocus={()=>this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 200 : 200 })}
                      onBlur={()=>{
                        if (phone != '') {
                          this.setState({
                            isValidPhone: require('../../../images/succes.png')
                          })
                        } else {
                          this.setState({
                            isValidPhone: require('../../../images/Failure.png')
                          })
                        }
                      }}
                    />
                    <Image style={{width:30,height:30,marginRight:10}} source={this.state.isValidPhone}/>
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
                      onBlur={()=>{
                        if (zip_code != '' && zip_code.length == 5 ) {
                          this.setState({
                            isValidZipCode: require('../../../images/succes.png')
                          })
                        } else {
                          this.setState({
                            isValidZipCode:  require('../../../images/Failure.png')
                          })
                        }
                      }}
                    />
                    <Image style={{width:30,height:30,marginRight:10}} source={this.state.isValidZipCode}/>
                  </Item>
                </Form>
              </Col>
              <Row style={styles.row__botttom}>
                <Button
                  primary
                  style={styles.row__botttom__btn}
                  onPress={()=>{
                    if (avatarSource != "" && first_name != "" && last_name != "" && email != "" && password1 != "" && password2 != "" && phone != "") {
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
                      if (birth_date === '') {
                        this.setState({
                          isValidBDay: require('../../../images/Failure.png')
                        })
                      }
                      if (avatarSource === '') {
                        this.setState({
                          isValidAvatar: require('../../../images/Failure.png'),
                        })
                      }
                      if (first_name === ''){
                        this.setState({
                          isValidName: require('../../../images/Failure.png'),
                        })
                      }
                      if (last_name === '') {
                        this.setState({
                          isValidLastName: require('../../../images/Failure.png'),
                        })
                      }
                      if (password1 === '' && password2 === '') {
                        this.setState({
                          isValidPassword: require('../../../images/Failure.png')  
                        })
                      }
                      if (birth_date === ''){
                        this.setState({
                          isValidBDay: require('../../../images/Failure.png')
                        })
                      }
                      if (email === ''){
                        this.setState({
                          isValidEmail: require('../../../images/Failure.png')
                        })
                      }
                      if (phone === ''){
                        this.setState({
                          isValidPhone: require('../../../images/Failure.png')
                        })
                      }
                      if (zip_code === ''){
                        this.setState({
                          isValidZipCode: require('../../../images/Failure.png')
                        })
                      }
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
