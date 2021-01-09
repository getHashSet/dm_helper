import React, { Component } from 'react';
import Nav from '../../components/Nav/Nav';
import * as S from '../../styles/StyledElements';

export default class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <S.Hero>
                    <h1>TableTop Squire</h1>
                </S.Hero>
                <Nav/>
            </React.Fragment>
        )
    }
}