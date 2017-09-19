import React , { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Item,
  Input,
  Text,
  Button,
  View,
} from 'native-base';
import {
  TextInput,
  Platform,
  ScrollView,
  AlertIOS,
  Alert,
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Select, Option } from 'react-native-select-list';
import Header from '../header/index';
import Footer from '../footer/index';
import styles from './styles';
import {contactMessage} from '../../actions/user';

class Contact extends Component{
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      subjects: ['Asunto','Fallo la app?','Crash en la app?','se a borrado mi recibo?'],
      subject: '',
    };
  }
  getSubject(subject){
    this.setState({
      subject: this.state.subjects[subject]
    })
  }
  render(){
    console.log(this.props)
    return(
      <Container>
        <Header navigation={this.props.navigation} title="CONTACTO"/>
        {(Platform.OS === 'android')? <Footer navigation={this.props.navigation} viewContract={this.props.screenProps.contracts} /> : null}
        <ScrollView style={ styles.grid } contentContainerStyle={{flex:1}}>
          <Row size={20} style={styles.row__top}>
            <Text style={styles.row__top__text}>Gracias por usar Easy light, tu asistente de confianza.</Text>
            <Text style={styles.row__top__text}>Tu opinión es muy importante para nosotros</Text>
          </Row>
          <Col size={20} style={styles.col__select}>
            <Select
              style={styles.select}
              padding={10}
              listHeight={100}
              caretSize={0}
              onSelect={(selected)=>{
                this.getSubject(selected)
              }}
              >
              {
                this.state.subjects.map((subject,key)=>{
                  return (
                      <Option
                        key={key}
                        value={key}
                        optionStyle={styles.select__option}
                      >
                      {subject}
                      </Option>
                    )
                })
              }
            </Select>
          </Col>
          <Col size={60} style={styles.row__bottom}>
            {/* <Item regular last style={styles.col__bottom__item}>
              <Input />
            </Item> */}
            <TextInput
              style={styles.col__bottom__item}
              multiline = {true}
              numberOfLines = {4}
              onChangeText={message => {
                this.setState({
                  message
                })
              }}
            />
            <View style={styles.col__view__bottom}>
              <Button small primary onPress={()=>{
                if (this.state.message != '' && this.state.subject != '') {
                  this.props.contactMessage(this.state.subject,this.state.message,this.props.user)
                  if (Platform.OS === 'ios') {
                      AlertIOS.alert(
                        'GRACIAS!',
                       `Estimado ${this.props.user.first_name} hemos procesado su queja y/o sugerencia pronto resivira un mensaje de nuestra parte.`,
                       [
                         {text: 'OK', onPress: () => this.props.navigation.navigate('Contracts')},
                       ],
                      )
                  } else {
                    Alert.alert(
                      'GRACIAS!',
                     `Estimado ${this.props.user.first_name} hemos procesado su queja y/o sugerencia pronto resivira un mensaje de nuestra parte.`,
                     [
                       {text: 'OK', onPress: () => this.props.navigation.navigate('Contracts')},
                     ],
                    )
                  }
                }else {
                  if (Platform.OS === 'ios') {
                    AlertIOS.alert(
                      'Verificación de datos',
                     'El campo mensaje debe contener texto',
                     [
                       {text: 'OK'},
                     ],
                    )
                  } else {
                    Alert.alert(
                      'Verificación de datos',
                     'El campo mensaje debe contener texto',
                     [
                       {text: 'OK'},
                     ],
                    ) 
                  }
                }
              }}>
                <Text>Enviar</Text>
              </Button>
            </View>
          </Col>
        </ScrollView>
          {(Platform.OS === 'ios')? <Footer navigation={this.props.navigation} viewContract={this.props.screenProps.contracts} /> : null}
      </Container>
    )
  }
}
function bindAction(dispatch){
  return {
    contactMessage: (subject,message,user) => dispatch(contactMessage(subject,message,user)),
  }
}
const mapStateToProps = state => ({
  user: state.user.user,
})
export default connect(mapStateToProps, bindAction)(Contact)
