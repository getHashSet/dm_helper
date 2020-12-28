import React from 'react';
import styled from 'styled-components';

export default function Menu() {
    return (
        <StyledNav>
            <ul>
                <li>Home</li>
                <li>Shop</li>
                <li>Our Story</li>
            </ul>
        </StyledNav>
    )
}

const StyledNav = styled.nav`
    position: fixed;
    top: 0;
    right: 0;
`;