// ========== //
//   IMPORT   //
// ========== //
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import Slider from '../_subcomponents/Slider/Slider';
import EnemyCard from '../_subcomponents/EnemyCard/EnemyCard';

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
    const dispatch: Function = useDispatch();

    // ================ //
    //     Functions    //
    // ================ //
    const encounterTableSelected = (e) => {
        console.log("USER: selected an encounter type of {}");
        e.preventDefault();
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

                    <StyledButton>Roll Initiative</StyledButton>

                </StyledFrame>
            </StyledSection>
            <StyledBattleField>
                <StyledFrame>
                    <h2>Battle Field</h2>
                    <StyledDeck>
                        <EnemyCard />
                    </StyledDeck>
                </StyledFrame>
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
    min-height: 30vh; // TODO remove min height from this.
    margin: 0;
    padding: 1em .5em;
    background-color: #fff;

    h2 {
        color: #2f3640;
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
    justify-content: center;
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