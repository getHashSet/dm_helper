import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from "react-redux";

export default function User() {
    // ========= //
    //   HOOKS   //
    // ========= //
    const [userNameState, updateUserNameState] = useState("");
    const [userPasswordState, updateUserPasswordState] = useState("");
    const dispatch = useDispatch();

    // ================ //
    //     Functions    //
    // ================ //
    return (
        <StyledUser>
            <h2>User Login Menu</h2>
        </StyledUser>
    )
}

const StyledUser = styled.section`

`;
