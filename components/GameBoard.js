
import React, { Component } from 'react'
import { Text } from "react-native";

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


  constructor(props) {
    super(props)
    this.state = {
      AIInputs: [],
      userInputs: [],
      result: GAME_RESULT_NO,
      game:[1,2,3,
            4,5,6,
            7,8,9],
      round: 0,
      turn: '',
    }
    

  }


  /**
   * Restart Funtion
   */
  restart() {
    const { round } = this.state
    this.setState({
      userInputs: [],
      AIInputs: [],
      result: GAME_RESULT_NO,
      game:[1,2,3,
            4,5,6,
            7,8,9],
      round: round + 1,
      turn: 'user'
    })

    //this.WhoStart();
    //^Por esto empezaba la maquina siempre
    /*setTimeout(() => {
      if (round % 2 === 0) {
        this.AIAction()
      }
    }, 5)*/
  }


  /**
   * WhoStartFunction
   */
  WhoStart(){
    var c=Math.floor(Math.random()*2)
    if(c==1){
      this.setState({turn:'user'});
    }else if(c==0){
      this.setState({turn:'AI'});
    }else{
      this.setState({turn:'user'});
    }
  }




  /**
   * boardClickHandler para tap en la pantalla, zona tocable
   * @param {*} e 
   */
  boardClickHandler(e) {
    //console.log("touhing");
    //console.log(this.state.turn);
    const { locationX, locationY } = e.nativeEvent
    const { userInputs, AIInputs, result, game } = this.state
    if (result !== -1) {
      return
    }
    const inputs = userInputs.concat(AIInputs)
    //this.setState({turn: "user"});
    //this.WhoStart()
    const area = AREAS.find(d =>
      (locationX >= d.startX && locationX <= d.endX) &&
      (locationY >= d.startY && locationY <= d.endY))

      if (area && inputs.every(d => d !== area.id) && this.state.turn=='user') {
        let newMove = [...game];

        newMove[area.id]="O";

        

        this.setState({userInputs: userInputs.concat(area.id), game: [...newMove], turn:"AI"}, () => {
          this.judgeWinner();
          setTimeout(() => {
            this.AIAction()   }, 3000);
          console.log("Turn: "+this.state.turn);
        })


                
      }
  }


  /**
   * Quien va ganando
   * @param {*} game 
   * @param {*} player 
   */
  winning(game, player){
    if (
           (game[0] == player && game[1] == player && game[2] == player) ||
           (game[3] == player && game[4] == player && game[5] == player) ||
           (game[6] == player && game[7] == player && game[8] == player) ||
           (game[0] == player && game[3] == player && game[6] == player) ||
           (game[1] == player && game[4] == player && game[7] == player) ||
           (game[2] == player && game[5] == player && game[8] == player) ||
           (game[0] == player && game[4] == player && game[8] == player) ||
           (game[2] == player && game[4] == player && game[6] == player)
           ) {
           return true;
       } else {
           return false;
       }
   }


  /**
   * Function minimax  returns the position selected
   */
  minimax(newBoard, player){
  
   const { game } = this.state

    //available spots
    var availSpots = this.emptyIndexies(newBoard);
    //console.log("vacio"+availSpots)
    // checks for the terminal states such as win, lose, and tie and returning a value accordingly
    if (this.winning(newBoard, "O")){

       return -10;
    }
    else if (this.winning(newBoard, "X")){
      
      return 10;
    }
    else if (availSpots.length == 0){
      
      return 0;
    }
  // an array to collect all the objects
    var moves = [];
    
  //console.log(availSpots);
    // loop through available spots
    for (var i = 0; i < availSpots.length; i++){
      var newBoardAI = [...newBoard];
      //create an object for each and store the index of that spot that was stored as a number in the object's index key
      var move = {
        index: 0,
        score: 0
      };
      var scoreMini = 0;

      var index = newBoardAI[availSpots[i]];
      //move.index = i;
      // set the empty spot to the current player
      newBoardAI[availSpots[i]] = player;

      //if collect the score resulted from calling minimax on the opponent of the current player
      if (player == "X"){
        scoreMini = scoreMini + this.minimax(newBoardAI, "X");

      }
      else{
        scoreMini = scoreMini + this.minimax(newBoardAI, "O");
      }
      //console.log(move.score)

      //reset the spot to empty
      newBoardAI[availSpots[i]] = index+1;
  

      // push the object to the array
      moves.push({score: scoreMini});

    }
  
    var bestMove;
    if(player === "X"){
      this.state.AIInputs
      var bestScore = -10000;
      for(var i = 0; i < moves.length; i++){
        if(moves[i].score > bestScore){
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }else{
  
  // else loop over the moves and choose the move with the lowest score
      var bestScore = 10000;
      for(var i = 0; i < moves.length; i++){
        if(moves[i].score < bestScore){
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
  
  // return the chosen move (object) from the array to the higher depth
    return bestMove-1;
  }

  /**
   * Vacios
   * @param {*} game 
   */
  emptyIndexies(game){
    //console.log("Game en empty function"+game)
    //let empty = 0;
    var emptyArray = []
    
    for(i=0; i<game.length; i++){
      //console.log(isNaN(game[i]))
      if( Number.isInteger(game[i])){
        emptyArray.push(i)
      }
    }
    //console.log("empty"+emptyArray)
    return emptyArray;
  }

  /**
   * Accion de AI
   */
  AIAction() {
    const { userInputs, AIInputs, result, game, turn } = this.state
    console.log("meter en:" + this.minimax(game, "X"));
    //console.log("game");
    let newMove;
    newMove = [...game];
    newMove[this.minimax(game, "X")]="X"
    this.setState({AIInputs: AIInputs.concat(this.minimax(game, "X")), game: newMove,turn:"user"})

    
  }
  
  componentDidMount() {
    this.restart()
  }
  /**
   * Comprobar ganador
   * @param {*} inputs 
   */
  isWinner(inputs) {
  
    for(i=0;i<=CONDITIONS.length -1; i++){
        if(inputs[CONDITIONS[i][0]] == "O" && inputs[CONDITIONS[i][1]] == "O" && inputs[CONDITIONS[i][2]] == "O"){
          return true;
        }
      
      }
    return false;
  }
  /**
   * Juzgar Ganador
   */
  judgeWinner() {
    const { userInputs, AIInputs, result, turn, game } = this.state
    const inputs = userInputs.concat(AIInputs)
  
    
    if (inputs.length >= 5 ) {
      
      let res = this.isWinner(game)
      //console.log(res+"h");
      if (res && result !== GAME_RESULT_USER) {
        return this.setState({ result: GAME_RESULT_USER })
      }
      res = this.isWinner(game)
      //console.log(res+"r");

      if (res && result !== GAME_RESULT_AI) {
        return this.setState({ result: GAME_RESULT_AI })
      }
    }
    if (inputs.length === 9 &&
        result === GAME_RESULT_NO && result !== GAME_RESULT_TIE) {
      this.setState({ result: GAME_RESULT_TIE })
    }
  }
  /**
   * Render
   */
  render() {
    const { userInputs, AIInputs, result, turn, game } = this.state
    
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
        <Text>
          Turno:
          {
            this.state.turn
          }
        </Text>
      </View>
    )
  }
}