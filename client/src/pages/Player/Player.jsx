import React, { Component } from 'react';
import RollPlayToHit from '../../components/RollPlayToHit/RollPlayToHit';
import SpellSearch from '../../components/SpellSearch/SpellSearch';
import Nav from '../../components/Nav/Nav';

export default class Player extends Component {
    render() {
        return (
            <React.Fragment>
                <RollPlayToHit />
                <SpellSearch />
                <Nav />
            </React.Fragment>
        )
    }
}
