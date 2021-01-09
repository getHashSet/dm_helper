import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { showToastMenuState, updateToastData } from "../../redux/actions";
import axios from 'axios';
import { svg_npc, svg_refresh } from "../../styles";
import * as S from '../../styles/StyledElements';

export default function Npc() {
    // ================ //
    //   HOOKS PART 1   //
    // ================ //
    const dispatch = useDispatch();

    // ================ //
    //     Functions    //
    // ================ //
    const updateToastHandler = (data) => {
        const toastData =
            <S.Toast>
                <section>
                    {data}
                </section>
            </S.Toast>
        dispatch(updateToastData(toastData));
        dispatch(showToastMenuState(true));
    }

    const createNpcHandler = {
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
                updateNpc(data.data);
            }).catch(err => {
                console.log(err);
                updateToastHandler("Unable to connect to server. Please try again.");
            });
    }

    // ================ //
    //   HOOKS PART 2   //
    // ================ //
    const [npc, updateNpc] = useState(createNpcHandler);

    // ========== //
    //   RETURN   //
    // ========== //
    return (
        <S.Chapter>
            <S.Frame>
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
                    <p>Perks &amp; Flaws:</p>
                    <p>Passive Perception: {npc.passivePerception}</p>
                </div>

                <S.Refresh onClick={updateNpcHandler}>
                    {svg_refresh}
                </S.Refresh>

            </S.Frame>
        </S.Chapter>
    )
}