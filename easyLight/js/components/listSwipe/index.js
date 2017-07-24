import React from 'react';
import { StyleSheet, Text, View, PanResponder, Animated, Dimensions, TouchableOpacity} from 'react-native';

let Window = Dimensions.get('window');

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
                                              return true
        },
        onPanResponderMove            :(e,gestureState)=>{
          if (gestureState.dx < 0){
            Animated.event([null,{
              dx : this.state.pan.x>0 ? 0 : this.state.pan.x,
              dy : 0
            }])(e, gestureState);
          }

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
          style={[this.state.pan.getLayout(),{ backgroundColor:'#fff', height: 75, width: Window.width, position: 'absolute', top: 0, right: 0, alignItems: 'center',justifyContent: 'center'},this.props.style]}>
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
  navigateTo(route,i){
    this.props.navigation.navigate(route,i)
  }
  render(){
    return(
      <View>
        <View style={styles.swipeBack}>
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
            activeOpacity={0.7}
          >
            {this.props.icon}
          </TouchableOpacity>
        </View>
        <ListItemSwipe style={this.props.style} onTap={this.navigateTo} component={this.props.component}/>
      </View>
    )
  }
}
export default SwipeItem;


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
    height: 75,
    flexDirection: 'row',
    alignItems: 'center',
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
    flex: 1,
    flexDirection: 'row',
    height: 75,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
