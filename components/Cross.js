import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native'


export default class Cross extends Component{
    render(){
        const {xTranslate, yTranslate,color} = this.props
        return(
            <View style={[styles.container, {
                transform: [
                  {translateX: (xTranslate ? xTranslate : 10) +34},
                  {translateY: (yTranslate ? yTranslate : 5) -12},
                ]
              }]}>
                <View style={[styles.line1, {
                    transform: [
                        {rotate: '45deg'},
                      ] , 
                      backgroundColor: color ? color : '#000'
                      
                }]}>
                </View>
                <View style={[styles.line1, {
                    transform: [
                        {rotate: '135deg'},
                      ] ,
                      backgroundColor: color ? color : '#000'                      
                }]}>
                </View>
            </View>
        )   
    }
}

const styles = StyleSheet.create({
    container: {
        position:'absolute',
        width: 80,
        height: 80,

    },
    line1: {
        position:'absolute',
        backgroundColor: 'black',
        width: 8,
        height: 113,

        
        
    }
})