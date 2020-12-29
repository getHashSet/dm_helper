import React, { Component } from 'react';
import Hero from '../../components/Hero/Hero';
import Footer from '../../components/Footer/Footer';
import ItemShop from '../../components/ItemShop/ItemShop';
import RandomEncounter from '../../components/RandomEncounter/RandomEncounter';
import DiceCalculator from '../../components/DiceCalculator/DiceCalculator';
import Inn from '../../components/Inn/Inn';
import GoHome from '../../components/GoHome/GoHome';

export default class Dm extends Component {
    render() {
        return (
            <React.Fragment>
                <RandomEncounter />
                <DiceCalculator />
                <Inn />
                <ItemShop />
                <Footer />
                <GoHome />
            </React.Fragment>
        )
    }
}
