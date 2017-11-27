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
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      subjects: ['Asunto','Problemas con la APP','Orientación para el ahorro de energía','Tarifa DAC','Validación de consumos de energía', 'Análisis de carga', 'Asesoría técnica especializada'],
      subject: '',
      validText: false,
      subjectID: 0,
    };
  }
  getSubject(subject){
    this.setState({
      subject: this.state.subjects[subject],
      subjectID: subject
    })
  }
  render(){

    return(
      <Container>
        <Grid style={styles.grid}>
          <Row size={2} style={styles.row__top}>

              <Text style={styles.row__top__text}>Gracias por usar </Text><Text style={{fontSize: 25, fontWeight: 'bold'}}>EasyLight</Text>

            <Text style={styles.row__top__text}>{'\n'} Tu opinión es muy importante para nosotros</Text>
          </Row>
          <Col size={0.8} style={styles.col__select}>
            <Select
              selectStyle={styles.select}
              padding={10}
              listHeight={300}
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
          <Col size={4} style={styles.row__bottom}>
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
              onBlur={()=>{
                if (this.state.message != '') {
                  this.setState({
                    validText: true,
                  })
                }
              }}
            />
            {

              <View style={styles.col__view__bottom}>
              <Button small primary onPress={()=>{
                if (this.state.message != '' && this.state.subjectID != 0 ) {
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
                      'Error',
                     'Por favor introduzca el asunto y el mensaje correspondiente.',
                     [
                       {text: 'Aceptar'},
                     ],
                    )
                  } else {
                    Alert.alert(
                      'Error',
                     'Por favor introduzca el asunto y el mensaje correspondiente.',
                     [
                       {text: 'Aceptar'},
                     ],
                    )
                  }
                }
              }}>
                <Text>Enviar</Text>
              </Button>
            </View>
            }
          </Col>
        </Grid>
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
