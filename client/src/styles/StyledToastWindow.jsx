// ================ //
//   INSTRUCTIONS   //
// ================ //
/*
STEP 1: Import the following into your component.
import StyledToastWindow from "../../styles/StyledToastWindow"; // folder path may be different
import { useDispatch } from "react-redux";
import { updateToastData, showToastMenuState } from "../../redux/actions"; // folder path may be different
import Footer from "../../components/Footer/Footer"; // folder path may be different

STEP 2: Add dispatch to a variable
const dispatch = useDispatch();

STEP 3: Add Update Function
// ========= //
//   TOAST   //
// ========= //
const updateToastHandler = () => {
const toastData =

    // ======= //
    //   JSX   //
    // ======= //
    <StyledToastWindow>
    <h4>Title</h4>
    <section>
        <p>Body</p>
    </section>
    </StyledToastWindow>

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

export default function StyledToastWindow(props) {
    return (
        <StyledToastTag>
            {props.children}
        </StyledToastTag>
    )
}

const StyledToastTag = styled.article`
    background-color: ${props => props.theme.color.white};
    color: ${props => props.theme.color.dark};
    width: 100%;
`;