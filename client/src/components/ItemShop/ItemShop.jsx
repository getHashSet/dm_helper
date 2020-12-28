import React from 'react';
import styled from 'styled-components';

ItemShop.defaultProps = {}

export default function ItemShop() {
    return (
        <StyledSection>
            <h2>Item Shop</h2>
            <div>
                <p>Adventure Shop</p>
                <p>Stable</p>
                <p>Black Smith</p>
                <p>Arms &amp; Armor</p>
                <p>Magic Shop</p>
            </div>
            <StyledButton>CREAT SHOP</StyledButton>
        </StyledSection>
    )
}

const StyledSection = styled.section`
    min-height: 30vh;
    padding: .5em;

    h2 {
        font-size: 2em;
        font-weight: 800;
    }
`;

const StyledButton = styled.button`
    background: none;
    color: #2c3e50;
    font-size: 1.5em;
    padding: .5em 1em;
    margin: .5em 0;
    border-radius: 2em;
    border: 1px solid #2c3e50;
    text-transform: uppercase;
    font-weight: 900;

    &:hover {
        cursor: pointer;
        background-color: #34495e;
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