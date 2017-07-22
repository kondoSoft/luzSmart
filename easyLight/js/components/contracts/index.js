import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container, Content, Header, Body, Left, List, ListItem, Thumbnail, Text, Title, Button, Icon, Right, Image} from 'native-base';
import styles from "./styles";
import Footer from '../footer/index';
import SwipeItem from '../listSwipe/index';
import FabButton from '../fabButton/index';
import DrawBar from '../DrawBar';
import { DrawerNavigator, NavigationActions } from "react-navigation";
import { setIndex } from "../../actions/list";
import { openDrawer } from "../../actions/drawer";

class Contracts extends Component {
  // constructor(props){
  //   super(props)
  // }
  static navigationOptions = {
    header: null
  };
  render(){
    const { navigation } = this.props
    const { contracts } = this.props
    return(
      <Container>
        <Header style={styles.header}>
          <Left>
            <Title style={styles.header__left__title}>EASYLIGHT</Title>
          </Left>
          <Right>
            <Icon name="menu" active style={{ color: 'white' }} onPress={()=>this.props.navigation.navigate('DrawerOpen')} />
          </Right>
        </Header>
        <Content>
          <Grid>
            <Col>
              <List style={styles.list}>
                {Object.keys(contracts).map((contract, i )=><SwipeItem
                  key={i}
                  index={i}
                  navigation={navigation}
                  component={<ItemComponent data={contracts[contract]}/>}
                  icon={<Icon style={styles.icon} name="information-circle"/>}
                />)}

              </List>
            </Col>
          </Grid>
        </Content>
        <FabButton
          navigateTo={'AddContracts'}
          navigation={navigation}
          >
          <Text style={{ borderRadius: 50, width: 42, height: 42, textAlign: 'center', fontSize: 30, color: '#fff'}}>+</Text>
        </FabButton>
        <Footer navigation={navigation}/>
      </Container>
    )
  }
}

class ItemComponent extends Component{
  render(){
    const contract = this.props.data
    return(
      <View style={styles.ItemComponent.view}>
        <Left style={styles.ItemComponent.align}>
          <Thumbnail source={contract.image} />
        </Left>
        <Body style={styles.ItemComponent.align}>
          <Text style={styles.listItem__body__text}>{contract.name}</Text>
        </Body>
        <Right style={styles.ItemComponent.align}>
          <Text style={styles.listItem__body__view__text,{}}>{contract.cost}</Text>
        </Right>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  contracts: state.list_contracts.contracts
})
export default connect(mapStateToProps)(Contracts)
