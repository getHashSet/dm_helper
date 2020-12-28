import React from 'react';
import styled from 'styled-components';
import Slider from '../_subcomponents/Slider/Slider';

RandomEncounter.defaultProps = {}

export default function RandomEncounter() {

    return (
        <StyledSection>
            <StyledFrame>
                <h2>Random Encounter</h2>
                <p>Party Level</p>
                <Slider/>
                <p>Location</p>
                <StyledButton>Roll Initiative</StyledButton>
            </StyledFrame>
        </StyledSection>
    )
}

const StyledFrame = styled.div`
    width: 100%;
    max-width: 1200px;
    color: #fff;

    h2 {
        font-size: 2em;
        font-weight: 800;
    }
`

const StyledSection = styled.section`
    padding: 1em .5em;
    background-color: #e74c3c;
    display: flex;
    justify-content: center;
`;

const StyledButton = styled.button`
    background: none;
    color: #fff;
    font-size: 1.5em;
    padding: .5em 1em;
    margin: .5em 0;
    border-radius: 2em;
    border: 1px solid #fff;
    text-transform: uppercase;
    font-weight: 900;

    &:hover {
        cursor: pointer;
        background-color: #c0392b;
        transform: translateY(2px);
    }

    &:active {
        transform: translateY(4px);
    }

    &:focus {
        outline: none;
    }
`;