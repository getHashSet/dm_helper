// ========== //
//   IMPORT   //
// ========== //
import React from 'react';
import { useDispatch } from "react-redux";
import { showToastMenuState, updateToastData } from "../../redux/actions";
import { svg_d20 } from '../../styles';
import * as S from '../../styles/StyledElements';

// ============== //
//     EXPORT     //
// ============== //
export default function RollPlayToHit(props) {
    // ================= //
    //   HOOKS & REDUX   //
    // ================= //
    const dispatch = useDispatch();

    // ================ //
    //     Functions    //
    // ================ //
    const updateToastHandler = data => {
        const toastData = <S.Toast>{data}</S.Toast>;
        dispatch(updateToastData(toastData));
        dispatch(showToastMenuState(true));
    };

    const rollPlayToHitHandler = () => {
        const toastJsx = (
            <React.Fragment>
                <p>Gripping my mace <span><i>Adinnale</i></span> tightly in my hand. I take a breath all the way down into my belly, then shout.</p>
                <h4>"Whost thy father!"</h4>
                <p>And unleash my blow upon thy head.</p>
                <p>(Hit roll: {Math.floor(Math.random() * 20) + 1}) (Damage: {Math.floor(Math.random() * 8) + 3})</p>
            </React.Fragment>)
        updateToastHandler(toastJsx);
    }

    // ========== //
    //   RETURN   //
    // ========== //
    return (
        <S.Chapter backgroundColor={props => props.theme.color.red} fontColor={props => props.theme.color.white}>
            <S.Frame>

                <h2>Roll<span>Play</span> to Hit</h2>

                <p>Weapon</p>
                <p>weapon name?</p>
                <p>Str, dex</p>
                <p>character level</p>
                <p>proficiencey (default is true)</p>
                <p>add to hit</p>
                <p>add to damage</p>
                <p>advantage? (default is false)</p>
                <S.Button onClick={rollPlayToHitHandler}>
                    {svg_d20}
                    <span>Roll</span>
                </S.Button>

            </S.Frame>
        </S.Chapter>
    )
}