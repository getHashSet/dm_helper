// ================ //
//   INSTRUCTIONS   //
// ================ //
/*
STEP 1: Import the following into your component.
import StyledToast from "../../styles/StyledToast"; // folder path may be different
import { useDispatch } from "react-redux";
import { updateToastData, showToastMenuState } from "../../redux/actions"; // folder path may be different

// dipendencey on Nav Menu else you need to import Toast into the app.

STEP 2: Add dispatch to a variable
const dispatch = useDispatch();

STEP 3: Add Update Function
// ========= //
//   TOAST   //
// ========= //
const updateToastHandler = (data) => {
const toastData =

    // ======= //
    //   JSX   //
    // ======= //
    <StyledToast>
        <section>
            {data}
        </section>
    </StyledToast>

// ============== //
//   CALL TOAST   //
// ============== //
dispatch(updateToastData(toastData));
dispatch(showToastMenuState(true));
}

// SHORT VERISON //
const updateToastHandler = data => {
    const toastData = <StyledToast>{data}</StyledToast>;
    dispatch(updateToastData(toastData));
    dispatch(showToastMenuState(true));
};

Example Use:
<div onClick={updateToastHandler}> Click Me! </div>
*/

import React from 'react';
import styled from 'styled-components';

export default function StyledToas(props) {
    return (
        <StyledToastTag>
            {props.children}
        </StyledToastTag>
    )
}

const StyledToastTag = styled.article`
    font-size: 16px;
    font-weight: 400;
    font-family: ${props => props.theme.font.body};
    background-color: ${props => props.theme.color.white};
    color: ${props => props.theme.color.text};
    width: 100%;
    max-width: ${props => props.theme.max.width};

    section {
        padding: 1em;
    }

    //   DiceRolls   //
    .dice_rolls {
        font-size: 1.5em; // make larger

        p {
            width: 100%;
            margin-bottom: 1em;
            text-align: center;
        }

        h3 {
            text-align: center;
            font-size: 2em;
            padding: 0 0 .5em 0;
            margin: .3em 0;
            border-bottom: 1px solid #bdc3c7;
        }

        h4 {
            padding: .5em .5em 1em .5em;
            font-weight: 600;
            text-align: center;
            border-bottom: 1px solid #bdc3c7;
        }

        .overflow {
            height: 0px;
            max-height: 50vh;
            overflow-y: auto;
            overflow-x: hidden;
            padding: 0 .5;
            margin: .5;

            div {
                text-align: center;
                display: flex;
                flex-wrap: nowrap;
                width: 100%;
                border-bottom: 1px solid #bdc3c7;

                .the_roll {
                    text-align: center;
                    border-left: 1px solid #bdc3c7;
                }
            }

            span {
                font-weight: 200;
                font-style: italic;
                font-size: .8em;
                color: #34495e;
            }

            p {
                display: block;
                font-weight: 400;
                font-size: .5em;
                padding: .2em;
                margin: 0;
                text-align: center;
            }

            &.expand {
                height: auto;
            }

            &::-webkit-scrollbar {
                width: 5px;
                height: 80%;
                background-color: rgba(255, 255, 255, 0.6);
            }
            
            &::-webkit-scrollbar-track {
                background-color: #bdc3c7;
            }
            
            &::-webkit-scrollbar-thumb {
                background-color: #7f8c8d;
            }
        }
    }

    @media (max-width: ${props => props.theme.breakpoint.mobile}) {
        width: calc(100vw - 1em);
    }
`;