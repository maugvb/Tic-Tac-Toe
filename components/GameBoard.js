
import React, { Component } from 'react'
import {
  TouchableWithoutFeedback,
  View
} from 'react-native'

import Circle from './Circle'
import Cross from './Cross'
import {
  CENTER_POINTS,
  AREAS,
  CONDITIONS,
  GAME_RESULT_NO,
  GAME_RESULT_USER,
  GAME_RESULT_AI,
  GAME_RESULT_TIE
} from '../constants/game'
import styles from './styles/gameBoard'
import PromptArea from './PromptArea'
const type_turn = ["user", "AI"]
export default class GameBoard extends Component {
  state= {
    AIInputs: [],
    userInputs: [],
    result: 0,
    round: 0, 
  };

  constructor() {
    super()
    this.state= {
      AIInputs: [],
      userInputs: [],
      result: GAME_RESULT_NO,
      round: 0,
      turn:0
    }
  }
  restart() {
    const { round } = this.state
    this.setState({
      userInputs: [],
      AIInputs: [],
      result: GAME_RESULT_NO,
      round: round + 1
    })
    setTimeout(() => {
      if (round % 2 === 0) {
        this.AIAction()
      }
    }, 5)
  }
  WhoStart(){
    c=Math.floor(Math.random()*2)
    if(c==1){
      this.setState({turn:"user"})
    }else if(c==0){
      this.setState({turn:"AI"})
    }else{
      this.setState({turn:"user"})
    }
  }
  boardClickHandler(e) {
    const { locationX, locationY } = e.nativeEvent
    const { userInputs, AIInputs, result } = this.state
    if (result !== -1) {
      return
    }
    const inputs = userInputs.concat(AIInputs)
    this.WhoStart()
    const area = AREAS.find(d =>
      (locationX >= d.startX && locationX <= d.endX) &&
      (locationY >= d.startY && locationY <= d.endY))

      if (area && inputs.every(d => d !== area.id) && this.state.turn=="user") {
        this.setState({ userInputs: userInputs.concat(area.id), turn:"AI" })
        setTimeout(() => {
          this.judgeWinner() 
          this.AIAction()          
        }, 500)
      }
  }

  AIAction() {
    const { userInputs, AIInputs, result } = this.state
    if (result !== -1) {
      return
    }
    while(true) {
      const inputs = userInputs.concat(AIInputs)
      const randomNumber = Math.round(Math.random() * 8.3)
      if((this.state.AIInputs.indexOf(0)!=-1 && this.state.AIInputs.indexOf(1)!=1)&& (this.state.AIInputs.indexOf(2)==-1 && this.state.userInputs.indexOf(2)==-1)){
        this.setState({AIInputs: AIInputs.concat(2)})
        this.judgeWinner()
        break
      }else if((this.state.AIInputs.indexOf(0)!=-1 && this.state.AIInputs.indexOf(2)!=-1)&& (this.state.AIInputs.indexOf(1)==-1 && this.state.userInputs.indexOf(1)==-1)){
        this.setState({AIInputs: AIInputs.concat(1)})
        this.judgeWinner()
        break
      }else if((this.state.AIInputs.indexOf(2)!=-1 && this.state.AIInputs.indexOf(1)!=-1)&& (this.state.AIInputs.indexOf(0)==-1 && this.state.userInputs.indexOf(0)==-1)){
        this.setState({AIInputs: AIInputs.concat(0)})
        this.judgeWinner()
        break
      }
      
      else if((this.state.AIInputs.indexOf(0)!=-1 && this.state.AIInputs.indexOf(4)!=1)&& (this.state.AIInputs.indexOf(8)==-1 && this.state.userInputs.indexOf(8)==-1)){
        this.setState({AIInputs: AIInputs.concat(8)})
        this.judgeWinner()
        break
      }else if((this.state.AIInputs.indexOf(0)!=-1 && this.state.AIInputs.indexOf(8)!=-1)&& (this.state.AIInputs.indexOf(4)==-1 && this.state.userInputs.indexOf(4)==-1)){
        this.setState({AIInputs: AIInputs.concat(4)})
        this.judgeWinner()
        break
      }else if((this.state.AIInputs.indexOf(8)!=-1 && this.state.AIInputs.indexOf(4)!=-1)&& (this.state.AIInputs.indexOf(0)==-1 && this.state.userInputs.indexOf(0)==-1)){
        this.setState({AIInputs: AIInputs.concat(0)})
        this.judgeWinner()
        break
      }
      
      else if((this.state.AIInputs.indexOf(2)!=-1 && this.state.AIInputs.indexOf(4)!=1)&& (this.state.AIInputs.indexOf(6)==-1 && this.state.userInputs.indexOf(6)==-1)){
        this.setState({AIInputs: AIInputs.concat(6)})
        this.judgeWinner()
        break
      }else if((this.state.AIInputs.indexOf(2)!=-1 && this.state.AIInputs.indexOf(6)!=-1)&& (this.state.AIInputs.indexOf(4)==-1 && this.state.userInputs.indexOf(4)==-1)){
        this.setState({AIInputs: AIInputs.concat(4)})
        this.judgeWinner()
        break
      }else if((this.state.AIInputs.indexOf(6)!=-1 && this.state.AIInputs.indexOf(4)!=-1)&& (this.state.AIInputs.indexOf(2)==-1 && this.state.userInputs.indexOf(2)==-1)){
        this.setState({AIInputs: AIInputs.concat(2)})
        this.judgeWinner()
        break
      }
      else if((this.state.AIInputs.indexOf(3)!=-1 && this.state.AIInputs.indexOf(4)!=1)&& (this.state.AIInputs.indexOf(5)==-1 && this.state.userInputs.indexOf(5)==-1)){
        this.setState({AIInputs: AIInputs.concat(5)})
        this.judgeWinner()
        break
      }else if((this.state.AIInputs.indexOf(3)!=-1 && this.state.AIInputs.indexOf(5)!=-1)&& (this.state.AIInputs.indexOf(4)==-1 && this.state.userInputs.indexOf(4)==-1)){
        this.setState({AIInputs: AIInputs.concat(4)})
        this.judgeWinner()
        break
      }else if((this.state.AIInputs.indexOf(5)!=-1 && this.state.AIInputs.indexOf(4)!=-1)&& (this.state.AIInputs.indexOf(3)==-1 && this.state.userInputs.indexOf(3)==-1)){
        this.setState({AIInputs: AIInputs.concat(3)})
        this.judgeWinner()
        break
      }
      
      else if((this.state.AIInputs.indexOf(6)!=-1 && this.state.AIInputs.indexOf(7)!=1)&& (this.state.AIInputs.indexOf(8)==-1 && this.state.userInputs.indexOf(8)==-1)){
        this.setState({AIInputs: AIInputs.concat(8)})
        this.judgeWinner()
        break
      }else if((this.state.AIInputs.indexOf(6)!=-1 && this.state.AIInputs.indexOf(8)!=-1)&& (this.state.AIInputs.indexOf(7)==-1 && this.state.userInputs.indexOf(7)==-1)){
        this.setState({AIInputs: AIInputs.concat(7)})
        this.judgeWinner()
        break
      }else if((this.state.AIInputs.indexOf(8)!=-1 && this.state.AIInputs.indexOf(6)!=-1)&& (this.state.AIInputs.indexOf(6)==-1 && this.state.userInputs.indexOf(6)==-1)){
        this.setState({AIInputs: AIInputs.concat(6)})
        this.judgeWinner()
        break
      }
      
      else if((this.state.AIInputs.indexOf(0)!=-1 && this.state.AIInputs.indexOf(3)!=1)&& (this.state.AIInputs.indexOf(6)==-1 && this.state.userInputs.indexOf(6)==-1)){
        this.setState({AIInputs: AIInputs.concat(6)})
        this.judgeWinner()
        break
      }else if((this.state.AIInputs.indexOf(0)!=-1 && this.state.AIInputs.indexOf(6)!=-1)&& (this.state.AIInputs.indexOf(3)==-1 && this.state.userInputs.indexOf(3)==-1)){
        this.setState({AIInputs: AIInputs.concat(3)})
        this.judgeWinner()
        break
      }else if((this.state.AIInputs.indexOf(6)!=-1 && this.state.AIInputs.indexOf(0)!=-1)&& (this.state.AIInputs.indexOf(0)==-1 && this.state.userInputs.indexOf(0)==-1)){
        this.setState({AIInputs: AIInputs.concat(0)})
        this.judgeWinner()
        break
      }
      
      else if((this.state.AIInputs.indexOf(1)!=-1 && this.state.AIInputs.indexOf(4)!=1)&& (this.state.AIInputs.indexOf(7)==-1 && this.state.userInputs.indexOf(7)==-1)){
        this.setState({AIInputs: AIInputs.concat(7)})
        this.judgeWinner()
        break
      }else if((this.state.AIInputs.indexOf(1)!=-1 && this.state.AIInputs.indexOf(7)!=-1)&& (this.state.AIInputs.indexOf(4)==-1 && this.state.userInputs.indexOf(4)==-1)){
        this.setState({AIInputs: AIInputs.concat(4)})
        this.judgeWinner()
        break
      }else if((this.state.AIInputs.indexOf(7)!=-1 && this.state.AIInputs.indexOf(4)!=-1)&& (this.state.AIInputs.indexOf(1)==-1 && this.state.userInputs.indexOf(1)==-1)){
        this.setState({AIInputs: AIInputs.concat(1)})
        this.judgeWinner()
        break
      }
      
      else if((this.state.AIInputs.indexOf(2)!=-1 && this.state.AIInputs.indexOf(5)!=1)&& (this.state.AIInputs.indexOf(8)==-1 && this.state.userInputs.indexOf(8)==-1)){
        this.setState({AIInputs: AIInputs.concat(8)})
        this.judgeWinner()
        break
      }else if((this.state.AIInputs.indexOf(2)!=-1 && this.state.AIInputs.indexOf(8)!=-1)&& (this.state.AIInputs.indexOf(5)==-1 && this.state.userInputs.indexOf(5)==-1)){
        this.setState({AIInputs: AIInputs.concat(5)})
        this.judgeWinner()
        break
      }else if((this.state.AIInputs.indexOf(8)!=-1 && this.state.AIInputs.indexOf(5)!=-1)&& (this.state.AIInputs.indexOf(2)==-1 && this.state.userInputs.indexOf(2)==-1)){
        this.setState({AIInputs: AIInputs.concat(2)})
        this.judgeWinner()
        break
      }else if((this.state.userInputs.indexOf(0)!=-1 && this.state.userInputs.indexOf(1)!=1)&& (this.state.AIInputs.indexOf(2)==-1 && this.state.userInputs.indexOf(2)==-1)){
        this.setState({AIInputs: AIInputs.concat(2)})
        this.judgeWinner()
        break
      }else if((this.state.userInputs.indexOf(0)!=-1 && this.state.userInputs.indexOf(2)!=-1)&& (this.state.AIInputs.indexOf(1)==-1 && this.state.userInputs.indexOf(1)==-1)){
        this.setState({AIInputs: AIInputs.concat(1)})
        this.judgeWinner()
        break
      }else if((this.state.userInputs.indexOf(2)!=-1 && this.state.userInputs.indexOf(1)!=-1)&& (this.state.AIInputs.indexOf(0)==-1 && this.state.userInputs.indexOf(0)==-1)){
        this.setState({AIInputs: AIInputs.concat(0)})
        this.judgeWinner()
        break
      }
      
      else if((this.state.userInputs.indexOf(0)!=-1 && this.state.userInputs.indexOf(4)!=1)&& (this.state.AIInputs.indexOf(8)==-1 && this.state.userInputs.indexOf(8)==-1)){
        this.setState({AIInputs: AIInputs.concat(8)})
        this.judgeWinner()
        break
      }else if((this.state.userInputs.indexOf(0)!=-1 && this.state.userInputs.indexOf(8)!=-1)&& (this.state.AIInputs.indexOf(4)==-1 && this.state.userInputs.indexOf(4)==-1)){
        this.setState({AIInputs: AIInputs.concat(4)})
        this.judgeWinner()
        break
      }else if((this.state.userInputs.indexOf(8)!=-1 && this.state.userInputs.indexOf(4)!=-1)&& (this.state.AIInputs.indexOf(0)==-1 && this.state.userInputs.indexOf(0)==-1)){
        this.setState({AIInputs: AIInputs.concat(0)})
        this.judgeWinner()
        break
      }
      
      else if((this.state.userInputs.indexOf(2)!=-1 && this.state.userInputs.indexOf(4)!=1)&& (this.state.AIInputs.indexOf(6)==-1 && this.state.userInputs.indexOf(6)==-1)){
        this.setState({AIInputs: AIInputs.concat(6)})
        this.judgeWinner()
        break
      }else if((this.state.userInputs.indexOf(2)!=-1 && this.state.userInputs.indexOf(6)!=-1)&& (this.state.AIInputs.indexOf(4)==-1 && this.state.userInputs.indexOf(4)==-1)){
        this.setState({AIInputs: AIInputs.concat(4)})
        this.judgeWinner()
        break
      }else if((this.state.userInputs.indexOf(6)!=-1 && this.state.userInputs.indexOf(4)!=-1)&& (this.state.AIInputs.indexOf(2)==-1 && this.state.userInputs.indexOf(2)==-1)){
        this.setState({AIInputs: AIInputs.concat(2)})
        this.judgeWinner()
        break
      }
      else if((this.state.userInputs.indexOf(3)!=-1 && this.state.userInputs.indexOf(4)!=1)&& (this.state.AIInputs.indexOf(5)==-1 && this.state.userInputs.indexOf(5)==-1)){
        this.setState({AIInputs: AIInputs.concat(5)})
        this.judgeWinner()
        break
      }else if((this.state.userInputs.indexOf(3)!=-1 && this.state.userInputs.indexOf(5)!=-1)&& (this.state.AIInputs.indexOf(4)==-1 && this.state.userInputs.indexOf(4)==-1)){
        this.setState({AIInputs: AIInputs.concat(4)})
        this.judgeWinner()
        break
      }else if((this.state.userInputs.indexOf(5)!=-1 && this.state.userInputs.indexOf(4)!=-1)&& (this.state.AIInputs.indexOf(3)==-1 && this.state.userInputs.indexOf(3)==-1)){
        this.setState({AIInputs: AIInputs.concat(3)})
        this.judgeWinner()
        break
      }
      
      else if((this.state.userInputs.indexOf(6)!=-1 && this.state.userInputs.indexOf(7)!=1)&& (this.state.AIInputs.indexOf(8)==-1 && this.state.userInputs.indexOf(8)==-1)){
        this.setState({AIInputs: AIInputs.concat(8)})
        this.judgeWinner()
        break
      }else if((this.state.userInputs.indexOf(6)!=-1 && this.state.userInputs.indexOf(8)!=-1)&& (this.state.AIInputs.indexOf(7)==-1 && this.state.userInputs.indexOf(7)==-1)){
        this.setState({AIInputs: AIInputs.concat(7)})
        this.judgeWinner()
        break
      }else if((this.state.userInputs.indexOf(8)!=-1 && this.state.userInputs.indexOf(6)!=-1)&& (this.state.AIInputs.indexOf(6)==-1 && this.state.userInputs.indexOf(6)==-1)){
        this.setState({AIInputs: AIInputs.concat(6)})
        this.judgeWinner()
        break
      }
      
      else if((this.state.userInputs.indexOf(0)!=-1 && this.state.userInputs.indexOf(3)!=1)&& (this.state.AIInputs.indexOf(6)==-1 && this.state.userInputs.indexOf(6)==-1)){
        this.setState({AIInputs: AIInputs.concat(6)})
        this.judgeWinner()
        break
      }else if((this.state.userInputs.indexOf(0)!=-1 && this.state.userInputs.indexOf(6)!=-1)&& (this.state.AIInputs.indexOf(3)==-1 && this.state.userInputs.indexOf(3)==-1)){
        this.setState({AIInputs: AIInputs.concat(3)})
        this.judgeWinner()
        break
      }else if((this.state.userInputs.indexOf(6)!=-1 && this.state.userInputs.indexOf(0)!=-1)&& (this.state.AIInputs.indexOf(0)==-1 && this.state.userInputs.indexOf(0)==-1)){
        this.setState({AIInputs: AIInputs.concat(0)})
        this.judgeWinner()
        break
      }
      
      else if((this.state.userInputs.indexOf(1)!=-1 && this.state.userInputs.indexOf(4)!=1)&& (this.state.AIInputs.indexOf(7)==-1 && this.state.userInputs.indexOf(7)==-1)){
        this.setState({AIInputs: AIInputs.concat(7)})
        this.judgeWinner()
        break
      }else if((this.state.userInputs.indexOf(1)!=-1 && this.state.userInputs.indexOf(7)!=-1)&& (this.state.AIInputs.indexOf(4)==-1 && this.state.userInputs.indexOf(4)==-1)){
        this.setState({AIInputs: AIInputs.concat(4)})
        this.judgeWinner()
        break
      }else if((this.state.userInputs.indexOf(7)!=-1 && this.state.userInputs.indexOf(4)!=-1)&& (this.state.AIInputs.indexOf(1)==-1 && this.state.userInputs.indexOf(1)==-1)){
        this.setState({AIInputs: AIInputs.concat(1)})
        this.judgeWinner()
        break
      }
      
      else if((this.state.userInputs.indexOf(2)!=-1 && this.state.userInputs.indexOf(5)!=1)&& (this.state.AIInputs.indexOf(8)==-1 && this.state.userInputs.indexOf(8)==-1)){
        this.setState({AIInputs: AIInputs.concat(8)})
        this.judgeWinner()
        break
      }else if((this.state.userInputs.indexOf(2)!=-1 && this.state.userInputs.indexOf(8)!=-1)&& (this.state.AIInputs.indexOf(5)==-1 && this.state.userInputs.indexOf(5)==-1)){
        this.setState({AIInputs: AIInputs.concat(5)})
        this.judgeWinner()
        break
      }else if((this.state.userInputs.indexOf(8)!=-1 && this.state.userInputs.indexOf(5)!=-1)&& (this.state.AIInputs.indexOf(2)==-1 && this.state.userInputs.indexOf(2)==-1)){
        this.setState({AIInputs: AIInputs.concat(2)})
        this.judgeWinner()
        break
      }
      
      
      else{
        if (inputs.every(d => d !== randomNumber)) {
          this.setState({ AIInputs: AIInputs.concat(randomNumber), turn:"user" })
          this.judgeWinner()
          console.log(this.state.AIInputs)
          
          break
       }
      }
      
      
    }
  }
  
  componentDidMount() {
    this.restart()
  }

  isWinner(inputs) {
    return CONDITIONS.some(d => d.every(item => inputs.indexOf(item) !== -1))
  }

  judgeWinner() {
    const { userInputs, AIInputs, result } = this.state
    const inputs = userInputs.concat(AIInputs)
    if (inputs.length >= 5 ) {
      let res = this.isWinner(userInputs)
      if (res && result !== GAME_RESULT_USER) {
        return this.setState({ result: GAME_RESULT_USER })
      }
      res = this.isWinner(AIInputs)
      if (res && result !== GAME_RESULT_AI) {
        return this.setState({ result: GAME_RESULT_AI })
      }
    }

    if (inputs.length === 9 &&
        result === GAME_RESULT_NO && result !== GAME_RESULT_TIE) {
      this.setState({ result: GAME_RESULT_TIE })
    }
  }

  render() {
    const { userInputs, AIInputs, result, turn } = this.state
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={e => this.boardClickHandler(e)}>
          <View style={styles.board}>
            <View
              style={styles.line}
            />
            <View
              style={[styles.line, {
                width: 3,
                height: 306,
                transform: [
                  {translateX: 200}
                ]
              }]}
            />
            <View
              style={[styles.line, {
                width: 306,
                height: 3,
                transform: [
                  {translateY: 100}
                ]
              }]}
            />
            <View
              style={[styles.line, {
                width: 306,
                height: 3,
                transform: [
                  {translateY: 200}
                ]
              }]}
            />
            {
              userInputs.map((d, i) => (
                <Circle
                  key={i}
                  xTranslate={CENTER_POINTS[d].x}
                  yTranslate={CENTER_POINTS[d].y}
                  color='deepskyblue'
                />
              ))
            }
            {
              AIInputs.map((d, i) => (
                <Cross
                  key={i}
                  xTranslate={CENTER_POINTS[d].x}
                  yTranslate={CENTER_POINTS[d].y}
                />
              ))
            }
          </View>
        </TouchableWithoutFeedback>
        <PromptArea result={result} onRestart={() => this.restart()} />
      </View>
    )
  }
}