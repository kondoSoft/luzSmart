import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container, Content, Header, Body, Left, List, ListItem, Thumbnail, Text, Title, Button, Icon, Right, Image} from 'native-base';
import styles from "./styles";
import Swipeout from 'react-native-swipeout';
import Footer from '../footer/index';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import SwipeItem from '../listSwipe/index';

var swipeoutBtns = [
  {
    component: <Icon style={styles.icon,{backgroundColor: 'red', marginTop: 9, textAlign: 'center' }} name="information-circle"/>,
    backgroundColor: 'transparent'
  }
]
// const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
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
                <SwipeItem
                  navigation={this.props.navigation}
                  component={
                    <View style={{ flex: 1, flexDirection: 'row'}}>
                      <Left style={{ alignItems: 'center' }}>
                        <Thumbnail source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }} />
                      </Left>
                      <Body style={{ alignItems: 'center' }}>
                        <Text style={styles.listItem__body__text,{}}>Mi Oficina</Text>
                      </Body>
                      <Right style={{ alignItems: 'center' }}>
                        <Text style={styles.listItem__body__view__text,{}}>$300.00</Text>
                      </Right>
                    </View>
                  }
                  icon={<Icon style={styles.icon,{ marginTop: 9, textAlign: 'center', color: 'blue' }} name="information-circle"/>}
                />
                <SwipeItem
                  navigation={this.props.navigation}
                  component={
                    <View style={{ flex: 1, flexDirection: 'row'}}>
                      <Left style={{alignItems: 'center'}}>
                        <Thumbnail source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }} />
                      </Left>
                      <Body style={{alignItems: 'center'}}>
                        <Text style={styles.listItem__body__text,{}}>Mi Oficina</Text>
                      </Body>
                      <Right style={{alignItems: 'center'}}>
                        <Text style={styles.listItem__body__view__text,{}}>$300.00</Text>
                      </Right>
                    </View>
                  }
                  icon={<Icon style={styles.icon,{ marginTop: 9, textAlign: 'center', color: 'blue' }} name="information-circle"/>}
                />
              </List>
            </Col>
          </Grid>
        </Content>
        <Footer navigation={this.props.navigation}/>
      </Container>
    )
  }
}

export default Contracts
