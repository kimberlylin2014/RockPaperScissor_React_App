import React, { Component } from 'react'
import "./Card.css"
class Card extends Component {
    static defaultProps = {
        cardColor : "Card"
    }
    constructor(props) {
        super(props);
        this.state = {
            blueColor: false
        }
        this.handleGetSelectedCard = this.handleGetSelectedCard.bind(this);
        this.handleChangeToBlue = this.handleChangeToBlue.bind(this);
    }
    handleGetSelectedCard(e) {
        this.handleChangeToBlue();
        this.props.getSelectedCard(this.props.hand.id, this.props.card.name, this.props.cardID)
    }
    handleChangeToBlue() {
        this.props.changeToBlue(this.props.cardID)
    }
    render() {
        let classColor = this.props.cardColor;
        let reveal;
        if(this.props.cardID === this.props.hand.selectedCardID && this.props.hand.revealResult) {
            reveal = true;
        } else {
            reveal = false;
        }
        return(
            <div className={classColor} onClick={this.handleGetSelectedCard}>
                <h1>{reveal ? this.props.card.name :"Pick a Card"}</h1>
                <img src={reveal ? this.props.card.img : "https://image.flaticon.com/icons/svg/2476/2476190.svg"}></img>
    
            </div>
        )
    }
}

export default Card;