import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container, Content, Fab ,Header, Body, Left, List, ListItem, Thumbnail, Text, Title, Button, Icon, Right, Image} from 'native-base';
import Footer from '../footer/index'
import styles from "./styles";
import Swipeout from 'react-native-swipeout';

var swipeoutBtns = [
  {
    component: <Icon style={styles.icon} name="information-circle"/>,
    // component: <Icon style={styles.icon} name="information-circle"/>,
    backgroundColor: 'transparent',
    onPress: function(){ alert('button pressed') },
  },

]

class Contracts extends Component {

  static navigationOptions = {
    header: null
  };
  render(){
    return(
      <Container>
        <Header style={styles.header}>
          <Left>
            <Title style={styles.header__left__title}>EASYLIGHT</Title>
          </Left>
          <Right>
            <Icon name="menu" active style={{ color: 'white' }} />
          </Right>
        </Header>
        <Content>
          <Grid>
            <Col>
              <List style={styles.list}>
                <ListItem avatar onPress={() => this.props.navigation.navigate("DetailContract")} style={styles.listItem}>
                  <Left>
                    <Thumbnail source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }} />
                  </Left>
                  <Body style={styles.listItem__body}>
                    <Text style={styles.listItem__body__text}>Mi Oficina</Text>
                    <Swipeout
                      backgroundColor={ 'transparent' }
                      style={{ flex: .5}}
                      buttonWidth={75}
                      right={swipeoutBtns}
                      autoClose={true}>
                      <View style={styles.listItem__body__view}>
                        <Text style={styles.listItem__body__view__text}>$300.00</Text>
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
        <Footer navigation={this.props.navigation}/>
      </Container>
    )
  }
}

export default Contracts
