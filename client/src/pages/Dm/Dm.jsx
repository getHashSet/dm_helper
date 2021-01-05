import React, { Component } from 'react';
import Footer from '../../components/Footer/Footer';
import ItemShop from '../../components/ItemShop/ItemShop';
import RandomEncounter from '../../components/RandomEncounter/RandomEncounter';
import DiceCalculator from '../../components/DiceCalculator/DiceCalculator';
import Inn from '../../components/Inn/Inn';
import Npc from '../../components/Npc/Npc';

export default class Dm extends Component {
    render() {
        return (
            <React.Fragment>
                <RandomEncounter />
                <DiceCalculator />
                <Npc />
                <Inn />
                <ItemShop />
                <Footer />
            </React.Fragment>
        )
    }
}
