import React from 'react';
import styled from 'styled-components';

export default function CombatActions() {
    return (
        <StyledCombatActions className="chapter">
            <div className="frame">
                <h2>List of Combat Actions:</h2>
                <section>Movement</section>
                <section>Interaction</section>
                <section>Action</section>
                <section>Bonus Action</section>
                <section>Reaction</section>
            </div>
        </StyledCombatActions>
    )
}

const StyledCombatActions = styled.section`

`;