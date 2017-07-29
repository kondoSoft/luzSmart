import React,{ Component } from 'react';
import { StyleSheet, Text, View, PanResponder, Animated, Dimensions, TouchableOpacity } from 'react-native';

let Window = Dimensions.get('window');
var contentExpandedView = {
  'first':{
    title: 'Período de Consumo',
    value: '29 FEB 17 al 29 ABR 17',
  },
  'second':{
    title: 'Período de Consumo',
    value: '5,000',
  },
  'third':{
    title: 'Última Lectura Diaria',
    value: '5,200',
  },
  'four':{
    title: 'Consumo kWh',
    value: '200',
  }
}

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

                                            return true
      },
      onPanResponderMove            :(e,gestureState)=>{
        // console.log('gesture state dx>',gestureState.dx);

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
        if ( x == 0 ){
          this.props.onTap('DetailContract')
        }
        if (gesture.dx < -75) {
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
  }
  render(){
    return(
        <Animated.View
         {...this.panResponder.panHandlers}
          style={[this.state.pan.getLayout(),{backgroundColor: '#fff',height: 80, width: Window.width, position: 'absolute', top: 0, right: 0},this.props.style]}
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
    this.navigateTo = this.navigateTo.bind(this)
  }
  toggle(){
    let initialValue    = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight;
       finalValue      = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;
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
  navigateTo(route,i){
    if (this.props.navigation.state.routeName === 'DetailContract') {

    }else {
      this.props.navigation.navigate(route,i)
    }
  }
  render(){
    return(
      <Animated.View style={[{height: this.state.animation}]}>
        <View style={styles.swipeBack} >
          <TouchableOpacity
            style={styles.swipeBack__left}
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
            {this.props.icon}
          </TouchableOpacity>
        </View>
        <ListItemSwipe style={this.props.style} component={this.props.component} onTap={this.navigateTo}  onLayout={this._setMinHeight.bind(this)}  />
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
        {Object.keys(contentExpandedView).map((current,i)=>{
          let colors = ['#fff', 'lightgrey']
          return(
            <View key={i} style={{flexDirection: 'row',alignItems: 'center', height: 70, backgroundColor: colors[i % colors.length]}}>
              <Text style={{flex: 2, textAlign: 'center', }}>{contentExpandedView[current].title}</Text>
              <Text style={{flex: 1,padding: 15, textAlign: 'center'}}>{contentExpandedView[current].value}</Text>
            </View>
          )
        })}
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
