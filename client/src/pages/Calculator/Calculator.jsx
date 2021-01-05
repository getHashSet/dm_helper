import React from 'react';
import styled from 'styled-components';
import DiceCalculator from '../../components/DiceCalculator/DiceCalculator';

export default function Calculator() {
    return (
        <StyledMain>
            <DiceCalculator />
        </StyledMain>
    )
}

const StyledMain = styled.main`
    section {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;