// ========== //
//   IMPORT   //
// ========== //
import React, { useState } from 'react';
import styled from 'styled-components';
import StyledToast from "../../styles/StyledToast"; // folder path may be different
import { useDispatch } from "react-redux";
import { updateToastData, showToastMenuState } from "../../redux/actions"; // folder path may be different
import { svg_search } from '../../styles';

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
        <StyledRoot className="chapter">
            <div className="frame">
                <h2>Spell Book</h2>

                <div className="wire_block">
                    <h3>Search Spell</h3>
                    <form>
                        <label htmlFor="search_spell">Search:</label>
                        <input onChange={(e) => updateSpellName(e.target.value)} value={spellName} type="text" name="search_spell" />
                        <div className="button" onClick={spellSearchHandler}>{svg_search}</div>
                    </form>
                </div>

                <div className="block">
                    <h3>Title</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem veniam quo minima dolorem dicta exercitationem quia architecto fugiat, labore repellat.</p>
                </div>

            </div>
        </StyledRoot>
    )
}

// ========= //
//   STYLE   //
// ========= //
const StyledRoot = styled.section`
    background-color: ${props => props.theme.color.gold};
    color: white;

    .wire_block {
        border: 1px solid white;
        max-width: 800px;

        h3 {
            background-color: ${props => props.theme.color.gold};
            border: 1px solid white;
        }
    }

    form {
        margin: .5em 0;
        display:flex;
        align-items: center;
        font-family: ${props => props.theme.font.body};

        label {
            padding-right: .5em;
        }

        input {
            height: 2.4em;
            flex-grow: 1;
            border: 1px solid white;
            border-radius: 4px 0 0 4px;

            &:focus {
                outline: none;
            }
        }

        .button {
            color: white;
            border: 1px solid white;
            border-radius: 0 4px 4px 0;
            padding: .5em;

            &:hover {
                cursor: pointer;
            }

            &:active svg {
                transform: translateY(4px);
            }
        }
    }
`;