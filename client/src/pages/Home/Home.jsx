import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import Menu from '../../components/Menu/Menu';
import Toast from '../../components/Toast/Toast';

export default class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <StyledHero>
                    <StyledSection className="styled_top">
                        <h1>TableTop Squire</h1>
                    </StyledSection>
                    {/* <StyledSection className="styled_bottom">
                        <Link  to="/dm" >
                            <StyledLink>
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="dungeon" className="svg-inline--fa fa-dungeon fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M128.73 195.32l-82.81-51.76c-8.04-5.02-18.99-2.17-22.93 6.45A254.19 254.19 0 0 0 .54 239.28C-.05 248.37 7.59 256 16.69 256h97.13c7.96 0 14.08-6.25 15.01-14.16 1.09-9.33 3.24-18.33 6.24-26.94 2.56-7.34.25-15.46-6.34-19.58zM319.03 8C298.86 2.82 277.77 0 256 0s-42.86 2.82-63.03 8c-9.17 2.35-13.91 12.6-10.39 21.39l37.47 104.03A16.003 16.003 0 0 0 235.1 144h41.8c6.75 0 12.77-4.23 15.05-10.58l37.47-104.03c3.52-8.79-1.22-19.03-10.39-21.39zM112 288H16c-8.84 0-16 7.16-16 16v64c0 8.84 7.16 16 16 16h96c8.84 0 16-7.16 16-16v-64c0-8.84-7.16-16-16-16zm0 128H16c-8.84 0-16 7.16-16 16v64c0 8.84 7.16 16 16 16h96c8.84 0 16-7.16 16-16v-64c0-8.84-7.16-16-16-16zm77.31-283.67l-36.32-90.8c-3.53-8.83-14.13-12.99-22.42-8.31a257.308 257.308 0 0 0-71.61 59.89c-6.06 7.32-3.85 18.48 4.22 23.52l82.93 51.83c6.51 4.07 14.66 2.62 20.11-2.79 5.18-5.15 10.79-9.85 16.79-14.05 6.28-4.41 9.15-12.17 6.3-19.29zM398.18 256h97.13c9.1 0 16.74-7.63 16.15-16.72a254.135 254.135 0 0 0-22.45-89.27c-3.94-8.62-14.89-11.47-22.93-6.45l-82.81 51.76c-6.59 4.12-8.9 12.24-6.34 19.58 3.01 8.61 5.15 17.62 6.24 26.94.93 7.91 7.05 14.16 15.01 14.16zm54.85-162.89a257.308 257.308 0 0 0-71.61-59.89c-8.28-4.68-18.88-.52-22.42 8.31l-36.32 90.8c-2.85 7.12.02 14.88 6.3 19.28 6 4.2 11.61 8.9 16.79 14.05 5.44 5.41 13.6 6.86 20.11 2.79l82.93-51.83c8.07-5.03 10.29-16.19 4.22-23.51zM496 288h-96c-8.84 0-16 7.16-16 16v64c0 8.84 7.16 16 16 16h96c8.84 0 16-7.16 16-16v-64c0-8.84-7.16-16-16-16zm0 128h-96c-8.84 0-16 7.16-16 16v64c0 8.84 7.16 16 16 16h96c8.84 0 16-7.16 16-16v-64c0-8.84-7.16-16-16-16zM240 177.62V472c0 4.42 3.58 8 8 8h16c4.42 0 8-3.58 8-8V177.62c-5.23-.89-10.52-1.62-16-1.62s-10.77.73-16 1.62zm-64 41.51V472c0 4.42 3.58 8 8 8h16c4.42 0 8-3.58 8-8V189.36c-12.78 7.45-23.84 17.47-32 29.77zm128-29.77V472c0 4.42 3.58 8 8 8h16c4.42 0 8-3.58 8-8V219.13c-8.16-12.3-19.22-22.32-32-29.77z"></path></svg>
                                <div className="title">Dungeon <span>Master</span></div>
                            </StyledLink>
                        </Link>
                        <Link to="/pc">
                            <StyledLink>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" className="svg-inline--fa fa-users fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path></svg>
                                <div className="title">Player</div>
                            </StyledLink>
                        </Link>
                    </StyledSection> */}
                </StyledHero>
                <Menu />
                <Toast />
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
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    h1 {
        font-weight: 900;
        font-size: 7vw;
        padding-top: 10vh;
    }

    &.styled_top {
        height: 50%;
        align-items: center;
    }

    &.styled_bottom {
        height: 50%;
        align-items: flex-start;
    }
`;

const StyledLink = styled.div`
    width: 25vw;
    max-width: 150px;
    padding: 1em;
    margin: 5vw;
    text-decoration: none;
    border: none;
    color: #fff;
    text-align: center;
    font-size: 1.2em;
    font-weight: 900;

    .title {
        padding-top: .5em;
    }

    span {
        display: block;
        padding-top: .2em;
    }

    svg {
        height: 120px;
        max-height: 20vw;
        color: #fff;
    }

    &:hover {
        transform: translateY(2px);
    }

    &:active {
        transform: translateY(4px);
    }
`;