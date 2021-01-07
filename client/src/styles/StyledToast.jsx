// ================ //
//   INSTRUCTIONS   //
// ================ //
/*
STEP 1: Import the following into your component.
import StyledToast from "../../styles/StyledToast"; // folder path may be different
import { useDispatch } from "react-redux";
import { updateToastData, showToastMenuState } from "../../redux/actions"; // folder path may be different
import Footer from "../../components/Footer/Footer"; // folder path may be different

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

    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: ${props => props.theme.font.title};
        font-weight: 900;
    }

    h2 {
        font-size: 2em;
    }

    h3 {
        font-size: 1.5em;
    }

    h4 {
        font-size: 1.2em;
    }

    h5 {
        font-size: 1em;
    }

    h6 {
        font-size: .8em;
    }

    section {
        padding: 1em;
    }

    @media (max-width: ${props => props.theme.breakpoint.mobile}) {
        width: calc(100vw - 1em);
    }
`;