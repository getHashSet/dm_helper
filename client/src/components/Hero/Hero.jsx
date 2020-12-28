import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from "react-redux";

Hero.defaultProps = {}

export default function Hero(props) {
    // =================== //
    //   HOOK INTO STATE   //
    // =================== //
    const [theTitle] = useState(useSelector((state) => state.headerTag));

    return (
        <StyledSection>
            <div className="shadow"></div>
            <div className="title">
                <h1>{theTitle}</h1>
            </div>
        </StyledSection>
    )
}

const StyledSection = styled.section`
    position: relative;
    padding: .5em;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
    box-sizing: border-box;
    background: url("./images/hero.jpg");
    background-color: #555;
    background-size: cover;
    background-position: center center;

    .shadow {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.3);
        z-index: 0;
    }

    .title {
        z-index: 1;
    }

    .logo {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;

        img {
        padding: 2px;
        margin: 0 .5em;
        width: auto;
        height: 5em;
        
        @media (max-width: 768px) {
            display: block;
        }
    }
    }

    h1 {
        color: #fff;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 900;
        z-index: 1;

        span {
            font-weight: 200;
        }

        @media (max-width: 768px) {
            font-size: 2em;
        }
    }
`;