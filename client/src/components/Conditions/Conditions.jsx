// ========== //
//   IMPORT   //
// ========== //
import React from 'react';
import * as S from '../../styles/StyledElements';

// ========== //
//   EXPORT   //
// ========== //
export default function Conditions() {
    
    // ========== //
    //   RETURN   //
    // ========== //
    return (
        <S.Chapter>
            <S.Frame>
                <h2>Conditions</h2>
                <p>Display all the conditions here for the toast menu.</p>
                <p>Unconscious Stunned, Restrained, Prone, Poisoned, Petrified, Paralyzed, Invisible, Incapacitated, Grappled, Frightened, Deafened, Charmed, Blinded</p>

                <h2>Exhaustion</h2>
                <ul>
                    <li>
                        <div className="number">1</div>
                        <div className="checkbox"></div>
                        <div className="desc">Disadvantage on Ability Checks</div>
                    </li>
                    <li>
                        <div className="number">2</div>
                        <div className="checkbox"></div>
                        <div className="desc">Speed halved</div>
                    </li>
                    <li>
                        <div className="number">3</div>
                        <div className="checkbox"></div>
                        <div className="desc">Disadvantage on Attack Rolls and Saving Throws</div>
                    </li>
                    <li>
                        <div className="number">4</div>
                        <div className="checkbox"></div>
                        <div className="desc">Hit point maximum halved</div>
                    </li>
                    <li>
                        <div className="number">5</div>
                        <div className="checkbox"></div>
                        <div className="desc">Speed reduced to 0</div>
                    </li>
                    <li>
                        <div className="number">6</div>
                        <div className="checkbox"></div>
                        <div className="desc">Death</div>
                    </li>
                </ul>
            </S.Frame>
        </S.Chapter>
    )
}