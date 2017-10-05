import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Animated, Dimensions, TouchableOpacity,Platform, Picker } from 'react-native';
import { Icon } from 'native-base';
import { pickerContract, getRatePeriod } from '../../actions/contracts';
// import { getRatePeriod } from '../../actions/contracts';


class ExpandedView extends Component{
  constructor(props){
    super(props)
    this.state = {
      animation: new Animated.Value(30),
      minHeight: 0,
      maxHeight: 0,
      expanded : false,
    }
    this.toggle = this.toggle.bind(this)
    this._setMaxHeight = this._setMaxHeight.bind(this)
    this._setMinHeight = this._setMinHeight.bind(this)
    this.closeExpanded = this.closeExpanded.bind(this)
  }
  static propType = {
    pickerContract: React.PropTypes.func,
    getRatePeriod: React.PropTypes.func,
  }
  closeExpanded(itemValue, rate){
    
    this.props.pickerContract(itemValue)
    if (this.state.expanded) {
      let initialValue    = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight;
      finalValue      = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;
      this.setState({
        contract: itemValue,
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
      minHeight: 30
    })
  }
  _setMaxHeight(event){
    this.setState({
      maxHeight: event.nativeEvent.layout.height
    })
  }
  render(){
    this.props.getRatePeriod(this.props.rate, this.props.contracts.token);    
    return(
    <Animated.View style={[{height: this.state.animation, overflow:'hidden'}]}>
      <View onLayout={e => this._setMinHeight(e)} style={{ backgroundColor: 'gray', height: 30, justifyContent: 'center' }}>
        <TouchableOpacity style={{ width: '100%', flexDirection: 'row', justifyContent:'center'}} onPress={() => this.toggle() }>
          <Text>{ (this.state.contract ) ? this.state.contract : 'Selecciona un contrato' }</Text><Icon name="arrow-down" style={{ fontSize: 20, marginLeft: 10 }} ></Icon>
        </TouchableOpacity>
      </View>
      <View onLayout={e => this._setMaxHeight(e)} style={{ height: 100 }} >
        <Picker
          style={{ height: 50, paddingTop: 0 }}
          itemStyle={{ height: 100, fontSize: 14 }}
          selectedValue={this.state.contract}
          onValueChange={(itemValue, itemIndex) => this.closeExpanded(itemValue, this.props.rate)}>
          { this.props.contracts.contracts.map((item, i) => {
            return <Picker.Item key={i} label={item.name_contract} value={item.name_contract} />
            })
          }
        </Picker>
      </View>
    </Animated.View>
    )
  }
}

function bindAction(dispatch){
  return {
    pickerContract: data => dispatch(pickerContract(data)),
    getRatePeriod: (rate, token) => dispatch(getRatePeriod(rate, token)),
 
  }
}
const mapStateToProps = state => ({
  contract: state.list_contracts.pickerContract,

})

export default connect(mapStateToProps, bindAction)(ExpandedView);
