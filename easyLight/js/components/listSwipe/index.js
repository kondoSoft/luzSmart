import React from 'react';
import { StyleSheet, Text, View, PanResponder, Animated, Dimensions, TouchableOpacity} from 'react-native';

class ListItemSwipe extends React.Component{
  static propTypes = {
    tension: React.PropTypes.number,
    friction: React.PropTypes.number,
    velocity: React.PropTypes.number
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
          // console.log('onMove',gestureState.dx);
          console.log('events on responderMove',e);
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
            this.props.onTap('History')
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
    console.log('this props',this.props);
    return(
        <Animated.View
         {...this.panResponder.panHandlers}

          style={[this.state.pan.getLayout(),{ backgroundColor:'lightgrey', height: 65, width: 375, position: 'absolute', top: 0, right: 0} ]}>
                {this.props.component}
        </Animated.View>
    )
  }
}

class SwipeItem extends React.Component {
  constructor(props){
    super(props)
    this.navigateTo = this.navigateTo.bind(this)
  }
  navigateTo(route){
    console.log('this is Route' ,route);
    this.props.navigation.navigate(route)
  }
  render(){
    // console.log('this is navigate props' , this.props);

    return(
      <View>
        <View style={styles.swipeBack}>
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
            onPress={()=> console.log("soy el boton derecho")}
            activeOpacity={0.7}
          >
            {this.props.icon}
          </TouchableOpacity>
        </View>
        <ListItemSwipe onTap={this.navigateTo} component={this.props.component}/>
      </View>
    )
  }
}
export default SwipeItem;

let Window = Dimensions.get('window');
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
    height: 65,
    flexDirection: 'row'
  },
  swipeBack__left:{
    backgroundColor: 'lightgrey',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  swipeBack__body:{
    flex: 1,
    backgroundColor: 'transparent',
  },
  swipeBack__right:{
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
