import React, { Component } from 'react';
import styled from 'styled-components';
import Nav from '../../components/Nav/Nav';

export default class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <StyledHero>
                    <StyledSection className="styled_top">
                        <h1>TableTop Squire</h1>
                    </StyledSection>
                </StyledHero>
                <Nav/>
            </React.Fragment>
        )
    }
}

const StyledHero = styled.main`
    position: fixed;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    z-index: 9000;
    background-color: #1e272e;
    color: #ffffff;
`;

const StyledSection = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;

    h1 {
        font-weight: 900;
        font-size: 7vw;
        padding-bottom: 2em;
    }
`;

// const StyledLink = styled.div`
//     width: 25vw;
//     max-width: 150px;
//     padding: 1em;
//     margin: 5vw;
//     text-decoration: none;
//     border: none;
//     color: #fff;
//     text-align: center;
//     font-size: 1.2em;
//     font-weight: 900;

//     .title {
//         padding-top: .5em;
//     }

//     span {
//         display: block;
//         padding-top: .2em;
//     }

//     svg {
//         height: 120px;
//         max-height: 20vw;
//         color: #fff;
//     }

//     &:hover {
//         transform: translateY(2px);
//     }

//     &:active {
//         transform: translateY(4px);
//     }
// `;