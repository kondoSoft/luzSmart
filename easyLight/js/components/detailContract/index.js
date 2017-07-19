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
  Fab,
} from 'native-base';
import {
  View
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import { Col, Row, Grid } from "react-native-easy-grid";
import Header from '../header/index';
import Footer from '../footer/index';
import styles from './styles';
import SwipeItem from '../listSwipe/index';
import FabButton from '../fabButton/index';

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
                <SwipeItem
                  navigation={this.props.navigation}
                  component={<ItemComponent url={require('../../../images/office.png')}/>}
                  icon={<Icon style={styles.icon} name="information-circle"/>}
                />
                <SwipeItem
                  navigation={this.props.navigation}
                  component={<ItemComponent url={require('../../../images/home.png')}/>}
                  icon={<Icon style={styles.icon} name="information-circle"/>}
                />
              </List>
            </Col>
          </Grid>
        </Content>
        {/* <View style={{ flex: 1}}>
          <Fab
            active={true}
            direction="up"
            style={{ backgroundColor: 'steelblue', borderTopWidth:4,borderBottomWidth:4,borderLeftWidth:4,borderRightWidth:4, borderColor: '#fff'}}
            position="bottomRight"
            onPress={() => this.props.navigation.navigate("Receipt")}
            >
            <Icon active name="add" style={{fontSize: 35, lineHeight: 0}}/>
          </Fab>
        </View> */}
        <FabButton
          navigation={this.props.navigation}
          navigateTo={'Receipt'}
          >
          <Text style={{ borderRadius: 50, width: 42, height: 42, textAlign: 'center', fontSize: 30, color: '#fff'}}>+</Text>
        </FabButton>
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
          <Text style={styles.listItem__body__text,{}}>Marzo 17</Text>
        </Left>
        <Body style={styles.ItemComponent.align}>

        </Body>
        <Right style={styles.ItemComponent.align}>
          <Text style={styles.listItem__body__view__text,{}}>$2150</Text>
          <Text style={styles.listItem__body__view__text,{}}>Pagado</Text>
        </Right>
      </View>
    )
  }
}

export default DetailContract;
