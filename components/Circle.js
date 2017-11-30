import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native'


export default class Circle extends Component{
    render(){
        const {xTranslate, yTranslate, color} = this.props
        return(
            <View style={[styles.container, {
                transform: [
                  {translateX: xTranslate ? xTranslate : 10},
                  {translateY: yTranslate ? yTranslate : 5},
                ],
                backgroundColor: color ? color : '#000'
              }]}>
                <View style={styles.outerCircle}>
                </View>
            </View>
        )   
    }
}

const styles = StyleSheet.create({
    container: {
        position:'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
        backgroundColor: '#000',
        borderRadius: 40,
    },
    outerCircle: {
        backgroundColor: '#F5FCFF',
        width: 70,
        height: 70,
        borderRadius: 35,
        
        
    }
})