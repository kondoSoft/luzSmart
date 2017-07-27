import React,{ Component } from 'react';
import { StyleSheet, Text, View, PanResponder, Animated, Dimensions, TouchableOpacity} from 'react-native';

let Window = Dimensions.get('window');


class ListItemSwipe extends React.Component {
  static propTypes = {
    tension: React.PropTypes.number,
    friction: React.PropTypes.number,
    velocity: React.PropTypes.number,
    component: React.PropTypes.element
  }
  constructor(props){
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
    }
  }
  componentWillMount(){
    var springConfig = {
      tension: (this.props.tension)? this.props.tension : 40,
      friction: (this.props.friction)? this.props.friction : 15,
      velocity: (this.props.velocity)? this.props.velocity : 12
    }
  this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder : () => {
        console.log('start',this.state.pan.x)
                                            return true
      },
      onPanResponderMove            :(e,gestureState)=>{
        // console.log('gesture state dx>',gestureState.dx);
        console.log('onMove',gestureState.dx);
        if (gestureState.dx < 0){
          Animated.event([null,{
            dx : this.state.pan.x>0 ? 0 : this.state.pan.x,
            dy : 0
          }])(e, gestureState);
        }
        // else if (gestureState.dx > 0) {
        //   Animated.event([null,{
        //     dx : this.state.pan.x<0 ? 0 : this.state.pan.x,
        //     dy : 0
        //   }])(e, gestureState);
        // }

      },
      onPanResponderRelease        : (e, gesture) => {
        var x = parseInt(JSON.stringify(this.state.pan.x))
        console.log('onRelease',x);
        if ( x == 0 ){
          console.log('onTap>',this.props.onTap)
        }
        if (gesture.dx < -75) {
          console.log('funciona funciona');
          Animated.spring(
            this.state.pan,
            {toValue:{x:-120,y:0}},
          ).start();
        }
        // else if(gesture.dx > 75) {
        //   Animated.spring(
        //     this.state.pan,
        //     {
        //       ...springConfig,
        //       toValue:{x:120,y:0}
        //     },
        //   ).start();
        // }
        else {
          Animated.spring(
            this.state.pan,
            {
              ...springConfig,
              toValue:{x:0,y:0}
            },
          ).start();
        }
      }
  });
    console.log(...this.panResponder.panHandlers);
  }
  render(){
    console.log('props for list swipe component',this.props);
    return(
        <Animated.View
         {...this.panResponder.panHandlers}
          style={[this.state.pan.getLayout(),{backgroundColor: 'lightgrey',height: 80, width: Window.width, position: 'absolute', top: 0, right: 0} ]}
          onLayout={this.props.onLayout}
          >
            {this.props.component}
        </Animated.View>
    )
  }
}
export default class SwipeAccordion extends Component{
  constructor(props){
    super(props)
    this.state = {
      animation: new Animated.Value(80),
      minHeight: 0,
      maxHeight: 0,
      expanded : false,
    }
  }
  toggle(){
    let initialValue    = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight;
       finalValue      = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;
       console.log('initialValue',initialValue);
       console.log('finalValue',finalValue);
    this.setState({
      expanded : !this.state.expanded
    });
    var Config = {
      tension: (this.props.tension)? this.props.tension : 40,
      friction: (this.props.friction)? this.props.friction : 15,
      velocity: (this.props.velocity)? this.props.velocity : 12
    }
    this.state.animation.setValue(initialValue);
    Animated.spring(
        this.state.animation,
        {
          ...Config,
          toValue: finalValue
        }
    ).start();
  }
  _setMinHeight(event){
    this.setState({
      minHeight: event.nativeEvent.layout.height
    })
  }
  _setMaxHeight(event){
    this.setState({
      maxHeight: event.nativeEvent.layout.height
    })
  }
  render(){
    return(
      <Animated.View style={[{backgroundColor:'lightgrey',height: this.state.animation}]}>
        <View style={styles.swipeBack} >
          <TouchableOpacity
            style={styles.swipeBack__left}
            onPress={()=> console.log("soy el boton derecho")}
            activeOpacity={0.9}
          >
            <Text style={{ flex: 1 , textAlign: 'center'}}>hi there</Text>
          </TouchableOpacity>
          <View style={styles.swipeBack__body}>

          </View>
          <TouchableOpacity
            style={styles.swipeBack__right}
            onPress={this.toggle.bind(this)}
            activeOpacity={0.6}
          >
            <Text style={{ textAlign: 'center', width: '50%',color: '#fff',backgroundColor: 'lightblue'}}>Click Me!</Text>
          </TouchableOpacity>
        </View>
        <ListItemSwipe component={this.props.component}  onLayout={this._setMinHeight.bind(this)}  />
        <OpacityAnimatedView toggle={this.state.expanded} func={this._setMaxHeight.bind(this)}/>
      </Animated.View>
    )
  }
}

class OpacityAnimatedView extends Component{
  constructor(props){
    super(props)

    this.state = {
      animation: new Animated.Value(0)
    }
  }

  render(){
    if (this.props.toggle === true) {
      Animated.timing(
        this.state.animation,
        {
          toValue: 1,
          duration: 2000,
        }
      ).start();
    }else {
      Animated.timing(
        this.state.animation,
        {
          toValue: 0,
          duration: 1,
        }
      ).start();
    }
    return(
      <Animated.View onLayout={this.props.func} style={{opacity: this.state.animation}}>
        <View style={{flexDirection: 'row',alignItems: 'center', height: 70}}>
          <Text style={{flex: 2,textAlign: 'center', }}>Período de Consumo</Text>
          <Text style={{flex: 1,padding: 15, textAlign: 'center'}}>29 FEB 17 al 29 ABR 17</Text>
        </View>
        <View style={{flexDirection: 'row',alignItems: 'center', height: 70}}>
          <Text style={{flex: 2, textAlign: 'center', }}>Período de Consumo</Text>
          <Text style={{flex: 1,padding: 15, textAlign: 'center'}}>5,000</Text>
        </View>
        <View style={{flexDirection: 'row',alignItems: 'center', height: 70}}>
          <Text style={{flex: 2, textAlign: 'center', }}>Última Lectura Diaria</Text>
          <Text style={{flex: 1,padding: 15, textAlign: 'center'}}>5,200</Text>
        </View>
        <View style={{flexDirection: 'row',alignItems: 'center', height: 70}}>
          <Text style={{flex: 2, textAlign: 'center', }}>Consumo kWh</Text>
          <Text style={{flex: 1,padding: 15, textAlign: 'center'}}>200</Text>
        </View>
      </Animated.View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  header: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    flex: 9,
  },
  footer: {
    flex: 1
  },
  draggableContainer: {
    flex: 1,
  },
  swipeBack:{
    height: 80,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  swipeBack__left:{
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  swipeBack__body:{
    flex: 1
  },
  swipeBack__right:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
