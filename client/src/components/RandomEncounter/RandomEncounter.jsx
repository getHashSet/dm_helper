// ========== //
//   IMPORT   //
// ========== //
import React, { useState } from "react";
import styled from "styled-components";
import Slider from "../_subcomponents/Slider/Slider";
import EnemyCard from "../_subcomponents/EnemyCard/EnemyCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showToastMenuState, updateToastData } from "../../redux/actions";
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
  const dispatch = useDispatch(); // used to send data back to redux
  const [userEncounterSelection, updateuserEncounterSelection] = useState("");
  const [partyLevel, updatepartyLevel] = useState("1");
  const [difficulty, updateDificulty] = useState(3);
  const [enemyEncounter, updateenemyEncounter] = useState({ desc: "", info: "", enemies: [] });
  const partyLevelMax = 10;
  const [inputeEnemies, updateinputeEnemies] = useState([]);
  const [searchInput, updatesearchInput] = useState("");
  const [enemyRoster, updateenemyRoster] = useState([]);
  const rollTables = [
    "Road",
    "Mountains",
    "Woods",
    "Town",
    "Underground",
    "Dungeon",
    "Friendly",
  ];

  // FORCE UPDATE COMPONENT
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  // ================ //
  //     Functions    //
  // ================ //
  const updateToastMenu = (str) => {
      const html = <StyledToast>
          {str}
      </StyledToast>
      dispatch(showToastMenuState(true)); // redux => state => is it visible "true or false"
      dispatch(updateToastData(html)); // default parent is a div with flex turned on.
  };

  const rollEnemyEncounter = (e) => {
    e.preventDefault();

    clearEnemyEncounter();

    // TODO: start load screen.

    const uriEncodedEnemies = [];

    if (inputeEnemies.length > 0) {
      inputeEnemies.forEach(enemyName => {
        uriEncodedEnemies.push(enemyName.trim().replace(/ /g, "-"));
      });
    }

    const POSTbody = {
      enemies: uriEncodedEnemies,
      location: +userEncounterSelection > 0 ? rollTables[+userEncounterSelection - 1].toLowerCase() : "Woods",
      cr: +partyLevel > 0 ? partyLevel : 1,
      mod: + difficulty - 3,
    }

    axios
      .post(`/api/encounter`, POSTbody)
      .then((data) => {
        updateenemyEncounter(data.data.encounter);
        console.log("Encounter");
        console.log(enemyEncounter);
      })
      .catch((err) => {
        console.log("There was an issue with the api call.");
        console.log(err);
      })
      .finally(() => {
        // TODO: remove load screen.
      });
  };

  const clearEnemyEncounter = () => {
    updateenemyEncounter({ description: "", info: "", enemies: [] });
    updatesearchInput("");
    updateinputeEnemies([]);
    forceUpdate();
    updateenemyRoster([]);
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

  const addEnemy = () => {

    if(searchInput === "") {return};
    
    // STEP 1: Check if the enemy you are adding is a real thing
    try {

      const cleanedSearchResult = searchInput.toLowerCase().trim().replace(/ /g, "-");

      axios.get(`https://www.dnd5eapi.co/api/monsters/${cleanedSearchResult}`)
      .then(enemyFromApi => {
        // console.log(enemyFromApi);
        // Step 1: update enemy roster.
        const newEnemyRoster = enemyRoster;
        newEnemyRoster.push(enemyFromApi.data);
        updateenemyRoster(newEnemyRoster);

        // Step 2: update the list we are going to send to the server.
        const newListOfEnemies = inputeEnemies;
        newListOfEnemies.push(cleanedSearchResult);
        updateinputeEnemies(newListOfEnemies);

        // Step 3: Clear input
        updatesearchInput("");
      }).catch(err => {
        updateToastMenu(<p>{`Unable to find ${searchInput} in our library.`}</p>); //todo add custom monster api
        return;
      });
    } catch (error) {
      updateToastMenu("Something has gone wrong.");
      return;
    };
  };

  const removeItemByIndex = (e) => {
    // Step 1: get index of the array
    const thisIndex = e.target.getAttribute("index"); // 3

    // Step 2: get the object from that part of the array
    const enemyToRemove = inputeEnemies[thisIndex]; // "enemy name"
    const displayedEnemyRoster = enemyRoster[thisIndex]; // <div>enemey</div>

    // Step 3: make a copy of the input enemy array
    const array = inputeEnemies; // ["enemy", "enemy-two"];
    const updatedEnemyRoster = enemyRoster;

    // Step 4: splice the array by the object
    const index = array.indexOf(enemyToRemove);
    if (index > -1) {
      array.splice(index, 1);
    };

    // Step 5: remove enemy from view also.
    const enemyIndex = updatedEnemyRoster.indexOf(displayedEnemyRoster);
    if (enemyIndex > -1) {
      updatedEnemyRoster.splice(enemyIndex, 1);
    };

    // log it
    console.log(`Removed ${enemyToRemove} from the api call`);

    // update State
    updateinputeEnemies(array);
    updateenemyRoster(updatedEnemyRoster);

    // refresh component
    forceUpdate();
  }

  const inputData = (e) => {

    if (e.key === "Enter") {
      addEnemy();
      forceUpdate();
    };

  }

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
            <p className="instructions">Already have an encounter in mind? Thats great! Just input each of the enemies name here and build your roster.</p>
            <div className="search">
              <label htmlFor="enemyName">Search</label>
              <input value={searchInput} onKeyDown={inputData} onChange={(e) => updatesearchInput(e.target.value)} type="search" name="enemyName" />
              <div className="add_enemy_button" onClick={addEnemy}><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" className="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg></div>
            </div>
          </StyledOptionBox>

          <StyledListOfEnemies>
            {enemyRoster.map((enemy, index) => {return <div className="enemy_list" key={index}>
                <div className="stat_info">
                  <h4>{enemy.name === undefined ? "Enemy" : enemy.name.charAt(0).toUpperCase()}{enemy.name.slice(1)}</h4>
                  {enemy.challenge_rating === undefined ? "0" : <p>Challenge Rating: {enemy.challenge_rating}</p>}
                  {enemy.hit_points === undefined ? null : <p>Average HP: {enemy.hit_points}</p>}
                  {enemy.armor_class === undefined ? null : <p>AC: {enemy.armor_class}</p>}
                </div>
                <div className="trash">
                  <p>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" className="svg-inline--fa fa-trash fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                      <path index={index} onClick={removeItemByIndex} fill="currentColor" d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path></svg>
                  </p>
                </div>
              </div>;})}
          </StyledListOfEnemies>

          <StyledButton onClick={rollEnemyEncounter}>
            Roll Encounter
          </StyledButton>
        </StyledFrame>
      </StyledSection>

      {/* BATTLE FIELD */}
      <StyledBattleField
        className={enemyEncounter.enemies.length > 0 ? "show" : "hide"}
      >
        <StyledFrame>
          <h2>Battle Field</h2>
          <p>{enemyEncounter.desc}</p>
          <p>{enemyEncounter.info}</p>
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
const StyledListOfEnemies = styled.section`

  .enemy_list {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid white;

    .stat_info {
      display: flex;
      padding: 0;

      h4 {
        min-width: 100px;
        font-weight: 900;
        padding: .2em .5em;
        border-right: 1px solid white;
        text-align: right;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }

      p {
        display: inline-block;
        padding: .2em .5em;
      }
    }

    &:first-child {
        border-top: 1px solid white;
      }

    .trash {
      border-left: 1px solid white;
      padding: .2em .5em;
      display: flex;
      justify-content: center;
      align-items: center;

        svg {
        width: 1em;
        max-width: 1em;
        max-height: 1em;

        &:hover {
          cursor: pointer;
        }

        &:active {
          transform: translateY(4px);
        }
      }
    }
  }

`;

const StyledSection = styled.section`
  padding: 1em 0.5em;
  background-color: #e74c3c;
  display: flex;
  justify-content: center;
  user-select: none;
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
    user-select: none;
  }

  svg {
    width: 1em;
    display: inline-block;
  }

  .instructions {
    font-style: italic;
    padding: .5em;
  }

  .search {
    display: flex;
    flex-wrap: wrap;
    padding: .5em;
    user-select: none;

    label {
      user-select: none;
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

    .add_enemy_button {
      &:hover {
        cursor: pointer;
      }

      &:active {
        transform: translateY(4px);
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
  user-select: none;

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
  user-select: none;

  p {
    margin: .5em 0;
    padding: 2px 0;
    max-width: 800px;
    font-family: 'Roboto Slab', serif;
  }

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
