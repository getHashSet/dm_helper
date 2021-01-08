import React, { Component } from 'react';
import RollPlayToHit from '../../components/RollPlayToHit/RollPlayToHit';
import SpellSearch from '../../components/SpellSearch/SpellSearch';
import Nav from '../../components/Nav/Nav';
import CombatActions from '../../components/CombatActions/CombatActions';
import Conditions from '../../components/Conditions/Conditions';

export default class Player extends Component {
    render() {
        return (
            <React.Fragment>
                <RollPlayToHit />
                <CombatActions />
                <SpellSearch />
                <Conditions />
                <Nav />
            </React.Fragment>
        )
    }
}
