// ========== //
//   IMPORT   //
// ========== //
import React from 'react';
import { useDispatch } from "react-redux";
import { showToastMenuState, updateToastData } from "../../../redux/actions";
import { svg_bookmark } from '../../../styles';
import * as S from '../../../styles/StyledElements';

// ========== //
//   EXPORT   //
// ========== //
export default function ActionPassive(props) {
    // ========= //
    //   REDUX   //
    // ========= //
    const dispatch = useDispatch(); // used to send data back to redux

    // ================ //
    //     Functions    //
    // ================ //
    const updateToastHandler = () => {
        const toast = <S.Toast>{props.special_ability.desc}</S.Toast>;
        dispatch(updateToastData(toast));
        dispatch(showToastMenuState(true));
    };

    // ========== //
    //   RETURN   //
    // ========== //
    return (
        <S.CardAction>

            <div className="dice_box">
                {svg_bookmark}
            </div>

            <div className="info" onClick={updateToastHandler}>
                <div className="title">
                    {props.special_ability.name}
                </div>
                <div className="body">
                    <p>{props.special_ability.desc}</p>
                </div>
            </div>
            
        </S.CardAction>
    )
};