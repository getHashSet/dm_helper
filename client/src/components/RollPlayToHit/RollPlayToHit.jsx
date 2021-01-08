// ========== //
//   IMPORT   //
// ========== //
import React from 'react';
import styled from 'styled-components';
import StyledToast from '../../styles/StyledToast';
import { useDispatch } from "react-redux";
import { showToastMenuState, updateToastData } from "../../redux/actions";
import { svg_d20 } from '../../styles';

// ============== //
//     EXPORT     //
// ============== //
export default function RollPlayToHit() {
    // ================= //
    //   HOOKS & REDUX   //
    // ================= //
    const dispatch = useDispatch();

    // ================ //
    //     Functions    //
    // ================ //
    const updateToastHandler = data => {
        const toastData = <StyledToast>{data}</StyledToast>;
        dispatch(updateToastData(toastData));
        dispatch(showToastMenuState(true));
    };

    const rollPlayToHitHandler = () => {
        const toastJsx = (
            <section>
                <p>Gripping my mace <span><i>Adinnale</i></span> tightly in my hand. I take a breath all the way down into my belly, then shout.</p>
                <h4>"Whost thy father!"</h4>
                <p>And unleash my blow upon thy head.</p>
                <p>(Hit roll: {Math.floor(Math.random() * 20) + 1}) (Damage: {Math.floor(Math.random() * 8) + 3})</p>
            </section>)
        updateToastHandler(toastJsx);
    }

    // ========== //
    //   RETURN   //
    // ========== //
    return (
        <StyledSection>
            <StyledFrame>

                <h2>Roll<span>Play</span> to Hit</h2>

                <p>Weapon</p>
                <p>weapon name?</p>
                <p>Str, dex</p>
                <p>character level</p>
                <p>proficiencey (default is true)</p>
                <p>add to hit</p>
                <p>add to damage</p>
                <p>advantage? (default is false)</p>
                <StyledButton onClick={rollPlayToHitHandler}>
                    {svg_d20}
                    <span>Roll</span>
                </StyledButton>

            </StyledFrame>
        </StyledSection>
    )
}

// ========= //
//   STYLE   //
// ========= //
const StyledSection = styled.section`
    padding: 1em .5em;
    background-color: #e74c3c;
    display: flex;
    justify-content: center;
`;

const StyledFrame = styled.div`
    width: 100%;
    max-width: 1200px;
    color: #fff;

    h2 {
        font-size: 2em;
        font-weight: 800;

        span {
            font-weight: 100;
        }
    }
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

    svg {
        width: 1em;
        padding: 0 .5em;
        margin-bottom: -4px;
    }

    span {
        padding-right: .5em;
    }

    &:hover {
        cursor: pointer;
        background-color: #c0392b;
        transform: translateY(2px);
    }

    &:active {
        transform: translateY(4px);
    }

    &:focus {
        outline: none;
    }
`;