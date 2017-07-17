import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container, Content, Header, Body, Left, List, ListItem, Thumbnail, Text, Title, Button, Icon, Right, Image} from 'native-base';
import styles from "./styles";
import Footer from '../footer/index';
import SwipeItem from '../listSwipe/index';

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
                  component={<ItemComponent url={require('../../../images/office.png')}/>}
                  icon={<Icon style={styles.icon} name="information-circle"/>}
                />
                <SwipeItem
                  navigateTo={'History'}
                  navigation={this.props.navigation}
                  component={<ItemComponent url={require('../../../images/home.png')}/>}
                  icon={<Icon style={styles.icon} name="information-circle"/>}
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

class ItemComponent extends Component{
  render(){
    return(
      <View style={styles.ItemComponent.view}>
        <Left style={styles.ItemComponent.align}>
          <Thumbnail source={this.props.url} />
        </Left>
        <Body style={styles.ItemComponent.align}>
          <Text style={styles.listItem__body__text}>Mi Oficina</Text>
        </Body>
        <Right style={styles.ItemComponent.align}>
          <Text style={styles.listItem__body__view__text,{}}>$300.00</Text>
        </Right>
      </View>
    )
  }
}

export default Contracts
