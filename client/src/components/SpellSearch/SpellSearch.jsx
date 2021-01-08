// ========== //
//   IMPORT   //
// ========== //
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { updateToastData, showToastMenuState } from "../../redux/actions"; // folder path may be different
import { svg_search } from '../../styles';
import { StyledChapter, StyledFrame, StyledToast, StyledWireFrame } from '../../styles/Styled';

// ============== //
//     EXPORT     //
// ============== //
export default function SpellSearch() {
    // ================= //
    //   HOOKS & REDUX   //
    // ================= //
    const dispatch = useDispatch();
    const [spellName, updateSpellName] = useState("");

    // ================ //
    //     Functions    //
    // ================ //
    const updateToastHandler = (data) => {
        const toastData = <StyledToast>{data}</StyledToast>

        // update state
        dispatch(updateToastData(toastData));
        dispatch(showToastMenuState(true));
    }

    const spellSearchHandler = () => {
        // STEP 1: Search
        // STEP 2: Call Toast With Data
        updateToastHandler(spellName);
    }

    // ========== //
    //   RETURN   //
    // ========== //
    return (
        <StyledChapter
            fontColor={props => props.theme.color.white}
            backgroundColor={props => props.theme.color.gold}
        >
            <StyledFrame>
                <h2>Spell Book</h2>

                <StyledWireFrame
                    frameColor={props => props.theme.color.white}
                    backgroundColor={props => props.theme.color.gold}
                >
                    <h3>Search Spell</h3>
                    <form>
                        <label htmlFor="search_spell">Search:</label>
                        <input onChange={(e) => updateSpellName(e.target.value)} value={spellName} type="text" name="search_spell" />
                        <div className="button" onClick={spellSearchHandler}>{svg_search}</div>
                    </form>
                </StyledWireFrame>

                <div className="block">
                    <h3>Title</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem veniam quo minima dolorem dicta exercitationem quia architecto fugiat, labore repellat.</p>
                </div>

            </StyledFrame>
        </StyledChapter>
    )
}