import React, { Component } from 'react';
import Footer from '../../components/Footer/Footer';
import DiceCalculator from '../../components/DiceCalculator/DiceCalculator';
import GoHome from '../../components/GoHome/GoHome';
import RollPlayToHit from '../../components/RollPlayToHit/RollPlayToHit';

export default class Player extends Component {
    render() {
        return (
            <React.Fragment>
                <RollPlayToHit />
                <p>Actions Chart, displays actions you can do.</p>
                <p>Status Chart, display status effects.</p>
                <p></p>
                <Footer />
            </React.Fragment>
        )
    }
}
