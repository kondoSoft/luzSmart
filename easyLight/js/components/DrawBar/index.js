import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppRegistry, Image, TouchableOpacity, Dimensions, Platform } from "react-native";
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon,
  View,
  Thumbnail,
  Left,
  Body,
} from "native-base";
const Screen = Dimensions.get('window');
import styles from './styles';
import {getUser} from '../../actions/user'

const routes = [{name: "Premium", icon: "ios-trophy-outline"} ,{name: "FAQ", icon: "ios-help-circle-outline"},  {name: "Contactanos", icon: "ios-mail-outline"}, {name: "Iniciar Sesion", icon:"ios-exit-outline"}];

class DrawBar extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props){
    super(props)
    this.state = {
      avatarSource : require('../../../images/persona.png'),
      file: null,
      profile: {},
    }
  }
  componentWillMount () {
    this.props.getUser(this.props.screenProps.token)
  }

  componentWillReceiveProps(nextProps){
    const {
      profile
    } = nextProps
    this.setState({profile})
    this.forceUpdate()
  }

  render() {
    const placeholderAvatar = (
      <View style={{ alignItems: 'center'}}>
        <View style={{height:75 , width: 75, borderRadius: 75 / 2 , backgroundColor: 'lightgray', justifyContent: 'center', alignItems: 'center'}}>
          <Icon style={{ fontSize: 75, backgroundColor: 'transparent', color: 'white'}} name='ios-person' />
        </View>
        <Text style={ {fontSize: 10, color: 'white', paddingTop: 5 }}>Editar</Text>
      </View>
    )
    return (
      <Container>
          <Image
          source={require('../../../images/header.png')}
          style={[{ zIndex: (this.props.zIndex)? 1000 : 0 , width: Screen.width,flex:(Platform.OS != 'ios')? 0.5 : 0},styles.header]}
          >
            <View style={styles.viewProfile}>
              <TouchableOpacity transparent onPress={()=> this.props.navigation.navigate("EditProfile")}>
                <View style={styles.viewThumbnail}>
                  {(this.state.profile.avatar !== null) ?
                    <View style={{ alignItems: 'center'}}>
                      <Thumbnail style={{height:75 , width: 75, borderRadius: 75 / 2 }} source={{uri: this.state.profile.avatar}}/>
                      <Text style={ {fontSize: 10, color: 'white', paddingTop: 5 }}>Editar</Text>
                    </View>
                    :
                    placeholderAvatar
                  }
                </View>
              </TouchableOpacity>
              <View style={styles.viewName}>
                <View style={{borderBottomWidth: 1, borderColor: 'white'}}>
                  {(this.props.user !== undefined)&& <Text style={{color: 'white'}}>{this.props.user.first_name + ' ' + this.props.user.last_name}</Text>}
                </View>
                <View >
                  <Text style={styles.textName} >{(this.state.profile.premium)? 'PREMIUM' : 'FREE'}</Text>
                </View>
              </View>
            </View>
          </Image>
          <List
            contentContainerStyle={styles.list}
            dataArray={routes}
            renderRow={ data => {
              return (
                <ListItem Icon
                  style={styles.listItem}
                  button
                  onPress={() => this.props.navigation.navigate(data.name)}
                >
                <Left style={styles.left}>
                  <Icon style={styles.icon} name={data.icon} />
                </Left>
                <Body style={styles.body}>
                  <Text style={styles.textList}>{(data.name == 'Iniciar Sesion') ? 'Cerrar Sesion' : data.name }</Text>
                </Body>
                </ListItem>
              );
            }}
          />
      </Container>
    );
  }
}
function bindAction(dispatch){
  return{
    getUser: token => dispatch(getUser(token)),
  }
}
const mapStateToProps = state => ({
  user: state.user.user,
  profile: state.user.profileUser,
})
export default connect(mapStateToProps, bindAction)(DrawBar)
