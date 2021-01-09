import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { showToastMenuState, updateToastData } from "../../redux/actions";
import DiceCalculator from "../DiceCalculator/DiceCalculator";
import Toast from '../Toast/Toast';
import * as S from '../../styles/StyledElements';
import { svg_d20, svg_dungeon, svg_users } from '../../styles';

export default function Nav() {
    // ========= //
    //   REDUX   //
    // ========= //
    const dispatch = useDispatch(); // used to send data back to redux

    // ================ //
    //     Functions    //
    // ================ //
    const updateToastHandler = (data) => {
        const html = <S.Toast>{data}</S.Toast>
        dispatch(updateToastData(html));
        dispatch(showToastMenuState(true));
    };

    const diceCalculatorHandler = () => {
        updateToastHandler(<DiceCalculator />);
    };

    // ============= //
    //     RETURN    //
    // ============= //
    return (
        <React.Fragment>
            <S.Nav>
                <ul>
                    <li>
                        <Link to="/dm">
                            {svg_dungeon}
                        </Link>
                    </li>
                    <li onClick={diceCalculatorHandler}>
                        {svg_d20}
                    </li>
                    <li>
                        <Link to="/pc">
                            {svg_users}
                        </Link>
                    </li>
                </ul>
            </S.Nav>
            <Toast />
        </React.Fragment>
    )
}