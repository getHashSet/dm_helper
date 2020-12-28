import React from 'react';
import styled from 'styled-components';

ItemShop.defaultProps = {}

export default function ItemShop() {
    return (
        <StyledSection>
            <StyledFrame>
                <h2>Item Shop</h2>
                <div>
                    <p>Adventure Shop</p>
                    <p>Stable</p>
                    <p>Black Smith</p>
                    <p>Arms &amp; Armor</p>
                    <p>Magic Shop</p>
                </div>
                <StyledButton>CREAT SHOP</StyledButton>
                <p>Shop Keep: and their name</p>
                <p>NPCS: Number or NPCs in the shop</p>
                <p>List of whats for sale</p>
                <p>How much gold the shop keep has on them</p>
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
    background:  #2c3e50;
    color: #fff;
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