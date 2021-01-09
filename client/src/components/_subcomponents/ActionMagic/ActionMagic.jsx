// ========== //
//   IMPORT   //
// ========== //
import React from 'react';
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import { showToastMenuState, updateToastData } from "../../../redux/actions";
import * as S from '../../../styles/StyledElements';
import { svg_book } from '../../../styles';
import axios from 'axios';

// ========== //
//   EXPORT   //
// ========== //
export default function ActionMagic(props) {
    // ========= //
    //   REDUX   //
    // ========= //
    const dispatch = useDispatch(); // used to send data back to redux

    // ================ //
    //     Functions    //
    // ================ //
    const updateToastHandler = (jsx) => {
        dispatch(updateToastData(jsx));
        dispatch(showToastMenuState(true));
    };

    const getMagicSpell = () => {
        axios.get(`https://www.dnd5eapi.co${props.spell.url}`)
        .then(spellInfo => {
            const toast = <S.Toast>{spellInfo.data.desc}</S.Toast>
            updateToastHandler(toast);
        })
        .catch(err => {
            console.log(err);
            const error = <S.Toast>OOPS! Something has gone wrong.</S.Toast>
            updateToastHandler(error);
        })
    }

    // ========== //
    //   RETURN   //
    // ========== //
    return (
        <StyledAction>
            <div className="dice_box">
                {svg_book}
            </div>
            <div className="info" onClick={getMagicSpell}>
                <div className="title">
                    {props.spell.name}
                </div>
                <div className="body">
                    <p>{props.spell.level > 0 ? `Spell Lv. ${props.spell.level}.` : `Cantrip.`}</p>
                </div>
            </div>
        </StyledAction>
    )
}

// ========== //
//   STYLES   //
// ========== //
// NOTE: Clean Styled action so it can be reused.
const StyledAction = styled.div`
    background-color: #fff;
    display: flex;
    margin: .5em;
    border-radius: 4px;
    border: 1px solid #bdc3c7;
    user-select: none;
    /* background-image: linear-gradient(#6D214F, #b33939); */
    background-color: #6D214F;

    .dice_box {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        padding: .5em;
        width: 2em;
        overflow: hidden;
        user-select: none;
        /* background-color: #9b59b6; */
        color: #fff;

        svg {
            width: 1em;
            height: 1em;
            max-width: 100%;
            max-height: 100%;
        }
    }

    .info {
        /* background-image: linear-gradient(red, yellow); */
        width: 100%;

        .title {
            padding: 4px;
            font-size: 1.2em;
            font-weight: 700;
            color: #fff;
            /* background-color: #9b59b6; */
        }

        .body {
            padding: 2px 4px;
            font-size: .8em;
            font-weight: 400;
            border-radius: .5em 0 0 0;
            font-family: 'Roboto Slab', serif;
            background-color: #fff;

            p {
                line-height: 1.2em;
                margin: 0;
            }
        }
    }

    &:hover {
        cursor: pointer;
        border: 1px solid #a68736;
        box-shadow: 0 0 1px #a68736;

        .dice_box {
            /* background-color: #a68736; */
        }

        .info {
            /* background-color: #a68736; */

            .title {
                /* background-color: #a68736; */
            }
        }
    }

    &:active {
        transform: translateY(3px);
    }
`;