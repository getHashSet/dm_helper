import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import { showToastMenuState, updateToastData } from "../../redux/actions";
import axios from 'axios';
import StyledToast from "../../styles/StyledToast"; // folder path may be different
import { svg_d20, svg_npc, svg_refresh } from "../../styles";


export default function Npc() {
    // =================== //
    //   HOOK INTO STATE   //
    // =================== //
    const dispatch = useDispatch();

    // ================ //
    //     Functions    //
    // ================ //
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
                const toast = <p>{data.data.name}, {data.data.desc}</p>;
                updateToastHandler(toast)
                updateNpc(data.data);
            }).catch(err => {
                // do nothin
            });
    }


    // HOOK //
    const [npc, updateNpc] = useState(createNPC);

    // ========== //
    //   RETURN   //
    // ========== //
    return (
        <StyledSection>
            <StyledFrame>
                <h2>
                    {svg_npc}NPC Generator
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
                    {svg_d20}
                    <span>Pick Pocket</span>
                </StyledButton>

                <StyledRefresh onClick={() => { updateToastHandler("Refreshed NPC") }} title="Refresh Shop">
                    {svg_refresh}
                </StyledRefresh>

            </StyledFrame>
        </StyledSection>
    )
}

// ========= //
//   STYLE   //
// ========= //
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

const StyledRefresh = styled.div`
  position: absolute;
  top: 1em;
  right: 1em;
  color: ${props => props.theme.color.dark};

  @media (max-width: 768px) {
    svg {
      transition: transform 0;

      &:hover {
        transform: none;
      }
    }
  }
`;