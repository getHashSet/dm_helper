import React, {useState} from 'react';
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import { showToastMenuState, updateToastData } from "../../../redux/actions";
import axios from 'axios';

// ============= //
//   COMPONENT   //
// ============= //
export default function ActionMagic(props) {
    // =================== //
    //   HOOK INTO STATE   //
    // =================== //
    const [spellData, updateSpellData] = useState({
        desc: "magic",
        name: "spell",
    });
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
        
        axios.get(`https://www.dnd5eapi.co${props.spell.url}`)
        .then(spellInfo => {
            console.log(spellInfo.data);
            const toastMsg = <StyledToast>{spellInfo.data.desc}</StyledToast>;
            updateToastMenu(toastMsg);
        });
    }

    // ========== //
    //   RETURN   //
    // ========== //
    return (
        <StyledAction>
            <div className="dice_box">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="book" className="svg-inline--fa fa-book fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z"></path></svg>
            </div>
            <div className="info" onClick={creatToastMessage}>
                <div className="title">
                    {props.spell.name}
                </div>
                <div className="body">
                    <p>{props.spell.level > 0 ? `Click to learn more about this level ${props.spell.level} spell.` : `Click to learn more about this cantrip.`}</p>
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
    /* background-image: linear-gradient(#6D214F, #b33939); */
    background-color: #6D214F;

    .dice_box {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        padding: .5em;
        width: 2em;
        overflow: hidden;
        user-select: none;
        /* background-color: #9b59b6; */
        color: #fff;

        svg {
            width: 1em;
            height: 1em;
            max-width: 100%;
            max-height: 100%;
        }
    }

    .info {
        /* background-image: linear-gradient(red, yellow); */
        width: 100%;

        .title {
            padding: 4px;
            font-size: 1.2em;
            font-weight: 700;
            color: #fff;
            /* background-color: #9b59b6; */
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
            /* background-color: #a68736; */
        }

        .info {
            /* background-color: #a68736; */

            .title {
                /* background-color: #a68736; */
            }
        }
    }

    &:active {
        transform: translateY(3px);
    }
`; 

const StyledToast = styled.p`
    font-size: 20px;
    font-weight: 300;
    font-family: 'Roboto Slab', serif;
    line-height: 1.2em;
`;