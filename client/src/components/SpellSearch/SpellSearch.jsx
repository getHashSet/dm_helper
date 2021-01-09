// ========== //
//   IMPORT   //
// ========== //
import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { updateToastData, showToastMenuState } from "../../redux/actions"; // folder path may be different
import { svg_search } from '../../styles';
import * as S from '../../styles/StyledElements';
import SpellCard from '../_subcomponents/SpellCard/SpellCard';
import axios from 'axios';

// ============== //
//     EXPORT     //
// ============== //
export default function SpellSearch() {
    // ================= //
    //   HOOKS & REDUX   //
    // ================= //
    const dispatch = useDispatch();
    const [spellNameField, updateSpellNameField] = useState("");
    const [spellList, updateSpellList] = useState(null);

    // ================ //
    //     Functions    //
    // ================ //
    const updateToastHandler = (jsx) => {
        dispatch(updateToastData(jsx));
        dispatch(showToastMenuState(true));
    }

    const spellSearchHandler = (name = spellNameField) => {
        const api = 'https://www.dnd5eapi.co/api/spells/';
        const spellName = name.replace(/ /g, "-").toLowerCase().trim();
        axios.get(`${api}${spellName}`)
            .then(spell => {
                updateToastHandler(<S.Toast><SpellCard spell={spell.data} /></S.Toast>)
            })
            .catch(err => {
                console.log(err);
                updateToastHandler(`Unable to find ${spellName} in our spellbook`);
            });
    }

    const callSpellSearchHandler = (e) => {
        if (e.key === "Enter") { 
            e.preventDefault();
            spellSearchHandler();
        };
    };
    
    const sellectedSpellHandler = (e) => {
        spellSearchHandler(e.target.value);
    } 

    // ================= //
    //   REACT EFFECTS   //
    // ================= //
    useEffect(() => {
        axios.get("https://www.dnd5eapi.co/api/spells/")
        .then(spellList => {
            updateSpellList(spellList.data.results);
        }, [])
        .catch(err => {
            console.log(err);
        });
    }, []);

    // ========== //
    //   RETURN   //
    // ========== //
    return (
        <S.Chapter fontColor={props => props.theme.color.white} backgroundColor={props => props.theme.color.gold} >
            <S.Frame>
                <h2>Spell Book</h2>

                <S.WireFrame
                    frameColor={props => props.theme.color.white}
                    backgroundColor={props => props.theme.color.gold}
                >
                    <h3>Search Spell</h3>
                    <form onKeyDown={callSpellSearchHandler}>
                        <label htmlFor="search_spell">Search:</label>
                        <input onChange={(e) => updateSpellNameField(e.target.value)} value={spellNameField} type="text" name="search_spell" />
                        <div className="button" onClick={spellSearchHandler}>{svg_search}</div>
                    </form>
                </S.WireFrame>

                <S.Box>
                    <h3>Spells</h3>
                    <select name="spell_list" onChange={sellectedSpellHandler}>
                        {spellList === null ? <option>select one</option> : spellList.map(spell => {
                            return <option key={spell.index} value={spell.index}>{spell.name}</option>
                        })}
                    </select>
                </S.Box>

            </S.Frame>
        </S.Chapter>
    )
}