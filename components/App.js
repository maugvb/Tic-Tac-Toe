import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Header from './Header'
import GameBoard from './GameBoard'


export default class TicTacTouch extends Component {
constructor(props){
    super(props)
    this.state={
        gameStart: false,
    }
}
    startGame(){
        this.setState({gameStart:true})
    }

    render(){
        const {gameStart} = this.state
        return(
            <View style={styles.container}>
                <Header/>
                {gameStart?(<GameBoard/>):
                (
                <View style={styles.container}>
                    <Text style={styles.welcome}>Welcome to the game!</Text>
                    <TouchableOpacity onPress={()=>this.startGame()}>
                        <Text style={styles.instructions}>click here to start</Text>
                    </TouchableOpacity>            
                </View>
                    )}
            </View>
        )

        }
    
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    welcome:{
        fontSize: 20,
        margin :50
    },
    instructions: {
        marginTop: 20,
        color: 'grey',
        marginBottom: 5
    }
})