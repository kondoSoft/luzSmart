import React, { Component } from 'react';
import {
  Container,
  Content,
  Left,
  List,
  ListItem,
  Right,
  Icon,
  Title,
  Thumbnail,
  Text,
  Body,
  View,
  Fab,
} from 'native-base';
import Swipeout from 'react-native-swipeout';
import { Col, Row, Grid } from "react-native-easy-grid";
import Header from '../header/index';
import Footer from '../footer/index';
import styles from './styles';


var swipeoutBtns = [
  {
    component: <Icon style={styles.icon} name="information-circle"/>,
    // component: <Icon style={styles.icon} name="information-circle"/>,
    backgroundColor: 'transparent',
    onPress: function(){

    },
  },
]

class DetailContract extends Component {
  static navigationOptions = {
    header: null
  };
  render(){
    return(
      <Container>
        <Header navigation={this.props.navigation}/>
        <Content>
          <Grid>
            <Row style={styles.detailContract__row__top}>
              <Text style={styles.detailContract__row__top__text}>Mi Oficina</Text>
            </Row>
            <Col>
              <List style={styles.list}>
                <ListItem avatar onPress={() => this.props.navigation.navigate("Measurements")} style={styles.listItem}>
                  <Body style={styles.listItem__body}>
                    <Text style={styles.listItem__body__text}>Marzo 17</Text>
                    <Swipeout
                      backgroundColor={ 'transparent' }
                      style={{ flex: .5 }}
                      buttonWidth={75}
                      right={swipeoutBtns}
                      autoClose={true}>
                      <View style={styles.listItem__body__view}>
                        <Text style={styles.listItem__body__view__text}>$2,150</Text>
                        <Text style={styles.listItem__body__view__text, {fontSize: 10}}>Pagado</Text>
                      </View>
                    </Swipeout>
                  </Body>
                </ListItem>
                <ListItem avatar onPress={() => this.props.navigation.navigate("Measurements")} style={styles.listItem}>
                  <Body style={styles.listItem__body}>
                    <Text style={styles.listItem__body__text}>Abril 17</Text>
                    <Swipeout
                      backgroundColor={ 'transparent' }
                      style={{ flex: .4}}
                      buttonWidth={75}
                      right={swipeoutBtns}
                      autoClose={true}>
                      <View style={styles.listItem__body__view}>
                        <Text style={styles.listItem__body__view__text}>$1,750</Text>
                        <Text style={styles.listItem__body__view__text, {fontSize: 10}}>Proyectado</Text>
                      </View>
                    </Swipeout>
                  </Body>
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
            >
            <Icon active name="add" style={{fontSize: 35, lineHeight: 0}}/>
          </Fab>
        </View>
        <Footer/>
      </Container>
    )
  }
}

export default DetailContract;
