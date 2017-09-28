import React, { Component } from 'react';
import  { Text, Container, Content, Icon, Thumbnail, Button, Form, Item, Label, Input } from 'native-base';
import { Platform, ScrollView, Dimensions, Keyboard, View, KeyboardAvoidingView, TouchableOpacity , Alert} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Header from '../header/index';
import styles from './styles';
import {getUser, updateUser, changePassword} from '../../actions/user'
import {connect} from 'react-redux'
import ImagePicker from 'react-native-image-picker';


const Screen = Dimensions.get('window');

class EditProfile extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props){
    super(props)
    this.state = {
      user: {},
      profile: {},
      avatarSource: require('../../../images/persona.png'),
      file: null,
      password:{
        oldPassword:'',
        newPassword1:'',
        newPassword2:''
      },
      changePassword:false,
      messageError: '',
    }

    this.onChangeInputs = this.onChangeInputs.bind(this)
    this._keyboardDidHide = this._keyboardDidHide.bind(this)
    this.sendData = this.sendData.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
  }
  componentWillMount () {
    this.props.getUser(this.props.screenProps.token)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }
  componentWillUnmount () {
    this.keyboardDidHideListener.remove();
  }
  _keyboardDidHide () {
    this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 0 : 0})
  }
  componentWillReceiveProps(nextProps){
    const {
      user, profile
    } = nextProps
    this.setState({user, profile})
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
  onChangeInputs(e, id){
    var value = e.nativeEvent.text
    var user = this.state.user
    if (id === 'name') {
      user['first_name'] = value
      this.setState({user})
    }else if (id === 'lastname') {
      user['last_name'] = value
      this.setState({user})
    }else {
      user['email'] = value
      this.setState({user})
    }
  }
  onChangePassword(e, id){
    var password = this.state.password
    if (id === 'old_password') {
      password['oldPassword'] = e.nativeEvent.text
      this.setState({password})
    }else if (id === 'new_password1') {
      password['newPassword1'] = e.nativeEvent.text
      this.setState({password})
    }else {
      password['newPassword2'] = e.nativeEvent.text
      this.setState({password})
    }

    if (password.oldPassword.length > 0 ||
        password.newPassword1.length > 0 ||
        password.newPassword2.length > 0
    ) {
        this.setState({changePassword: true})
    }else {
        this.setState({changePassword: false})
    }
  }
  sendData(){
    const {
      changePassword,
      user,
      password,
      messageError,
    } = this.state
    if (this.fromValidation(this.state) && changePassword && this.passwordValidation(this.state)) {
      this.props.updateUser(this.state, this.props.screenProps.token)
      this.props.changePassword(password, this.props.screenProps.token)
      this.props.navigation.goBack()
    }else if (this.fromValidation(this.state) && (changePassword || this.passwordValidation(this.state))) {
      if (messageError) {
        Alert.alert(
          'Datos incompletos',
          'Los campos de contraseño no coinciden',
          [
            {text: 'Aceptar'},
          ],
        )
      }else {
        Alert.alert(
          'Datos incompletos',
          'Para cambiar la contraseña, por favor rellene todos los campos',
          [
            {text: 'Aceptar'},
          ],
        )
      }
    }else if(this.fromValidation(this.state)){
      this.props.updateUser(this.state, this.props.screenProps.token)
      this.props.navigation.navigate('Resultados')
    }else {
      Alert.alert(
        'Datos incompletos',
        'Por favor ingresar todos los datos de usuario',
        [
          {text: 'Aceptar'},
        ],
      )
    }
  }
  fromValidation(data){
    const {
      first_name,
      last_name,
      email
    } = data.user

    if (
      (first_name && first_name.length > 2) &&
      last_name &&
      (email && email.includes('@'))
    ) {
      return true
    }else {
      return false
    }
  }
  passwordValidation(data){
    const {
      oldPassword,
      newPassword1,
      newPassword2
    } = data.password
    if (newPassword1 !== newPassword2) {
      this.setState({messageError:true})
      return false
    }
    if (oldPassword &&
      (newPassword1 === newPassword2) &&
      newPassword1 &&
      newPassword2) {
      return true
    }else {
      this.setState({messageError:false})
      return false
    }
  }
  render(){
    const {
      password,
      user,
      changePassword
    } = this.state
    const {
      first_name,
      last_name,
      email
    } = user
    return(
        <Container style={{height:Screen.height}}>
          <Header zIndex navigation={this.props.navigation} title="Editar Perfil"/>
          <ScrollView
            contentContainerStyle={{flex:1}}
            style={{backgroundColor: '#fff'}}
            ref='scroll'
            >
            <Grid style={{flex: 1}}>
              <Row size={10} style={styles.row__top}>
                <Col style={styles.row__top__col__left}>
                  <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                    <View style={{marginBottom: 0,height: 80,width: '100%',justifyContent:'center'}}>
                     <Thumbnail style={{height: 80, width: 80, borderRadius: 40}} source={ (this.state.file != null)? this.state.file : (this.state.profile.avatar != null) ? {uri: this.state.profile.avatar} : this.state.avatarSource} />
                    </View>
                  </TouchableOpacity>
                </Col>

              </Row>
              <Col size={50}>
                <Form>
                  <Item inlineLabel last style={styles.form__item}>
                    <Label style={styles.text}>Nombres:</Label>
                    <Input
                      style={styles.form__item__input}
                      onFocus={() => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 0 : 80 })}
                      value={first_name}
                      onChange={event => this.onChangeInputs(event, 'name')}
                    />
                  </Item>
                  <Item inlineLabel last style={styles.form__item}>
                    <Label style={styles.text}>Apellidos:</Label>
                    <Input
                      style={styles.form__item__input}
                      onFocus={() => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 0 : 80 })}
                      value={last_name}
                      onChange={event => this.onChangeInputs(event, 'lastname')}
                    />
                  </Item>
                  <Item inlineLabel last style={styles.form__item}>
                    <Label style={styles.text}>Email:</Label>
                    <Input
                      style={styles.form__item__input}
                      onFocus={() => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 80 : 80 })}
                      value={email}
                      onChange={this.onChangeInputs}
                    />
                  </Item>
                  <Item inlineLabel last style={styles.form__item}>
                    <Label style={styles.text}>Contraseña Actual:</Label>
                    <Input
                      style={styles.form__item__input}
                      onFocus={() => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 90 : 90 })}
                      value={password.oldPassword}
                      onChange={e => this.onChangePassword(e ,'old_password')}
                      secureTextEntry={true}
                      autoCapitalize={'none'}
                    />
                  </Item>
                  <Item inlineLabel last style={styles.form__item}>
                    <Label style={styles.text}>Nueva Contraseña:</Label>
                    <Input
                      style={styles.form__item__input}
                      onFocus={() => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 100 : 100 })}
                      value={password.newPassword1}
                      onChange={e => this.onChangePassword(e ,'new_password1')}
                      secureTextEntry={true}
                      autoCapitalize={'none'}
                    />
                  </Item>
                  <Item inlineLabel last style={styles.form__item}>
                    <Label style={styles.text}>Confirmar Contraseña:</Label>
                    <Input
                      style={styles.form__item__input}
                      onFocus={() => this.refs['scroll'].scrollTo({y: (Platform.OS === 'ios')? 160 : 160 })}
                      value={password.newPassword2}
                      onChange={this.onChangePassword}
                      secureTextEntry={true}
                      autoCapitalize={'none'}
                    />
                  </Item>
                </Form>
              </Col>
              <Row size={10} style={styles.row__botttom}>
                <Button
                  primary
                  style={styles.row__botttom__btn__Cancel}
                  onPress={()=>this.props.navigation.goBack()}
                  >
                  <Text>Cancelar</Text>
                </Button>
                <Button
                  primary
                  style={styles.row__botttom__btn__Success}
                  onPress={this.sendData}
                  >
                  <Text>Guardar</Text>
                </Button>
              </Row>
            </Grid>
          </ScrollView>
        </Container>
    )
  }
}

function bindAction(dispatch){
  return{
    getUser: token => dispatch(getUser(token)),
    updateUser: (user, token) => dispatch(updateUser(user, token)),
    changePassword: (data, token) => dispatch(changePassword(data, token))
  }
}

function mapStateToProps(state) {
  return({
    user:state.user.user,
    profile: state.user.profileUser,
  })
}

export default connect(mapStateToProps, bindAction) (EditProfile);

// export default EditProfile
