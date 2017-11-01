import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, PanResponder, Animated, Dimensions, TouchableOpacity,Platform } from 'react-native';
import Svg from "react-native-svg";
import {
  VictoryChart,
  VictoryGroup,
  VictoryBar,
} from "victory-native";
import {Icon} from 'native-base'
import {closeSwiper, openSwiper} from '../../actions/drawer';
let Window = Dimensions.get('window');
var currentData;
import { pickerContract } from "../../actions/contracts";


class ListItemSwipe extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
    }
    this.closeSwiper = this.closeSwiper.bind(this)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.isClosed) {
      this.props.closeExpanded()
      this.closeSwiper()
    }
  }
  componentWillMount(){
    var springConfig = {
      tension: (this.props.tension)? this.props.tension : 60,
      friction: (this.props.friction)? this.props.friction : 20,
      velocity: (this.props.velocity)? this.props.velocity : 20
    }
  this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder : (e,gestureState) => {
        return true
      },
      onPanResponderMove            :(e,gestureState)=>{
        if (this.props.isClosed) {
          this.props.openSwiper()
        }
        if (gestureState.dx < 0){
          if (gestureState.dx <= -40 && this.props.navigation.state.routeName === 'Contratos') {
            Animated.event([null,{
              dx : (this.props.navigation.state.routeName === 'Contratos')? -189 : -63,
              dy : 0
            }])(e, gestureState);
          }else {
            Animated.event([null,{
              dx : this.state.pan.x > 0 ? 0 : this.state.pan.x,
              dy : 0
            }])(e, gestureState);
          }
        }
        else if (gestureState.dx > 0) {
          // if (this.props.isPremium) {
          //   if (gestureState.dx >= 120) {
          //   Animated.event([null,{
          //     dx : 140,
          //     dy : 0
          //   }])(e, gestureState);
          // }else {
          //     Animated.event([null,{
          //       dx : this.state.pan.x<0 ? 0 : this.state.pan.x,
          //       dy : 0
          //     }])(e, gestureState);
          //   }
          // }else {
          //    //do something...
          // }

        }

      },
      onPanResponderRelease        : (e, gesture) => {
        var x = parseInt(JSON.stringify(this.state.pan.x))
        if ( x == 0 ){
            this.props.onTap('DetailContract')
        }
        // if (gesture.dx < -40 && this.props.navigation.state.routeName === 'DetailContract') {
        //   Animated.spring(
        //     this.state.pan,
        //     {toValue:{x:-65,y:0}},
        //   ).start();
        // }
        if (gesture.dx < -40) {
          Animated.spring(
            this.state.pan,
            {toValue:{x:(this.props.navigation.state.routeName === 'Contratos')? -189 : -63, y:0}},
          ).start();
        }else {
          this.props.closeExpanded()
          this.closeSwiper()
          // Animated.spring(
          //   this.state.pan,
          //   {
          //     ...springConfig,
          //     toValue:{x:0,y:0}
          //   },
          // ).start();
        }
      }
  });
  }
  closeSwiper () {
    var springConfig = {
      tension: (this.props.tension)? this.props.tension : 60,
      friction: (this.props.friction)? this.props.friction : 20,
      velocity: (this.props.velocity)? this.props.velocity : 20
    }
    Animated.spring(
      this.state.pan,
      {
        ...springConfig,
        toValue:{x:0,y:0}
      },
    ).start();
  }
  render(){
    return(
        <Animated.View
         {...this.panResponder.panHandlers}
          style={[this.state.pan.getLayout(),{backgroundColor: '#fff',height: 70, width: Window.width, position: 'absolute', top: 0, right: 0},this.props.style]}
          onLayout={this.props.onLayout}
          >
          {this.props.component}
        </Animated.View>
    )
  }
}
class SwipeAccordion extends Component{
  constructor(props){
    super(props)
    this.state = {
      animation: new Animated.Value(70),
      minHeight: 0,
      maxHeight: 0,
      expanded : false,
    }
    this.navigateTo = this.navigateTo.bind(this)
  }
  closeExpanded(){
    if (this.state.expanded) {
      let initialValue    = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight;
      finalValue      = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;
      this.setState({
        expanded : false
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
  navigateTo(route){

    if (this.props.navigation.state.routeName === 'DetailContract') {
     if(this.props.keyVal === 0){
       this.props.pickerContract(this.props.dataAccordionContract.name_contract)
       this.props.navigation.navigate('Medicion',{ receipt: this.props.dataAccordion , contract: this.props.dataAccordionContract, index: this.props.index})
     }
    }
    else if( this.props.navigation.state.routeName === 'Periodos'){
      if(this.props.keyVal === 0){
      this.props.navigation.navigate('MedicionPeriodo',{ receipt: this.props.dataAccordion , contract: this.props.dataAccordionContract, index: this.props.index})
      }
    }
    else {
      this.props.navigation.navigate(route, { receipt: this.props.receipts, index: this.props.index, profile: this.props.profile, contract: this.props.dataAccordionContract})
    }
  }
  render(){
    return(
      <Animated.View style={[{height: this.state.animation, overflow:'hidden'}]}>
        <View style={styles.swipeBack} >
          {
            (this.props.navigation.state.routeName === 'Contratos')?
              <TouchableOpacity
                style={{ width: 63, backgroundColor: 'lightgrey'}}
                onPress={ () => {
                  this.props.closeSwiper()
                  this.props.onPressLeft()
                }}
                activeOpacity={0.6}
              >
                <Icon style={{flex:1, textAlign: 'center', marginTop: 15, fontSize: 35, color: '#fff'}} name='md-create' />
              </TouchableOpacity>
              : <View
                  style={{ width: 63, backgroundColor: 'green' }}
                >

                </View>
          }
          {
            (this.props.navigation.state.routeName === 'Contratos')?
             <TouchableOpacity
              style={{ width: 63, backgroundColor: 'steelblue'}}
              onPress={ () => {
                this.props.closeSwiper()
                this.props.navigation.navigate('Historial')
              }}
              activeOpacity={0.6}
            >
              <Icon style={{flex:1, textAlign: 'center', marginTop: 15, fontSize: 35, color: '#fff'}} name='ios-book-outline' />
            </TouchableOpacity>
            : <View
                style={{ width: 63, backgroundColor: 'green' }}
              >
              </View>
          }
          <TouchableOpacity
            style={{ width: 63, backgroundColor: 'green'}}
            onPress={
              this.toggle.bind(this)
            }
            activeOpacity={0.6}
          >
            <Icon style={{flex:1, textAlign: 'center', marginTop: 15, fontSize: 35, color: '#fff'}} name='ios-information-circle-outline' />
          </TouchableOpacity>
        </View>
        <ListItemSwipe navigation={this.props.navigation} openSwiper={this.props.openSwiper} isClosed={this.props.swiperClose} isPremium={this.props.isPremium} closeExpanded={this.closeExpanded.bind(this)} style={this.props.style} component={this.props.component}  onLayout={this._setMinHeight.bind(this)} onTap={this.navigateTo}/>
        <ExpandedView navigation={this.props.navigation} func={this._setMaxHeight.bind(this)} data={(this.props.navigation.state.routeName == 'Contratos') ? this.props.dataAccordionContract : this.props.dataAccordion}/>
      </Animated.View>
    )
  }
}

class ExpandedView extends Component{
  render(){
    const { data } = this.props
    currentData = data.current_reading - data.previous_reading
    var contentExpandedView = {
      'first':{
        title: 'Período de Consumo',
        value: data.payday_limit,
      },
      'second':{
        title: 'Lectura Inicial',
        value: data.previous_reading,
      },
      'third':{
        title: 'Última Lectura Diaria',
        value: data.current_reading,
      },
      'four':{
        title: 'Consumo kWh',
        value: currentData,
      }
    }

    let colors = ['#fff', 'lightgrey']
    return(
      (this.props.navigation.state.routeName === 'Contratos')?
      <View onLayout={this.props.func} style={{backgroundColor:'lightgrey'}}>
        <VictoryChart domain={{x: [0, 4]}}>
          <VictoryGroup
            labels={["a", "b", "c"]}
            offset={10}
            colorScale={"qualitative"}
          >
            <VictoryBar
              data={[
                {x: 1, y: 1},
                {x: 2, y: 2},
                {x: 3, y: 5}
              ]}
            />
            <VictoryBar
              data={[
                {x: 1, y: 2},
                {x: 2, y: 1},
                {x: 3, y: 7}
              ]}
            />
            <VictoryBar
              data={[
                {x: 1, y: 3},
                {x: 2, y: 4},
                {x: 3, y: 9}
              ]}
            />
          </VictoryGroup>
        </VictoryChart>
      </View> :
      <View onLayout={this.props.func}>
        {Object.keys(contentExpandedView).map((current,i)=>{
          let colors = ['#fff', 'lightgrey']
          return(
            <View key={i} style={{flexDirection: 'row',alignItems: 'center', height: 50, backgroundColor: colors[i % colors.length]}}>
              <Text style={{flex: 2, textAlign: 'center',color:'black'}}>{contentExpandedView[current].title}</Text>
              <Text style={{flex: .7,padding: (i === 0)? 0 : 15,paddingRight: (i === 0)? 15 : 0, textAlign: 'center',color: 'black'}}>{contentExpandedView[current].value}</Text>
            </View>
          )
        })}
      </View>
    )
  }
}
function bindAction(dispatch){
  return {
    closeSwiper: () => dispatch(closeSwiper()),
    openSwiper: () => dispatch(openSwiper()),
    pickerContract: value => dispatch(pickerContract(value)),
  }
}
const mapStateToProps = state => ({
  swiperClose: state.drawer.closeSwiper,
})

export default connect(mapStateToProps, bindAction)(SwipeAccordion);
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
    justifyContent: 'flex-end',
    height: 70,
    flexDirection: 'row',
  },
  swipeBack__left:{
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'lightgrey',
  },
  swipeBack__body:{
    flex: 1
  },
  swipeBack__right:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'lightgrey',
  },
});
