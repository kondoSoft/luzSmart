import React, { Component } from 'react'
import {
  Text,
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
          question: '¿Qué es EASYLIGHT?',
          answer: 'Easylight es una herramienta innovadora que promueve al ahorro de energía y disminución de los gastos de servicio de luz, mediante la administración de tus consumos de energía eléctrica, para que tomes el control de tu hogar o negocio de una manera fácil y rápida, sin necesidad de tener conocimientos especializados de electricidad.'
        },
        {
          question: '¿Qué características tiene EASYLIGHT?',
          answer: '- Administra varios contratos de energía eléctrica.\n\n- Predice tus próximos pagos de luz desde el inicio de tu periodo.\n\n- Cuenta con asistencia personalizada y de orientación:\n  * ¿Por qué estoy pagando alto costo en luz?\n  * ¿Que tengo que hacer para bajar los gastos de energía?\n  * ¿Tengo que invertir mucho dinero para bajar mis gastos de luz?\n  * ¿Cuándo llamar a mi proveedor por defectos en el medidor?\n  * ¿Será que tengo fugas de energía?\n\n- Gráfica tus acciones e incentiva tus logros en el ahorro de energía.\n\n- Cuenta siempre con nuevo tips que promueve aún más el ahorro!'
        },
        {
          question: '¿Por qué EASYLIGHT?',
          answer: 'Las estadísticas manejadas indican que: \n\n- 2 de cada 3 personas piensan que lo que paga por la luz en su hogar o negocio es alto. \n\n- 4 de cada 5 personas tienen problemas en identificar dónde están los mayores consumos de energía. \n\n- 6 de cada 7 personas no saben como les cobran la energía. \n\n- La mayoría de las personas siempre se sorprenden cuando les llega el recibo de luz. \n\nEstas son las razones del porqué existimos. EASYLIGHT te entiende y te brinda una solución eficaz para que ahorres más, pagues menos y contribuyas con el medio ambiente.'
        },
        {
          question: '¿Qué necesito para usar EASYLIGHT?',
          answer: 'No necesitas tener conocimientos en electricidad, porque nosotros nos encargamos. Solo necesitas tener la disposición de querer bajas tus gastos de luz, querer ahorrar más y querer contribuir con el medio ambiente.'
        },
        {
          question: '¿Cómo agregar un Contrato?',
          answer: 'El contrato define toda las características de un servicio de luz. En el se pueden agregar varios periodos y puedes gestionar tus consumos.\n\nDesde la vista de INICIO, debes presionar el botón “+” para que puedas agregar el contrato. Desde ese momento un formulario se despliega para que pongas la información propia de un contrato de luz. Es importante que verifiques que la información sea correcta.'
        },
        {
          question: '¿Cómo agregar un Periodo?',
          answer: 'El periodo define el rango de tu periodo de consumo actual. A medida que uses la aplicación se irán acumulando los periodos de un mismo contrato y podrás visualizar en la sección de resultados.\n\nDesde la vista de PERIODOS, debes presionar el botón “+” para que puedas agregar el contrato. Un formulario se despliega para que puedas ingresar la información específica de tu último recibo de luz facturado. Ten en cuenta que cada vez que vayas a generar un nuevo periodo actual debes tener a la mano el nuevo recibo del periodo anterior, ya que EASYLIGHT necesita esa información para cerrar el periodo anterior.'
        },
        {
          question: '¿Que es una Medición?',
          answer: 'La medición define la acción que realizas cuando capturas la lectura de tu medidor en tu hogar o negocio. Esta informacion es necesaria para que EASYLIGHT pueda predecir un estimado de cuanto puedes pagar al final del periodo y de esta manera tomes acciones preventivas en caso que no estés conforme con lo que puedes pagar y así bajar el gasto.'
        },
        {
          question: '¿Que beneficios tiene la suscripción Premium?',
          answer: 'La suscripción premium te permite tener acceso para administrar por más de 30 días tus consumos de energía, contar con un historial actualizado a medida que vayas usando la app y a la vez permite tener una asistencia personalizada por parte de un grupo de técnicos que te podrán ayudar para casos particulares de problemas en tu hogar o negocio.\n\n\nPara mas información visitá nuestra página o contactacnos al contactos@easyligth.com.mx'
          // answer: 'Para mas información visitá nuestra página o contactacnos al contactos@easyligth.com.mx'
        }
      ]
    }
  }
  render () {
    return (
      <Container style={{backgroundColor: '#fff', flex: 1}}>
        {/* <View style={{backgroundColor: 'lightgrey', flex: 1}}>
        </View> */}
        <ScrollView scrollEnabled contentContainerStyle={{backgroundColor: 'white'}}>
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
    var finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight

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
            {<Text style={styles.backView__Text}>{this.props.accordionData}</Text>}
          </View>
        </Animated.View>
      </TouchableOpacity>
    )
  }
}
