import React, { Component } from 'react';
import {
  Container,
  Content,
  Text,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Fab,
  Icon
} from 'native-base';
import {
  Modal,
  View,
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Header from '../header/index';
import Footer from '../footer/index';
import styles from './styles';

class History extends Component{
  constructor(props){
    super(props)

    this.state = {
      modal: <ModalForm/>,
    }
  }
  setModalVisible(){
    this.setState({
      modal: <ModalForm/>
    })
    console.log("hello world");
  }
  static navigationOptions = {
    header: null
  };
  render(){
    return(
      <Container>
        <Header navigation={this.props.navigation} title="HISTORIAL" />
        <Content>
          {this.state.modal}
          <Grid>
            <Col>
              <List>
                <ListItem last style={styles.listItem__gray}>
                  <Left style={styles.listItem__left}>
                    <Text>Marzo 17</Text>
                  </Left>
                  <Body style={styles.listItem__body}>
                    <Text>45000 kWh</Text>
                  </Body>
                  <Right style={styles.listItem__right}>
                    <Text>$2,150</Text>
                  </Right>
                </ListItem>
                <ListItem last style={styles.listItem__white}>
                  <Left style={styles.listItem__left}>
                    <Text>Abril 17</Text>
                  </Left>
                  <Body style={styles.listItem__body}>
                    <Text>46000 kWh</Text>
                  </Body>
                  <Right style={styles.listItem__right}>
                    <Text>$3,100</Text>
                  </Right>
                </ListItem>
                <ListItem last style={styles.listItem__gray}>
                  <Left style={styles.listItem__left}>
                    <Text>Mayo 17</Text>
                  </Left>
                  <Body style={styles.listItem__body}>
                    <Text>30000 kWh</Text>
                  </Body>
                  <Right style={styles.listItem__right}>
                    <Text>$1,150</Text>
                  </Right>
                </ListItem>
              </List>
            </Col>
          </Grid>
        </Content>
        <View style={{ flex: 1}}>
          <Fab
            active={true}
            direction="up"
            style={{ backgroundColor: 'steelblue'}}
            position="bottomRight"
            // onPress={() => this.props.navigation.navigate("Receipt")}
            onPress={()=> this.setModalVisible.bind(this)}
            >
            <Icon active name="add" style={{fontSize: 35, lineHeight: 0}}/>
          </Fab>
        </View>
        <Footer navigation={this.props.navigation} />
      </Container>
    )
  }
}

class ModalForm extends Component {
  render(){
    return(
      <View>
        <Modal>
          <Text>Hello world</Text>
        </Modal>
      </View>
    )
  }
}


export default History;
