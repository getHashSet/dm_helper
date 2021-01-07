import React, { useState } from 'react';
import styled from 'styled-components';
import StyledToast from "../../styles/StyledToast"; // folder path may be different
import { useDispatch } from "react-redux";
import { updateToastData, showToastMenuState } from "../../redux/actions"; // folder path may be different

export default function SpellSearch() {
    //   HOOKS  //
    const dispatch = useDispatch();
    const [spellName, updateSpellName] = useState("");

    //   FUNCTIONS   //
    const updateToastHandler = (data) => {
        const toastData = <StyledToast>{data}</StyledToast>

        // update state
        dispatch(updateToastData(toastData));
        dispatch(showToastMenuState(true));
    }

    const spellSearchHandler = (e) => {
        e.preventDefault();
        // STEP 1: Search
        // STEP 2: Call Toast With Data
        updateToastHandler(spellName);
    }

    //   RETURN   //
    return (
        <StyledSpellSearch>
            <h2>Spell Book</h2>

            <form>
                <label htmlFor="search_spell">Search:</label>
                <input onChange={(e) => updateSpellName(e.target.value)} value={spellName} type="text" name="search_spell" />
                <button onClick={spellSearchHandler}>Search Emoji</button>
            </form>
        </StyledSpellSearch>
    )
}

//   STYLES   //
const StyledSpellSearch = styled.section`

`;