// ========== //
//   IMPORT   //
// ========== //
import React, { useState } from "react";
import styled from "styled-components";
// import { useDispatch } from "react-redux";
import Slider from "../_subcomponents/Slider/Slider";
import EnemyCard from "../_subcomponents/EnemyCard/EnemyCard";
import axios from "axios";

// ===================== //
//     DEFAULT PROPS     //
// ===================== //
RandomEncounter.defaultProps = {};

// ============== //
//     EXPORT     //
// ============== //
export default function RandomEncounter() {
  // =================== //
  //   HOOK INTO STATE   //
  // =================== //
  const [userEncounterSelection, updateuserEncounterSelection] = useState("");
  const [partyLevel, updatepartyLevel] = useState("1");
  const [difficulty, updateDificulty] = useState(3);
  const challengeRating = +partyLevel + +difficulty;
  const [enemyEncounter, updateenemyEncounter] = useState({ enemies: [] });
  // const dispatch = useDispatch();
  const partyLevelMax = 10;
  const rollTables = [
    "Mountains",
    "Forest",
    "on the Road",
    "City",
    "Underground",
    "Dungeon",
    "Friendly",
  ];
  const [inputeEnemies, updateinputeEnemies] = useState([]);

  // ================ //
  //     Functions    //
  // ================ //
  const rollEnemyEncounter = (e) => {
    e.preventDefault();
    // TODO: start load screen.
    console.log("Challenge table: " + challengeRating);

    axios
      .get(`/api/encounter?${challengeRating}`)
      .then((data) => {
        updateenemyEncounter(data.data.encounter);
        console.log(enemyEncounter);
      })
      .catch((err) => {
        console.log("There was an issue with the api call.");
      })
      .finally(() => {
        // TODO: remove load screen.
      });
  };

  const clearEnemyEncounter = () => {
    updateenemyEncounter({ enemies: [] });
  };

  const partyLevelButtons = () => {
    const renderThis = [];
    for (let i = 0; i < partyLevelMax; i++) {
      renderThis.push(
        <li
          key={i}
          className="numbers"
          onClick={partyLevelHandler}
          value={i + 1}
        >
          {i + 1}
        </li>
      );
    }

    return renderThis;
  };

  const encounterTableSelected = (e) => {
    e.preventDefault();
    updateuserEncounterSelection(e.target.value);
  };

  const partyLevelHandler = (e) => {
    updatepartyLevel(e.target.value);
  };

  // ========== //
  //   RETURN   //
  // ========== //
  return (
    <React.Fragment>
      <StyledSection>
        <StyledFrame>
          <h2>Random Encounter</h2>

          <StyledOptionBox partyLevel={partyLevel}>
            <h3>Party Level</h3>
            <ul>{partyLevelButtons()}</ul>
          </StyledOptionBox>

          <StyledOptionBox>
            <h3>Challenge Rating</h3>
            <Slider updateDificulty={updateDificulty} difficulty={difficulty} />
          </StyledOptionBox>

          <StyledOptionBox>
            <h3>Encounter Table</h3>
            <StyledFlexOptionsUL className="encounter_table" userEncounterSelection={userEncounterSelection}>
              {rollTables.map((location, index) => {
                return (
                  <li key={index} value={index + 1} onClick={encounterTableSelected}>
                    {location}
                  </li>
                );
              })}
            </StyledFlexOptionsUL>
          </StyledOptionBox>
          
          <StyledOptionBox>
            <h3>Custom Encounter</h3>
            <div className="search">
              <label htmlFor="enemyName">Search</label>
              <input type="search" name="enemyName"/>
              <div><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" className="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg></div>
            </div>
          </StyledOptionBox>

          <StyledButton onClick={rollEnemyEncounter}>
            Roll Initiative
          </StyledButton>
        </StyledFrame>
      </StyledSection>

      {/* BATTLE FIELD */}
      <StyledBattleField
        className={enemyEncounter.enemies.length > 0 ? "show" : "hide"}
      >
        <StyledFrame>
          <h2>Battle Field</h2>
          <StyledDeck>
            {enemyEncounter.enemies.map((enemy, index) => {
              return <EnemyCard key={index} enemy={enemy} />;
            })}
          </StyledDeck>
        </StyledFrame>
        <div className="end_battle" onClick={clearEnemyEncounter}>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="times"
            className="svg-inline--fa fa-times fa-w-11"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 352 512"
          >
            <path
              fill="currentColor"
              d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
            ></path>
          </svg>
        </div>
      </StyledBattleField>
    </React.Fragment>
  );
}

// ========= //
//   STYLE   //
// ========= //
const StyledSection = styled.section`
  padding: 1em 0.5em;
  background-color: #e74c3c;
  display: flex;
  justify-content: center;
`;

const StyledFlexOptionsUL = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  li {
    display: flex;
    flex-wrap: nowrap;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    width: 20vw;
    overflow: hidden;
    padding: 0.5em;
    margin: 2px;
    text-align: center;
    border: 1px solid #fff;
    font-weight: 700;
    opacity: .6;
    user-select: none;

    &:hover {
      cursor: pointer;
      opacity: 1;
    }

    &:active {
      transform: translateY(4px);
    }

    &:nth-child(${props => props.userEncounterSelection}) {
        opacity: 1;
        color: #e74c3c;
        background-color: #fff;
    }

    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;
const StyledOptionBox = styled.div`
  padding: 0.5em;

  h3 {
    padding-bottom: 0.5em;
    font-size: 1.5em;
    font-weight: 700;
    display: block;
    width: 100%;
  }

  svg {
    width: 1em;
    display: inline-block;
  }

  .search {
    display: flex;
    flex-wrap: wrap;
    padding: .5em;

    lable {

    }

    input {
      text-decoration: none;
      box-shadow: none;
      border: none;
      outline: none;
      padding: 0 .5em;
      margin: 0 .5em;
      min-width: 50vw;

      &:focus {
        outline: none;
      }
    }


  }

  ul {
    display: flex;
    flex-wrap: wrap;

    .numbers {
      width: 2em;
      height: 2em;
      border-radius: 0.5em;
      margin: 0.5em;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px solid #fff;
      font-weight: 900;
      opacity: .6;

      &:hover {
        cursor: pointer;
        opacity: 1;
      }

      &:active {
        transform: translateY(4px);
      }

      &:nth-child(${(props) => props.partyLevel}) {
        background-color: #fff;
        color: #c0392b;
        opacity: 1;
      }

      @media (max-width: 768px) {

      }
    }
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
`;
const StyledButton = styled.button`
  background: none;
  color: #fff;
  font-size: 1.5em;
  padding: 0.5em 1em;
  margin: 0.5em 0;
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

    @media (max-width: 768px) {
        width: 100%;
    }
`;

// ================ //
//   BATTLE FIELD   //
// ================ //
const StyledBattleField = styled.section`
  position: relative;
  margin: 0;
  max-height: 0px;
  color: #fff;
  background-color: #2d3436;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: max-height 2s ease-in;

  &.show {
    max-height: 5000px;
    padding: 1em 0.5em;
  }

  &.hide {
    max-height: 0px;
    transition: max-height 0s ease-out;
  }

  .end_battle {
    position: absolute;
    top: 0.5em;
    right: 0.5em;

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
    padding: 0.5em 0;

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
`;
