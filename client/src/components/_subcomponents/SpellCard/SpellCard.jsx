// ========== //
//   IMPORT   //
// ========== //
import React from 'react';
import * as S from '../../../styles/StyledElements'

// ========== //
//   EXPORT   //
// ========== //
export default function SpellCard(props) {
    // ========== //
    //   RETURN   //
    // ========== //
    return (
        <S.Chapter>
            <S.Frame maxWidth="400px">
                <h2>
                    {props.spell.name}
                </h2>
                <S.Box>
                    {+props.spell.level > 0 ? `Spell Lv. ${props.spell.level}` : "Cantrip"}
                </S.Box>
                <S.Box>
                    {props.spell.desc}
                </S.Box>
                <S.Box>
                    {props.spell.components}
                </S.Box>
                <S.Box>
                    Concentration: {props.spell.concentration ? "Yes" : "No"}
                </S.Box>
            </S.Frame>
        </S.Chapter>
    )
}
