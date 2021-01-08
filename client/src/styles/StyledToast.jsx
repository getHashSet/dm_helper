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
        <div>
            {props.children}
        </div>
    )
}