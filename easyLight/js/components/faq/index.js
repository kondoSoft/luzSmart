import React, { Component } from 'react'
import {
  Text,
  Platform,
  ScrollView,
  View,
  Animated,
  TouchableOpacity
} from 'react-native'
import {
  Container,
  Icon
} from 'native-base'
import styles from './styles'

export default class Faq extends Component {
  constructor (props) {
    super(props)
    this.state = {
      faqs: [
        {
          question: 'Qué es EasyLigth?',
          answer: 'Para mas información visitá nuestra página o contactacnos al contactos@easyligth.com.mx'
        },
        {
          question: 'Por qué usar EasyLigth?',
          answer: 'Para mas información visitá nuestra página o contactacnos al contactos@easyligth.com.mx'
        },
        {
          question: 'Qué información necesito para usar EasyLigth?',
          answer: 'Para mas información visitá nuestra página o contactacnos al contactos@easyligth.com.mx'
        },
        {
          question: 'Como agregar un contrato?',
          answer: 'Para mas información visitá nuestra página o contactacnos al contactos@easyligth.com.mx'
        },
        {
          question: 'Qué es una medición?',
          answer: 'Para mas información visitá nuestra página o contactacnos al contactos@easyligth.com.mx'
        },
        {
          question: 'Qué beneficios tiene la subscripción PREMIUM?',
          answer: 'Para mas información visitá nuestra página o contactacnos al contactos@easyligth.com.mx'
        }
      ]
    }
  }
  render () {
    const { navigation } = this.props
    return (
      <Container style={{backgroundColor: '#fff'}}>
        <View style={{backgroundColor: 'lightgrey', flex: 0.3, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 15, fontWeight: '600'}}>Selecciona una pregunta especifica de la lista.</Text>
        </View>
        <ScrollView scrollEnabled contentContainerStyle={{backgroundColor: '#fff'}}>
          {
            this.state.faqs.map((faq, i) => {
              return (
                <AccordionView
                  key={i}
                  frontData={faq.question}
                  accordionData={faq.answer}
                />
              )
            })
          }
        </ScrollView>
      </Container>
    )
  }
}

class AccordionView extends Component {
  constructor (props) {
    super(props)

    this.state = {
      animation: new Animated.Value(50),
      minHeight: 0,
      maxHeight: 0,
      expanded: false,
      icon: 'ion-arrow-down-b'
    }
  }
  toggle () {
    let initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight
    finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight

    this.setState({
      expanded: !this.state.expanded
    })

    var Config = {
      tension: (this.props.tension) ? this.props.tension : 40,
      friction: (this.props.friction) ? this.props.friction : 15,
      velocity: (this.props.velocity) ? this.props.velocity : 40
    }
    this.state.animation.setValue(initialValue)
    Animated.spring(
        this.state.animation,
      {
        ...Config,
        toValue: finalValue
      }
      ).start()
  }
  _setMinHeight (event) {
    this.setState({
      minHeight: event.nativeEvent.layout.height
    })
  }
  _setMaxHeight (event) {
    this.setState({
      maxHeight: event.nativeEvent.layout.height
    })
  }
  render () {
    return (
      <TouchableOpacity activeOpacity={1} onPress={this.toggle.bind(this)}>
        <Animated.View style={[{height: this.state.animation, overflow: 'hidden'}, this.props.style]}>
          <View onLayout={this._setMinHeight.bind(this)} style={styles.frontView}>
            <Text style={styles.frontView__Text}>{this.props.frontData}</Text>
            <Icon name={(this.state.expanded) ? 'arrow-up' : 'arrow-down'} />
          </View>
          <View style={styles.backView} onLayout={this._setMaxHeight.bind(this)}>
            <Text style={styles.backView__Text}>{this.props.accordionData}</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    )
  }
}
