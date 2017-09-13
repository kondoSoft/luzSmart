import React from "react";
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
export default class DrawBar extends React.Component {
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
    return (
      <Container>
        <Content>
          <Image
          source={require('../../../images/header.png')}
          style={[{ zIndex: (this.props.zIndex)? 1000 : 0 , width: Screen.width},styles.header]}
          >
            <View style={{marginBottom: 0,height: 65,width: '100%',justifyContent:'center'}}>
              {/* <Thumbnail source={ (this.state.file != null)? this.state.file : this.state.avatarSource}/> */}
              <Thumbnail source={ (this.state.file != null)? this.state.file : this.state.avatarSource}/>
            </View>
          </Image>
          {/* <Image
            source={{
              uri: "https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/drawer-cover.png"
            }}
            style={{
              height: 120,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              style={{
                height: 120,
                alignSelf: "stretch",
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => this.props.navigation.navigate("DrawerClose")}
            >
              <Image
                square
                style={{ height: 80, width: 70 }}
                source={{
                  uri: "https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/logo.png"
                }}
              />
            </TouchableOpacity>
          </Image> */}
          <List
            dataArray={routes}
            renderRow={data => {
              console.log(data);
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}
                >
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}
