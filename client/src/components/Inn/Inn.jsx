import React from 'react';
import styled from 'styled-components';

Inn.defaultProps = {}

export default function Inn() {

    const randomRumor = (e) => {
        e.preventDefault();

        console.log(`Random Rumor on a chart with length being the max value. ${Math.floor(Math.random() * 200)}`);
    }
    return (
        <StyledSection>
            <StyledFrame>
                <h2>The Tavern</h2>
                <div>
                    <p>How many employees?</p>
                    <p>Tavern Employee [name, race, mood]</p>
                    <p>How many patrons? [1d4, 2d4, 3d4, 4d4]</p>
                    <p>Menu</p>
                    <p>Room Cost</p>
                </div>
                <StyledButton onClick={randomRumor}>Random Rumor</StyledButton>
            </StyledFrame>
        </StyledSection>
    )
}

const StyledFrame = styled.div`
    width: 100%;
    max-width: 1200px;
    color: #34495e;

    h2 {
        font-size: 2em;
        font-weight: 800;
    }
`;

const StyledSection = styled.section`
    padding: 1em .5em;
    display: flex;
    justify-content: center;
`;

const StyledButton = styled.button`
    background:  #2ecc71;
    color: #fff;
    font-size: 1.5em;
    padding: .5em 1em;
    margin: .5em 0;
    border-radius: 2em;
    border: 1px solid #2ecc71;
    text-transform: uppercase;
    font-weight: 900;

    &:hover {
        cursor: pointer;
        background-color: #27ae60;
        color: #fff;
        transform: translateY(2px);
    }

    &:active {
        transform: translateY(4px);
    }

    &:focus {
        outline: none;
    }
`;