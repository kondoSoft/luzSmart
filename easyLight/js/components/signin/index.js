import React, { Component } from 'react';
import { connect } from 'react-redux'
import  { Text, Container, Content, Icon, Thumbnail, Button, Form, Item, Label, Input } from 'native-base';
import { Platform, ScrollView, Dimensions, Keyboard, View, KeyboardAvoidingView, TouchableOpacity, Image } from 'react-native';
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
      phone: '',
      birth_date: '',
      zip_code: '',
      avatarSource : null,
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
                    { this.state.avatarSource === null ? <Text style={{textAlign: 'center'}}>Agregar Foto</Text> : <Thumbnail source={{ uri: this.state.avatarSource }} />  }
                    </View>
                  </TouchableOpacity>
                </Col>
                <Col style={styles.row__top__col__right}>
                  {/* <Button transparent style={{ backgroundColor: 'blue', textAlign: 'center'}}> */}
                    {/* <Icon name="md-create" style={ styles.row__top__col__right__icon }/> */}
                  {/* </Button> */}
                </Col>
              </Row>
              <Col>
                <Form>
                  <Item inlineLabel last style={styles.form__item}>
                    <Label style={styles.text}><Text style={{color:'red',paddingBottom:10}}>*</Text>Nombres:</Label>
                    <Input
                      ref="first_name"
                      multiline
                      style={styles.form__item__input}
                      onChangeText={(first_name)=> this.setState({first_name})}
                      onFocus={() => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 0 : 80 })}
                    />
                    {/* <Image style={{rezimode:'cover'}} source={require('../../../images/Succes.png')}/> */}
                  </Item>
                  <Item inlineLabel last style={styles.form__item}>
                    <Label style={styles.text}><Text style={{color:'red',paddingBottom:10}}>*</Text>Apellidos:</Label>
                    <Input
                      ref="last_name"
                      style={styles.form__item__input}
                      onChangeText={(last_name)=> this.setState({last_name})}
                      onFocus={() => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 0 : 80 })}
                    />
                  </Item>
                  <Item inlineLabel last style={styles.form__item}>
                    <Label style={styles.text}><Text style={{color:'red',paddingBottom:10}}>*</Text>Email:</Label>
                    <Input
                      autoCapitalize={'none'}
                      keyboardType='email-address'
                      ref='email'
                      style={styles.form__item__input}
                      onChangeText={(email)=> this.setState({email})}
                      value={(this.props.navigation.state.params != "")&& this.props.navigation.state.params }
                      onFocus={() => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 80 : 80 })}
                    />
                  </Item>
                  <Item inlineLabel last style={styles.form__item}>
                    <Label style={styles.text}><Text style={{color:'red',paddingBottom:10}}>*</Text>Contraseña:</Label>
                    <Input
                      autoCapitalize={'none'}
                      ref="password1"
                      secureTextEntry={true}
                      style={styles.form__item__input}
                      onChangeText={(password1)=> this.setState({password1})}
                      onFocus={() => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 90 : 90 })}
                    />
                  </Item>
                  <Item inlineLabel last style={styles.form__item}>
                    <Label style={styles.text}><Text style={{color:'red',paddingBottom:10}}>*</Text>Confirmar contraseña:</Label>
                    <Input
                      autoCapitalize={'none'}
                      ref="password2"
                      secureTextEntry={true}
                      style={styles.form__item__input}
                      onChangeText={(password2)=> this.setState({password2})}
                      onFocus={() => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 100 : 100 })}
                    />
                  </Item>
                  <Item inlineLabel last style={styles.form__item}>
                    <Label style={styles.text}>F. nacimiento:</Label>
                    <PickerDate func={this.setBirthDay}/>
                  </Item>
                  <Item inlineLabel last style={styles.form__item}>
                    <Label style={styles.text}>Celular:</Label>
                    <Input
                      keyboardType='phone-pad'
                      maxLength={10}
                      ref="phone_number"
                      style={styles.form__item__input}
                      onChangeText={(phone)=> this.setState({phone})}
                      onFocus={()=>this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 200 : 200 })}
                    />
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
                  </Item>
                </Form>
              </Col>
              <Row style={styles.row__botttom}>
                <Button
                  primary
                  style={styles.row__botttom__btn}
                  onPress={()=>this.sendData()}
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
