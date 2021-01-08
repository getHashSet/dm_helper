import React from 'react';
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import { showToastMenuState, updateToastData } from "../../../redux/actions";
import { StyledToast } from '../../../styles/StyledElements';

// ========= //
//   PROPS   //
// ========= //

// ============= //
//   COMPONENT   //
// ============= //
export default function ActionPassive(props) {
    // =================== //
    //   HOOK INTO STATE   //
    // =================== //
    const dispatch = useDispatch(); // used to send data back to redux

    // ================ //
    //     Functions    //
    // ================ //
    const updateToastMenu = (str) => {
        const html = <div>{str}</div>
        dispatch(showToastMenuState(true)); // redux => state => is it visible "true or false"
        dispatch(updateToastData(html)); // default parent is a div with flex turned on.
    };

    const creatToastMessage = () => {
        const toastMsg = <StyledToast>{props.special_ability.desc}</StyledToast>;
        updateToastMenu(toastMsg);
    }

    // ========== //
    //   RETURN   //
    // ========== //
    return (
        <StyledAction>
            <div className="dice_box">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bookmark" className="svg-inline--fa fa-bookmark fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z"></path></svg>
            </div>
            <div className="info" onClick={creatToastMessage}>
                <div className="title">
                    {props.special_ability.name}
                </div>
                <div className="body">
                    <p>{props.special_ability.desc}</p>
                </div>
            </div>
        </StyledAction>
    )
}

// ========== //
//   STYLES   //
// ========== //
const StyledAction = styled.div`
    background-color: #fff;
    display: flex;
    margin: .5em;
    border-radius: 4px;
    border: 1px solid #bdc3c7;
    user-select: none;

    .dice_box {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        padding: .5em;
        width: 2em;
        overflow: hidden;
        user-select: none;
        background-color: #ccae62;
        color: #fff;

        svg {
            width: 1em;
            height: 1em;
            max-width: 100%;
            max-height: 100%;
        }
    }

    .info {
        background-color: #ccae62;
        width: 100%;

        .title {
            padding: 4px;
            font-size: 1.2em;
            font-weight: 700;
            color: #fff;
            background-color: #ccae62;
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
            background-color: #a68736;
        }

        .info {
            background-color: #a68736;

            .title {
                background-color: #a68736;
            }
        }
    }

    &:active {
        transform: translateY(3px);
    }
`;