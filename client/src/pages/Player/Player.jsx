import React, { Component } from 'react';
import Footer from '../../components/Footer/Footer';
import DiceCalculator from '../../components/DiceCalculator/DiceCalculator';
import GoHome from '../../components/GoHome/GoHome';

export default class Player extends Component {
    render() {
        return (
            <React.Fragment>
                <DiceCalculator />
                <p>Roll to hit</p>
                <p>Actions Chart</p>
                <p>Status Chart</p>
                <p>Character Maker</p>
                <Footer />
                <GoHome />
            </React.Fragment>
        )
    }
}
