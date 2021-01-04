import React from 'react';
// import { useSelector, useDispatch } from "react-redux";
// import { showToastMenuState, updateToastData } from "../../redux/actions";
import styled from 'styled-components';

// ============= //
//   COMPONENT   //
// ============= //
export default function Conditions() {
    // ========= //
    //   HOOKS   //
    // ========= //
    // const [hookExample, updateHookExample] = useState(true);
    // const dispatch = useDispatch();

    // ============= //
    //   FUNCTIONS   //
    // ============= //

    // ========== //
    //   RETURN   //
    // ========== //
    return (
        <StyledSection>
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
        </StyledSection>
    )
}

// ========== //
//   STYLES   //
// ========== //
const StyledSection = styled.section`
    padding: .5em;
`;