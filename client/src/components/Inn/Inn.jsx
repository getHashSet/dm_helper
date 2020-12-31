import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import { showToastMenuState, updateToastData } from "../../redux/actions";

Inn.defaultProps = {}

export default function Inn() {
    // =================== //
    //   HOOK INTO STATE   //
    // =================== //
    const [tavernName, updatetavernName] = useState("The Happy Hag");
    const dispatch: Function = useDispatch();

    // ================ //
    //     Functions    //
    // ================ //
    const updateToastMenu = (str) => {
        const tempValue = <StyledToast>
            <p>{str}</p>
        </StyledToast>
        dispatch(showToastMenuState(true)); // redux => state => is it visible "true or false"
        dispatch(updateToastData(tempValue)); // default parent is a div with flex turned on.
    }

    const getRandomRumor = (e) => {
        e.preventDefault();
        updateToastMenu(`Random Rumor on a chart with length being the max value. ${Math.floor(Math.random() * 200)}`);
    }

    const refreshTavern = (e) => {
        e.preventDefault();
        tavernName === "The Happy Hag" ? updatetavernName("Stuffit Inn & Pub") : updatetavernName("The Happy Hag");
    }

    return (
        <StyledSection>
            <StyledFrame>
                <h2>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="beer" className="svg-inline--fa fa-beer fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M368 96h-48V56c0-13.255-10.745-24-24-24H24C10.745 32 0 42.745 0 56v400c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24v-42.11l80.606-35.977C429.396 365.063 448 336.388 448 304.86V176c0-44.112-35.888-80-80-80zm16 208.86a16.018 16.018 0 0 1-9.479 14.611L320 343.805V160h48c8.822 0 16 7.178 16 16v128.86zM208 384c-8.836 0-16-7.164-16-16V144c0-8.836 7.164-16 16-16s16 7.164 16 16v224c0 8.836-7.164 16-16 16zm-96 0c-8.836 0-16-7.164-16-16V144c0-8.836 7.164-16 16-16s16 7.164 16 16v224c0 8.836-7.164 16-16 16z"></path></svg>
                    The Tavern
                </h2>
                <StyledTavernMenu>
                    <h3>{tavernName}</h3>
                    <p>How many employees?</p>
                    <p>Tavern Employee [name, race, mood]</p>
                    <p>How many patrons? [1d4, 2d4, 3d4, 4d4]</p>
                    <p>Menu</p>
                    <p>Room Cost</p>
                </StyledTavernMenu>

                <StyledButton onClick={getRandomRumor}>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="dice-d20" className="svg-inline--fa fa-dice-d20 fa-w-15" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 512"><path fill="currentColor" d="M106.75 215.06L1.2 370.95c-3.08 5 .1 11.5 5.93 12.14l208.26 22.07-108.64-190.1zM7.41 315.43L82.7 193.08 6.06 147.1c-2.67-1.6-6.06.32-6.06 3.43v162.81c0 4.03 5.29 5.53 7.41 2.09zM18.25 423.6l194.4 87.66c5.3 2.45 11.35-1.43 11.35-7.26v-65.67l-203.55-22.3c-4.45-.5-6.23 5.59-2.2 7.57zm81.22-257.78L179.4 22.88c4.34-7.06-3.59-15.25-10.78-11.14L17.81 110.35c-2.47 1.62-2.39 5.26.13 6.78l81.53 48.69zM240 176h109.21L253.63 7.62C250.5 2.54 245.25 0 240 0s-10.5 2.54-13.63 7.62L130.79 176H240zm233.94-28.9l-76.64 45.99 75.29 122.35c2.11 3.44 7.41 1.94 7.41-2.1V150.53c0-3.11-3.39-5.03-6.06-3.43zm-93.41 18.72l81.53-48.7c2.53-1.52 2.6-5.16.13-6.78l-150.81-98.6c-7.19-4.11-15.12 4.08-10.78 11.14l79.93 142.94zm79.02 250.21L256 438.32v65.67c0 5.84 6.05 9.71 11.35 7.26l194.4-87.66c4.03-1.97 2.25-8.06-2.2-7.56zm-86.3-200.97l-108.63 190.1 208.26-22.07c5.83-.65 9.01-7.14 5.93-12.14L373.25 215.06zM240 208H139.57L240 383.75 340.43 208H240z"></path></svg>
                    <span>Random Rumor</span>
                </StyledButton>

                <StyledRefresh onClick={refreshTavern} title="Refresh Tavern">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sync-alt" className="svg-inline--fa fa-sync-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z"></path></svg>
                </StyledRefresh>

            </StyledFrame>
        </StyledSection>
    )
}

const StyledTavernMenu = styled.section`
    h3 {
        font-weight: 900;
        font-size: 1.5em;
        padding: .5em 0;
    }
`;

const StyledFrame = styled.div`
    position: relative;
    width: 100%;
    max-width: 1200px;
    color: #34495e;

    h2 {
        font-size: 2em;
        font-weight: 800;
        margin-bottom: 1em;
        user-select: none;

        svg {
            height: 1em;
            max-height: 1em;
            max-height: 1em;
            padding: 0 .5em 0 0;
            margin-bottom: -4px;
        }
    }
`;

const StyledRefresh = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    color: #34495e;

    svg {
        width: 1em;
        transition: transform 1s;

        &:hover {
            cursor: pointer;
            transform: rotate(360deg)
        }
    }

    &:active {
        transform: translateY(4px);
    }
`;

const StyledSection = styled.section`
    padding: 1em .5em;
    display: flex;
    justify-content: center;
    background-color: #ecf0f1;
`;

const StyledButton = styled.button`
    background: #2ecc71;
    color: #fff;
    font-size: 1.5em;
    padding: .5em 1em;
    margin: .5em 0;
    border-radius: 2em;
    border: 1px solid #fff;
    text-transform: uppercase;
    font-weight: 900;

    svg {
        width: 1em;
        padding: 0 .5em;
        margin-bottom: -2px;
    }

    span {
        padding-right: .5em;
    }

    &:hover {
        cursor: pointer;
        background-color: #27ae60;
        border: 1px solid #27ae60;
        color: #fff;
    }

    &:active {
        transform: translateY(4px);
    }

    &:focus {
        outline: none;
    }
`;

const StyledToast = styled.section`
    font-weight: 400;
    font-size: 16px;
    text-align: center;

    p {
        padding: .5em 0;

        i {
            font-style: italic;
        }

        span {
            font-weight: 600;
        }
    }

    h4 {
        font-weight: 600;
        font-size: 1.5em;
    }
`;