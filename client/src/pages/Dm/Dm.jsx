import React, { Component } from 'react';
import ItemShop from '../../components/ItemShop/ItemShop';
import RandomEncounter from '../../components/RandomEncounter/RandomEncounter';
import Inn from '../../components/Inn/Inn';
import Npc from '../../components/Npc/Npc';
import Nav from '../../components/Nav/Nav';

export default class Dm extends Component {
    render() {
        return (
            <React.Fragment>
                <RandomEncounter/>
                <Npc/>
                <Inn/>
                <ItemShop/>
                <Nav/>
            </React.Fragment>
        )
    }
}
