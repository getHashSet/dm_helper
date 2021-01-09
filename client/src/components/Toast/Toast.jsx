import React from 'react'
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { showToastMenuState } from "../../redux/actions";

Toast.defaultProps = {};

export default function Toast(props) {
    // =================== //
    //   HOOK INTO STATE   //
    // =================== //
    const dispatch = useDispatch();
    const toastMenuIsVisible = useSelector(state => state.showToastMenu);
    const toastData = useSelector(state => state.currentToastData);

    // ================ //
    //     Functions    //
    // ================ //
    const hideTheToast = () => {
        dispatch(showToastMenuState(false));
    }

    // ========== //
    //   RETURN   //
    // ========== //
    return (
        <StyledToast className="toast" showToastMenu={toastMenuIsVisible}>
            <StyledShadowBox onClick={hideTheToast} />
            <StyledToastBox className={toastMenuIsVisible ? "fadeIn" : "no_class"}>
                <React.Fragment>
                    {toastData}
                </React.Fragment>
            </StyledToastBox>
        </StyledToast>
    )
}

// ============== //
//   TOAST MENU   //
// ============== //
const StyledToast = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100vw;
    height: 90vh;
    margin: 0;
    padding: 0;
    z-index: ${props => props.showToastMenu ? "9000" : "-1"};
    visibility: ${props => props.showToastMenu ? "visible" : "hidden"};
    overflow: hidden;
`;

const StyledShadowBox = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0, .6);

    &:hover {
        cursor: pointer;
    }
`;

const StyledToastBox = styled.div`
    min-width: 150px;
    max-width: calc(100vw);
    min-height: 1em;
    max-height: 70vh;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    border-radius: .5em;
    box-shadow: 1px 1px 8px #000;
    opacity: 0;
    transition: transform .3s, opacity .2s;
    transform: translateY(-30%);
    user-select: none;

    &.fadeIn {
        transform: translateY(0);
        opacity: 1;
    }

`;
