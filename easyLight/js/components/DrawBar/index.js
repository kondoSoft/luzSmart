import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppRegistry, Image, TouchableOpacity, Dimensions } from "react-native";
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
} from "native-base";
const Screen = Dimensions.get('window');
import styles from './styles';

const routes = ["Contratos", "Resultados", "Tips", "Login"];

class DrawBar extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props){
    super(props)
    this.state = {
      avatarSource : require('../../../images/persona.png'),
      file: null,
    }
  }
  render() {
    console.log(this.props.user);
    console.log(this.props.profile);

    return (
      <Container>
          <Image
          source={require('../../../images/header.png')}
          style={[{ zIndex: (this.props.zIndex)? 1000 : 0 , width: Screen.width},styles.header]}
          >
            <View style={styles.viewProfile}>
              <View style={styles.viewThumbnail}>
                <Thumbnail style={styles.avatar} source={(this.props.profile !== undefined)? {uri: this.props.profile.avatar} : this.state.file }/>
              </View>
              <View style={styles.viewName}>
                <View style={{borderBottomWidth: 1, borderColor: 'white'}}>
                  {(this.props.user !== undefined)&& <Text style={{color: 'white'}}>{this.props.user.first_name + ' ' + this.props.user.last_name}</Text>}
                </View>
                <Text style={styles.textName} >PREMIUM</Text>
              </View>
            </View>
          </Image>
          <List
            contentContainerStyle={styles.list}
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  style={styles.listItem}
                  button
                  onPress={() => this.props.navigation.navigate(data)}
                >
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          />
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user.user,
  profile: state.user.profileUser,
})
export default connect(mapStateToProps, null)(DrawBar)
