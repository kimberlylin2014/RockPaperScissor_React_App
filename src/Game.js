import React, { Component } from 'react'
import Player from "./Player"
import "./Game.css"
import { v4 as uuidv4 } from 'uuid';

class Game extends Component {
    static defaultProps = {
        cards: [
            {name: "rock", img: "https://image.flaticon.com/icons/svg/617/617830.svg"},
            {name: "paper", img: "https://image.flaticon.com/icons/svg/620/620036.svg"},
            {name: "scissor", img: "https://image.flaticon.com/icons/svg/103/103399.svg"}
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
            hand1: {id: 1, deck: this.generateCards(), selectedCardName: null, selectedCardID: null, ready: false, revealResult: null},
            hand2: {id: 2, deck: this.generateCards(), selectedCardName: null, selectedCardID: null, ready: false, revealResult: null},
        }
        this.generateCards = this.generateCards.bind(this);
        this.getSelectedCard = this.getSelectedCard.bind(this);
        this.play = this.play.bind(this);
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
        console.log(handID);
        console.log(cardName)
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
        this.setState((currentState) => {
            return {hand1: {...currentState.hand1, revealResult: true},
                    hand2: {...currentState.hand2, revealResult: true}
                }
        })
    }
    render() {
        let {hand1, hand2} = this.state;
        return (
            <div className="Game">
                <Player 
                    hand = {hand1}
                    getSelectedCard = {this.getSelectedCard}
                />
                <button disabled={this.state.hand1.ready && this.state.hand2.ready ? false : true} onClick={this.play}>Play</button>
                <Player 
                    hand = {hand2} 
                    getSelectedCard = {this.getSelectedCard}
                />
            </div>

        )
    }
}

export default Game;