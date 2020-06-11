import React, { Component } from 'react'
import Card from "./Card"
import "./Player.css"
class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {cardColor: "Card", cardID: null}
        this.changeToBlue = this.changeToBlue.bind(this)
    }
    changeToBlue(cardID) {
        this.setState({cardColor: "Card-Blue", cardID: cardID})
    }
    render() {
        let hand = this.props.hand;
        let count = 0;
        return(
            <div className="Player">
                <h1>Player {hand.id}</h1>
                <div className="Player-Deck">
                    {hand.deck.map(card => {
                        let cardColor;
                        if(this.state.cardID === card.id) {
                            cardColor = this.state.cardColor
                        }
                        return (
                            <Card 
                                cardColor = {cardColor}                         
                                key = {card.id}
                                cardID = {card.id}
                                card = {card}
                                hand = {hand}
                                getSelectedCard = {this.props.getSelectedCard}
                                changeToBlue = {this.changeToBlue}
                            />  
                        )    

                    }
                       
                    )}
                </div>
            </div>
        )
    }
}

export default Player;