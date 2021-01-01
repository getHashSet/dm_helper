// ========== //
//   IMPORT   //
// ========== //
import React, { useState } from 'react';
import styled from 'styled-components';
// import { useDispatch } from "react-redux";
import Slider from '../_subcomponents/Slider/Slider';
import EnemyCard from '../_subcomponents/EnemyCard/EnemyCard';
import axios from 'axios';

// ===================== //
//     DEFAULT PROPS     //
// ===================== //
RandomEncounter.defaultProps = {}

// ============== //
//     EXPORT     //
// ============== //
export default function RandomEncounter() {
    // =================== //
    //   HOOK INTO STATE   //
    // =================== //
    const [userEncounterSelection, updateuserEncounterSelection] = useState("");
    const [partyLevel, updatepartyLevel] = useState("1");
    const [difficulty, updateDificulty] = useState("0");
    const challengeRating = +partyLevel + +difficulty;
    const [enemyEncounter, updateenemyEncounter] = useState({enemies: []});
    // const dispatch = useDispatch();

    // ================ //
    //     Functions    //
    // ================ //
    const encounterTableSelected = (e) => {
        console.log("USER: selected an encounter type of {}");
        e.preventDefault();
    };

    const rollEnemyEncounter = (e) => {
        e.preventDefault();
        // TODO: start load screen.
        console.log("Rolling enemy encounter");

        axios.get("/api/encounter")
        .then((data) => {
            updateenemyEncounter(data.data.encounter);
            console.log(enemyEncounter);
        })
        .catch(err => {
            console.log('There was an issue with the api call.');
        })
        .finally(() => {
            // TODO: remove load screen.
            console.log('Got encounter.');
        });
    }

    const clearEnemyEncounter = () => {
        updateenemyEncounter({enemies: []});
    };

    // ========== //
    //   RETURN   //
    // ========== //
    return (
        <React.Fragment>
            <StyledSection>
                <StyledFrame>

                    <h2>Random Encounter</h2>

                    <StyledOptionBox>
                        <h3>Party Level</h3>
                    </StyledOptionBox>

                    <StyledOptionBox>
                        <h3>Challenge Rating</h3>
                        <Slider/>
                    </StyledOptionBox>

                    <StyledOptionBox>
                        <h3>Encounter Table</h3>
                        <StyledFlexOptionsUL className="encounter_table">
                            <li onClick={encounterTableSelected}>Mountain</li>
                            <li>Forest</li>
                            <li>Clearing</li>
                            <li>City</li>
                            <li>Underground</li>
                        </StyledFlexOptionsUL>
                    </StyledOptionBox>

                    <StyledButton onClick={rollEnemyEncounter}>Roll Initiative</StyledButton>

                </StyledFrame>
            </StyledSection>

            {/* BATTLE FIELD */}
            <StyledBattleField className={enemyEncounter.enemies.length > 0 ? "show" : "hide"}>
                <StyledFrame>
                    <h2>Battle Field</h2>
                    <StyledDeck>
                        {enemyEncounter.enemies.map((enemy, index) => {
                            return<EnemyCard key={index} enemy={enemy} />
                        })}
                    </StyledDeck>
                </StyledFrame>
                <div className="end_battle" onClick={clearEnemyEncounter}>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" className="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
                </div>
            </StyledBattleField>
        </React.Fragment>
    )
}

// ========= //
//   STYLE   //
// ========= //
const StyledSection = styled.section`
    padding: 1em .5em;
    background-color: #e74c3c;
    display: flex;
    justify-content: center;
`;

const StyledFlexOptionsUL = styled.ul`
    display: flex;

    li {
        padding: .5em;

        &:hover {
            cursor: pointer;
            font-weight: 700;
        }

        &:active {
            transform: translateY(4px);
        }

        &.selected {
            font-weight: 900;
        }
    }
`;
const StyledOptionBox = styled.div`
    padding: .5em;

    h3 {
        padding-bottom: .5em;
        font-size: 1.5em;
        font-weight: 700;
        display: block;
        width: 100%;
    }
`;
const StyledFrame = styled.div`
    width: 100%;
    max-width: 1200px;
    color: #fff;

    h2 {
        font-size: 2em;
        font-weight: 800;
    }
`
const StyledButton = styled.button`
    background: none;
    color: #fff;
    font-size: 1.5em;
    padding: .5em 1em;
    margin: .5em 0;
    border-radius: 2em;
    border: 1px solid #fff;
    text-transform: uppercase;
    font-weight: 900;

    &:hover {
        cursor: pointer;
        background-color: #c0392b;
        transform: translateY(2px);
    }

    &:active {
        transform: translateY(4px);
    }

    &:focus {
        outline: none;
    }
`;

// ================ //
//   BATTLE FIELD   //
// ================ //
const StyledBattleField = styled.section`
    position: relative;
    margin: 0;
    max-height: 0px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    transition: max-height 2s ease-in;

    h2 {
        color: #2f3640;
    }

    &.show {
        max-height: 5000px;
        padding: 1em .5em;
    }

    &.hide {
        max-height: 0px;
        transition: max-height 0s ease-out;
    }

    .end_battle {
        position: absolute;
        top: .5em;
        right: .5em;
        color: black;

        svg {
            width: 1em;
        }

        &:hover {
            cursor: pointer;
        }

        &:active {
            transform: translateY(4px);
        }
    }
`;

// ======== //
//   DECK   //
// ======== //
const StyledDeck = styled.section`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    margin: 0;
    padding: 0;
`;

// ======== //
//   CARD   //
// ======== //
// See sub components for card styling.

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