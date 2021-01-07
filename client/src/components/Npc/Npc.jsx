import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import { showToastMenuState, updateToastData } from "../../redux/actions";
import axios from 'axios';

export default function Npc() {
    // =================== //
    //   HOOK INTO STATE   //
    // =================== //
    const dispatch = useDispatch();

    // ================ //
    //     Functions    //
    // ================ //
    const updateToastMenu = (str) => {
        const tempValue = <StyledToast>
            {str}
        </StyledToast>
        dispatch(showToastMenuState(true)); // redux => state => is it visible "true or false"
        dispatch(updateToastData(tempValue)); // default parent is a div with flex turned on.
    }

    const createNPC = {
        desc: "",
        name: "",
        passivePerception: "",
        weapon: "",
        coin: "",
        item: "",
      };

      const updateNPC = () => {
        axios.get("/api/npc")
        .then(data => {
          const toast =  <p>{data.data.name}, {data.data.desc}</p>;
          updateToastMenu(toast);
          updateNpc(data.data);
        }).catch(err => {
          // do nothin
        });
      }


      // HOOK //
    const [ npc, updateNpc ] = useState(createNPC);

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
                <div className="desc">Returns a randomly generated NPC description.</div>
                <div>
                    <p>Name: {npc.name}</p>
                    <p>Description: {npc.desc}</p>
                    <p>Side Pouch: {npc.coin}</p>
                    <p>Other Items: {npc.item}</p>
                    <p>Equip: {npc.weapon}</p>
                    <p>Passive Perception: {npc.passivePerception}</p>
                </div>
                <StyledButton onClick={updateNPC}>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="dice-d20" className="svg-inline--fa fa-dice-d20 fa-w-15" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 512"><path fill="currentColor" d="M106.75 215.06L1.2 370.95c-3.08 5 .1 11.5 5.93 12.14l208.26 22.07-108.64-190.1zM7.41 315.43L82.7 193.08 6.06 147.1c-2.67-1.6-6.06.32-6.06 3.43v162.81c0 4.03 5.29 5.53 7.41 2.09zM18.25 423.6l194.4 87.66c5.3 2.45 11.35-1.43 11.35-7.26v-65.67l-203.55-22.3c-4.45-.5-6.23 5.59-2.2 7.57zm81.22-257.78L179.4 22.88c4.34-7.06-3.59-15.25-10.78-11.14L17.81 110.35c-2.47 1.62-2.39 5.26.13 6.78l81.53 48.69zM240 176h109.21L253.63 7.62C250.5 2.54 245.25 0 240 0s-10.5 2.54-13.63 7.62L130.79 176H240zm233.94-28.9l-76.64 45.99 75.29 122.35c2.11 3.44 7.41 1.94 7.41-2.1V150.53c0-3.11-3.39-5.03-6.06-3.43zm-93.41 18.72l81.53-48.7c2.53-1.52 2.6-5.16.13-6.78l-150.81-98.6c-7.19-4.11-15.12 4.08-10.78 11.14l79.93 142.94zm79.02 250.21L256 438.32v65.67c0 5.84 6.05 9.71 11.35 7.26l194.4-87.66c4.03-1.97 2.25-8.06-2.2-7.56zm-86.3-200.97l-108.63 190.1 208.26-22.07c5.83-.65 9.01-7.14 5.93-12.14L373.25 215.06zM240 208H139.57L240 383.75 340.43 208H240z"></path></svg>
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

    .desc {
        font-style: italic;
        padding-bottom: .5em;
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

// ======= //
//   NPC   //
// ======= //
const StyledNpc = styled.div`

`;

// ========= //
//   TOAST   //
// ========= //
const StyledToast = styled.section`
    font-weight: 400;
    font-size: 16px;
    text-align: center;
    color: #2d3436;
    background-color: #fff;
    padding: .5em;

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