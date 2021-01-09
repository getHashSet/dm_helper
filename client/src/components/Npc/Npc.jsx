import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import { showToastMenuState, updateToastData } from "../../redux/actions";
import axios from 'axios';
import { svg_npc, svg_refresh } from "../../styles";
import { StyledChapter, StyledToast, StyledRefresh } from '../../styles/StyledElements';


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

    const updateNpcHandler = () => {
        axios.get("/api/npc")
            .then(data => {
                const toast = <p>{data.data.name}</p>;
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
        <StyledChapter>
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
                    <p>Story:</p>
                    <p>Passive Perception: {npc.passivePerception}</p>
                </div>

                <StyledRefresh onClick={updateNpcHandler}>
                    {svg_refresh}
                </StyledRefresh>

            </StyledFrame>
        </StyledChapter>
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