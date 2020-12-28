import React, { Component } from 'react';
import Hero from '../../components/Hero/Hero';
import Footer from '../../components/Footer/Footer';
import ItemShop from '../../components/ItemShop/ItemShop';
import RandomEncounter from '../../components/RandomEncounter/RandomEncounter';
import RollToHit from '../../components/RollToHit/RollToHit';

export default class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <Hero />
                <RandomEncounter />
                <RollToHit />
                <ItemShop/>
                <Footer/>
            </React.Fragment>
        )
    }
}
