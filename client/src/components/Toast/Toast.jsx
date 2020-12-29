import React, {useState} from 'react'
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
    document.addEventListener('scroll',function(){
        if(toastMenuIsVisible){
            hideTheToast();
        }
    });

    const hideTheToast = () => {
        dispatch(showToastMenuState(false));
    }

    // ========== //
    //   RETURN   //
    // ========== //
    return (
        <StyledToast className="toast" showToastMenu={toastMenuIsVisible} onClick={hideTheToast} >
            <StyledShadowBox />
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
    height: 100vh;
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
    display: flex;
    justify-content: center;
    align-items: center;
    color: #2d3436;
    background-color: #fff;
    border-radius: .5em;
    min-width: 200px;
    min-height: 50px;
    max-width: calc(100vw - 1em);
    box-shadow: 1px 1px 8px #000;
    transform: translate(-50%, -90%);
    position: absolute;
    left: 50%;
    top: 50%;
    opacity: 0;
    transition: transform .3s, opacity .2s;
    user-select: none;
    font-size: 2em;
    padding: 1em;
    font-weight: 900;

    &.fadeIn {
        transform: translate(-50%, -50%);
        opacity: 1;
    }

`;