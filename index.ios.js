/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

export default class TicTacTouch extends Component {
  constructor(props){
    super(props)
    this.state={
      Pressed: false
    }
  }
  
  pressFunction(){
    this.state.Pressed?this.setState({Pressed:false}): this.setState({Pressed:true})
  }
  renderHola(){
   return (<Text style={{marginTop:60}}>Hola</Text>)
  }
  renderAdios(){
    return(<Text style={{marginTop:60}}>Adios</Text>)
  }
  render() {
    console.log(this.state.Pressed)
    return (
        <TouchableHighlight onPress={()=>this.pressFunction()}>
          {this.state.Pressed?this.renderHola():this.renderAdios()}
        </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('TicTacTouch', () => TicTacTouch);
