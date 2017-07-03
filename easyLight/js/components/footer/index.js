import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon, Text, Thumbnail } from 'native-base';
import styles from "./styles";


class FooterGlobal extends Component {
  render(){
    return (
      <Footer>
          <FooterTab>
            <Button vertical>
              <Icon style={styles.footer__icon} name="home" onPress={() => this.props.navigation.navigate("Contracts")} />
              <Text style={styles.footer__text}>Inicio</Text>
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate("Contact")}>
              <Icon style={styles.footer__icon} name="calendar" />
              <Text style={styles.footer__text}>Periodos</Text>
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate("Contracts")}>
              <Thumbnail source={ require('../../../images/easylight.png') } style={styles.footer__logo} />
            </Button>
            <Button vertical active style={styles.footer__btn__resultados} onPress={() => this.props.navigation.navigate("Results")}>
              <Icon style={styles.footer__icon} active name="trending-up" />
              <Text style={styles.footer__text__resultados}>Resultados</Text>
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate("Tips")}>
              <Icon style={styles.footer__icon} name="bulb" />
              <Text style={styles.footer__text}>Tips</Text>
            </Button>
          </FooterTab>
        </Footer>
    )
  }
}


export default FooterGlobal
