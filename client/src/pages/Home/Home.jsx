import React, { Component } from 'react';
import Hero from '../../components/Hero/Hero';
import Footer from '../../components/Footer/Footer';
import ItemShop from '../../components/ItemShop/ItemShop';
import RandomEncounter from '../../components/RandomEncounter/RandomEncounter';

export default class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <Hero>
                    <h1>The DM Helper</h1>
                </Hero>
                <RandomEncounter />
                <ItemShop/>
                <Footer/>
            </React.Fragment>
        )
    }
}
