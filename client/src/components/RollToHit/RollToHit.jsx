import React from 'react';
import styled from 'styled-components';

RollToHit.defaultProps = {}

export default function RollToHit() {
    return (
        <StyledSection>
            <StyledFrame>
                <h2>Dice Calculator</h2>
                <StyledButton>Quick d20</StyledButton>
            </StyledFrame>
        </StyledSection>
    )
}

const StyledFrame = styled.div`
    width: 100%;
    max-width: 1200px;

    h2 {
        font-size: 2em;
        font-weight: 800;
    }
`

const StyledSection = styled.section`
    background: #f39c12;
    color: #fff;
    min-height: 30vh;
    padding: .5em;
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
        background-color: #e67e22;
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