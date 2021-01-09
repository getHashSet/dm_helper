// ========== //
//   IMPORT   //
// ========== //
import React from 'react';
import * as S from '../../styles/StyledElements';

// ========== //
//   EXPORT   //
// ========== //
export default function CombatActions() {

    // ========== //
    //   RETURN   //
    // ========== //
    return (
        <S.Chapter className="chapter">
            <S.Frame>
                <h2>List of Combat Actions:</h2>
                <section>Movement</section>
                <section>Interaction</section>
                <section>Action</section>
                <section>Bonus Action</section>
                <section>Reaction</section>
            </S.Frame>
        </S.Chapter>
    )
}