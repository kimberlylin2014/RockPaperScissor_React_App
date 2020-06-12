import React, { Component } from 'react'
import Player from "./Player"
import "./Game.css"
import { v4 as uuidv4 } from 'uuid';

class Game extends Component {
    static defaultProps = {
        cards: [
            {name: "rock", img: "https://image.flaticon.com/icons/svg/617/617761.svg"},
            {name: "paper", img: "https://image.flaticon.com/icons/svg/103/103493.svg"},
            {name: "scissor", img: "https://image.flaticon.com/icons/svg/103/103473.svg"}
        ],
        manual: {
            "rock": "scissor",
            "paper": "rock",
            "scissor": "paper"
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            tieGame: false,
            hand1: {id: 1, deck: this.generateCards(), selectedCardName: null, selectedCardID: null, ready: false, revealResult: null, winner: null},
            hand2: {id: 2, deck: this.generateCards(), selectedCardName: null, selectedCardID: null, ready: false, revealResult: null, winner: null},
        }

        this.generateCards = this.generateCards.bind(this);
        this.getSelectedCard = this.getSelectedCard.bind(this);
        this.play = this.play.bind(this);
        this.determineWinner = this.determineWinner.bind(this);
        this.resetGame = this.resetGame.bind(this)
    }
    generateCards() {    
        let randomIndex;
        let randomCards = [];
        this.props.cards.forEach(() => {
            randomIndex  = Math.floor(Math.random() * this.props.cards.length);
            randomCards.push({...this.props.cards[randomIndex], id: uuidv4()});
        })
       return randomCards;
    }
    getSelectedCard(handID, cardName, cardID) {
        if(handID === this.state.hand1.id) {
            this.setState((currentState) => {
                return {hand1: {...currentState.hand1, ready: true, selectedCardName: cardName, selectedCardID: cardID}}
            })
        } else if (handID === this.state.hand2.id) {
            this.setState((currentState) => {
                return {hand2: {...currentState.hand2, ready: true, selectedCardName: cardName, selectedCardID: cardID}}
            })
        }
    
    }
    play() {
        let selectedHand1 = this.state.hand1.selectedCardName;
        let selectedHand2 = this.state.hand2.selectedCardName;
        this.determineWinner(selectedHand1, selectedHand2);
        this.setState((currentState) => {
            return {
                hand1: {...currentState.hand1, revealResult: true},
                hand2: {...currentState.hand2, revealResult: true}
            }
        })
    }
    determineWinner(hand1Card, hand2Card) {
        if(this.props.manual[hand1Card] === hand2Card){
            console.log("hand 1 wins")
            this.setState((currentState) => {
                return {
                    hand1: {...currentState.hand1, winner: true, ready: false},
                    hand2: {...currentState.hand2, winner: false, ready: false}
                }
            })
        } else if (this.props.manual[hand2Card] === hand1Card) {
            console.log("hand 2 wins")
            this.setState((currentState) => {
                return {
                    hand1: {...currentState.hand1, winner: false, ready: false},
                    hand2: {...currentState.hand2, winner: true, ready: false}
                }
            })
        } else {
            this.setState((currentState) => {
                return {
                    tieGame: true,
                    hand1: {...currentState.hand1, winner: null, ready: false},
                    hand2: {...currentState.hand2, winner: null, ready: false}
                }
            })
        }
    }
    resetGame() {
        this.setState({
            tieGame: false,
            hand1: {id: 1, deck: this.generateCards(), selectedCardName: null, selectedCardID: null, ready: false, revealResult: null, winner: null},
            hand2: {id: 2, deck: this.generateCards(), selectedCardName: null, selectedCardID: null, ready: false, revealResult: null, winner: null},
        })
    }
    render() {
        let {hand1, hand2} = this.state;
        let playButton =  
            <button className="btn btn-warning mb-4 mt-3" disabled={this.state.hand1.ready && this.state.hand2.ready ? false : true} onClick={this.play}>
                 {this.state.hand1.ready && this.state.hand2.ready ? "PLAY" : "Each Player Needs To Select A Card"}
            </button>
        let replayButton = 
            <button className="btn btn-info mb-4 mt-3" onClick={this.resetGame}>{this.state.tieGame ? "Tie Game. ": ""} Replay</button>
        return (
            <div className="Game">     
                <Player 
                    hand = {hand1}
                    getSelectedCard = {this.getSelectedCard}
                />
                {this.state.hand1.winner || this.state.hand2.winner || this.state.tieGame ? replayButton : playButton}
                <Player 
                    hand = {hand2} 
                    getSelectedCard = {this.getSelectedCard}
                />
            </div>

        )
    }
}

export default Game;