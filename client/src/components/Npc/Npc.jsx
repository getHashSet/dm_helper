import React from 'react';
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import { showToastMenuState, updateToastData } from "../../redux/actions";

Npc.defaultProps = {}

export default function Npc() {
    // =================== //
    //   HOOK INTO STATE   //
    // =================== //
    // const [userEncounterSelection, updateuserEncounterSelection] = useState("");
    const dispatch = useDispatch();

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

    const createNPC = (e) => {
        e.preventDefault();
        updateToastMenu("Names Dibs");
        console.log(`Random Rumor on a chart with length being the max value. ${Math.floor(Math.random() * 200)}`);
    }

    // ========== //
    //   RETURN   //
    // ========== //
    return (
        <StyledSection>
            <StyledFrame>
                <h2>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="child" className="svg-inline--fa fa-child fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M120 72c0-39.765 32.235-72 72-72s72 32.235 72 72c0 39.764-32.235 72-72 72s-72-32.236-72-72zm254.627 1.373c-12.496-12.497-32.758-12.497-45.254 0L242.745 160H141.254L54.627 73.373c-12.496-12.497-32.758-12.497-45.254 0-12.497 12.497-12.497 32.758 0 45.255L104 213.254V480c0 17.673 14.327 32 32 32h16c17.673 0 32-14.327 32-32V368h16v112c0 17.673 14.327 32 32 32h16c17.673 0 32-14.327 32-32V213.254l94.627-94.627c12.497-12.497 12.497-32.757 0-45.254z"></path></svg>
                    NPC Generator
                </h2>
                <div>
                    <p>Name</p>
                    <p>Race</p>
                    <p>characteristic</p>
                    <p>Mood</p>
                    <p>Weapon</p>
                    <p>Items on Person</p>
                    <p>Gold On Person</p>
                    <p>Passive Perception (between 8 and 15)</p>
                    <p>flaw</p>
                </div>
                <StyledButton onClick={createNPC}>
                    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="id-card" className="svg-inline--fa fa-id-card fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm0 400H303.2c.9-4.5.8 3.6.8-22.4 0-31.8-30.1-57.6-67.2-57.6-10.8 0-18.7 8-44.8 8-26.9 0-33.4-8-44.8-8-37.1 0-67.2 25.8-67.2 57.6 0 26-.2 17.9.8 22.4H48V144h480v288zm-168-80h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8zm0-64h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8zm0-64h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8zm-168 96c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64z"></path></svg>
                    <span>Roll NPC</span>
                </StyledButton>
            </StyledFrame>
        </StyledSection>
    )
}

// ========= //
//   STYLE   //
// ========= //
const StyledFrame = styled.div`
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

const StyledSection = styled.section`
    padding: 1em .5em;
    display: flex;
    justify-content: center;
`;

const StyledButton = styled.button`
    background: #e67e22;
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
        background-color: #f39c12;
        border: 1px solid #f39c12;
        color: #fff;
    }

    &:active {
        transform: translateY(4px);
    }

    &:focus {
        outline: none;
    }
`;

// ========= //
//   TOAST   //
// ========= //
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
`