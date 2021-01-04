import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import { showToastMenuState, updateToastData } from "../../redux/actions";

export default function Menu() {
    // =================== //
    //   HOOK INTO STATE   //
    // =================== //
    const dispatch = useDispatch(); // used to send data back to redux

    // ================ //
    //     Functions    //
    // ================ //
    const updateToastMenu = (str) => {
        const html = <StyledToast>
            <h4>{str}</h4>
        </StyledToast>
        dispatch(showToastMenuState(true)); // redux => state => is it visible "true or false"
        dispatch(updateToastData(html)); // default parent is a div with flex turned on.
    };

    const d20 = () => {
        let d20 = Math.floor(Math.random() * 20) + 1;
        updateToastMenu(d20);
    };

    return (
        <StyledNav>
            <ul>
                <li>
                    <Link to="/dm">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="dungeon" className="svg-inline--fa fa-dungeon fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M128.73 195.32l-82.81-51.76c-8.04-5.02-18.99-2.17-22.93 6.45A254.19 254.19 0 0 0 .54 239.28C-.05 248.37 7.59 256 16.69 256h97.13c7.96 0 14.08-6.25 15.01-14.16 1.09-9.33 3.24-18.33 6.24-26.94 2.56-7.34.25-15.46-6.34-19.58zM319.03 8C298.86 2.82 277.77 0 256 0s-42.86 2.82-63.03 8c-9.17 2.35-13.91 12.6-10.39 21.39l37.47 104.03A16.003 16.003 0 0 0 235.1 144h41.8c6.75 0 12.77-4.23 15.05-10.58l37.47-104.03c3.52-8.79-1.22-19.03-10.39-21.39zM112 288H16c-8.84 0-16 7.16-16 16v64c0 8.84 7.16 16 16 16h96c8.84 0 16-7.16 16-16v-64c0-8.84-7.16-16-16-16zm0 128H16c-8.84 0-16 7.16-16 16v64c0 8.84 7.16 16 16 16h96c8.84 0 16-7.16 16-16v-64c0-8.84-7.16-16-16-16zm77.31-283.67l-36.32-90.8c-3.53-8.83-14.13-12.99-22.42-8.31a257.308 257.308 0 0 0-71.61 59.89c-6.06 7.32-3.85 18.48 4.22 23.52l82.93 51.83c6.51 4.07 14.66 2.62 20.11-2.79 5.18-5.15 10.79-9.85 16.79-14.05 6.28-4.41 9.15-12.17 6.3-19.29zM398.18 256h97.13c9.1 0 16.74-7.63 16.15-16.72a254.135 254.135 0 0 0-22.45-89.27c-3.94-8.62-14.89-11.47-22.93-6.45l-82.81 51.76c-6.59 4.12-8.9 12.24-6.34 19.58 3.01 8.61 5.15 17.62 6.24 26.94.93 7.91 7.05 14.16 15.01 14.16zm54.85-162.89a257.308 257.308 0 0 0-71.61-59.89c-8.28-4.68-18.88-.52-22.42 8.31l-36.32 90.8c-2.85 7.12.02 14.88 6.3 19.28 6 4.2 11.61 8.9 16.79 14.05 5.44 5.41 13.6 6.86 20.11 2.79l82.93-51.83c8.07-5.03 10.29-16.19 4.22-23.51zM496 288h-96c-8.84 0-16 7.16-16 16v64c0 8.84 7.16 16 16 16h96c8.84 0 16-7.16 16-16v-64c0-8.84-7.16-16-16-16zm0 128h-96c-8.84 0-16 7.16-16 16v64c0 8.84 7.16 16 16 16h96c8.84 0 16-7.16 16-16v-64c0-8.84-7.16-16-16-16zM240 177.62V472c0 4.42 3.58 8 8 8h16c4.42 0 8-3.58 8-8V177.62c-5.23-.89-10.52-1.62-16-1.62s-10.77.73-16 1.62zm-64 41.51V472c0 4.42 3.58 8 8 8h16c4.42 0 8-3.58 8-8V189.36c-12.78 7.45-23.84 17.47-32 29.77zm128-29.77V472c0 4.42 3.58 8 8 8h16c4.42 0 8-3.58 8-8V219.13c-8.16-12.3-19.22-22.32-32-29.77z"></path></svg>
                    </Link>
                </li>
                <li onClick={d20}>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="dice-d20" className="svg-inline--fa fa-dice-d20 fa-w-15" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 512"><path fill="currentColor" d="M106.75 215.06L1.2 370.95c-3.08 5 .1 11.5 5.93 12.14l208.26 22.07-108.64-190.1zM7.41 315.43L82.7 193.08 6.06 147.1c-2.67-1.6-6.06.32-6.06 3.43v162.81c0 4.03 5.29 5.53 7.41 2.09zM18.25 423.6l194.4 87.66c5.3 2.45 11.35-1.43 11.35-7.26v-65.67l-203.55-22.3c-4.45-.5-6.23 5.59-2.2 7.57zm81.22-257.78L179.4 22.88c4.34-7.06-3.59-15.25-10.78-11.14L17.81 110.35c-2.47 1.62-2.39 5.26.13 6.78l81.53 48.69zM240 176h109.21L253.63 7.62C250.5 2.54 245.25 0 240 0s-10.5 2.54-13.63 7.62L130.79 176H240zm233.94-28.9l-76.64 45.99 75.29 122.35c2.11 3.44 7.41 1.94 7.41-2.1V150.53c0-3.11-3.39-5.03-6.06-3.43zm-93.41 18.72l81.53-48.7c2.53-1.52 2.6-5.16.13-6.78l-150.81-98.6c-7.19-4.11-15.12 4.08-10.78 11.14l79.93 142.94zm79.02 250.21L256 438.32v65.67c0 5.84 6.05 9.71 11.35 7.26l194.4-87.66c4.03-1.97 2.25-8.06-2.2-7.56zm-86.3-200.97l-108.63 190.1 208.26-22.07c5.83-.65 9.01-7.14 5.93-12.14L373.25 215.06zM240 208H139.57L240 383.75 340.43 208H240z"></path></svg>
                </li>
                <li>
                    <Link to="/pc">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" className="svg-inline--fa fa-users fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path></svg>
                    </Link>
                </li>
            </ul>
        </StyledNav>
    )
}

const StyledNav = styled.nav`
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    flex-wrap: nowrap;
    z-index: 9000;
    /* opacity: .8;
    transform: translateY(2em);
    transition: opacity .2s, transform .2s;

    &:hover {
        opacity: 1;
        transform: translateY(0);

        ul {
            opacity: 1;
        }
    }

    @media (max-width: 768px) {
        opacity: 1;
        transform: none;

        ul {
            opacity: 1;
        }
    } */

    border-top: 1px solid rgba(255,255,255,.3);
    background: linear-gradient(#2c3e50, #2d3436);

    ul {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 8px;
        padding-bottom: 12px;
        font-size: 2em;
        width: 100%;

        li {
            color: #fff;
            user-select: none;

            svg {
                width: 1em;
                color: #fff;
            }

            &:hover {
                cursor: pointer;
            }
        }
    }
`;


// ========= //
//   TOAST   //
// ========= //
const StyledToast = styled.section`
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    color: #2d3436;

    h4 {
        padding: 1em;
        font-weight: 900;
        font-size: 3em;
    }

    .heading {
        width: 100%;
        padding: .5em 0 .3em 0;
        font-weight: 400;
        font-size: .8em;
        color: #7f8c8d;
    }

    .roll { //div
        display: flex;
        margin: 0;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        border-top: 1px solid #bdc3c7;

        p {
            width: 50%;
            padding: .3em;
            display: flex;
            flex-grow: 1;
            justify-content: center;
            align-items: center;

            &:first-child {
                border-right: 1px solid #bdc3c7;
                font-weight: 400;

                span {
                    padding-right: .5em;
                    font-size: .8em;
                    font-style: italic;
                    color: #7f8c8d;
                }
            }
        }
    }

    .formula {
        padding: 1em;
        border: 1px solid #bdc3c7;
        font-weight: 400;
        font-style: italic;

        span {
            font-weight: 600;
            font-style: normal;
        }

        &.selectedRoll {
            opacity: .5;
        }
    }

    .hit_dice {
        &:last-child {
            border-top: none;
        }
    }

    .totals {
        font-weight: 400;
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        border-radius: 8px 8px 0 0;
        border: 1px solid #bdc3c7;
        border-bottom: none;

        p {
            display: flex;
            flex-grow: 1;
            justify-content: center;
            align-items: center;
            padding: .5em;
            margin-bottom: 0;
            width: 50%;

            span {
                font-weight: 600;
                padding: 0 .2em;
            }

            &:first-child {
                border-right: 1px solid #bdc3c7;
            }
        }
    }
`;
