// ========== //
//   IMPORT   //
// ========== //
import React, { useState } from "react";
import styled from "styled-components";
import Slider from "../_subcomponents/Slider/Slider";
import EnemyCard from "../_subcomponents/EnemyCard/EnemyCard";
import axios from "axios";
import StyledToast from "../../styles/StyledToast";
import { useDispatch } from "react-redux";
import { showToastMenuState, updateToastData } from "../../redux/actions";
import { svg_plus, svg_trash } from '../../styles';
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
  const updateToastHandler = data => {
    const toastData =
      <StyledToast>
        <section>
          {data}
        </section>
      </StyledToast>;
    dispatch(updateToastData(toastData));
    dispatch(showToastMenuState(true));
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

    if (searchInput === "") { return };

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
          updateToastHandler(`Unable to find ${searchInput} in our library.`); //todo add custom monster api
          return;
        });
    } catch (error) {
      updateToastHandler("OOPS!Something has gone wrong.");
      return;
    };
  };

  const removeItemByIndex = (e) => {

    // Step 1: get index of the array
    let thisIndex;

    // check 3 levels deep, theres got to be a better way of doing this.
    if (e.target.getAttribute("index") !== null) { thisIndex = e.target.getAttribute("index") }
    else if (e.target.parentElement.getAttribute("index") !== null) { thisIndex = e.target.parentElement.getAttribute("index") }
    else if (e.target.parentElement.parentElement.getAttribute("index") !== null) { thisIndex = e.target.parentElement.parentElement.getAttribute("index") }

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
      <StyledSection className="chapter">
        <StyledFrame className="frame">
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
              <div className="clickable" onClick={addEnemy}>{svg_plus}</div>
            </div>
          </StyledOptionBox>

          <StyledListOfEnemies>
            {enemyRoster.map((enemy, index) => {
              return <div className="enemy_list" key={index}>
                <div className="enemy_name">
                  <h4>{enemy.name === undefined ? "Enemy" : enemy.name.charAt(0).toUpperCase()}{enemy.name.slice(1)}</h4>
                </div>
                <div className="stat_info">
                  {enemy.challenge_rating === undefined ? "0" : <p>CR {enemy.challenge_rating}</p>}
                  {enemy.hit_points === undefined ? null : <p>HP {enemy.hit_points}</p>}
                  {enemy.armor_class === undefined ? null : <p>AC {enemy.armor_class}</p>}
                </div>
                <div className="trash">
                  <p className="clickable" index={index} onClick={removeItemByIndex} >
                    {svg_trash}
                  </p>
                </div>
              </div>;
            })}
          </StyledListOfEnemies>

          <StyledButton onClick={rollEnemyEncounter}>
            Roll Encounter
          </StyledButton>
        </StyledFrame>
      </StyledSection>

      {/* BATTLE FIELD */}
      <StyledBattleField className={`chapter ${enemyEncounter.enemies.length > 0 ? "show" : "hide"}`} >
        <StyledFrame className="frame">
          <h2>Battle Field</h2>
          <div className="block">
            <h3>Description</h3>
            <p>{enemyEncounter.desc}</p>
          </div>
          <div className="wire_block">
            <h3>DM Notes</h3>
            <p>{enemyEncounter.info}</p>
          </div>
          <StyledDeck>
            {enemyEncounter.enemies.map((enemy, index) => {
              return <EnemyCard key={index} enemy={enemy} />;
            })}
          </StyledDeck>
        </StyledFrame>
        <div className="end_battle clickable" onClick={clearEnemyEncounter}>
          {svg_trash}
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

    .enemy_name {
      flex-grow: 1;
      border-right: 1px solid white;

      h4 {
        flex-grow: 2;
        min-width: 15vw;
        font-weight: 900;
        padding: .2em .5em;
        text-align: right;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }

    .stat_info {
      width: 50%;
      display: flex;
      align-items: center;
      padding: 0;

      p {
        display: inline-block;
        padding: .2em .5em;
      }
    }

    .trash {
      min-width: 20%;
      flex-grow: 1;
      font-size: 1em;
      border-left: 1px solid white;
      padding: .2em .5em;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &:first-child {
      border-top: 1px solid white;
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
  color: #fff;

  .wire_block {
    margin-left: .5em;
    margin-right: .5em;
    max-width: 800px;
    border: 1px solid white;

    h3 {
      font-size: 1em;
      border: 1px solid white;
      background-color: ${props => props.theme.color.dark};
    }
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
    font-family: 'Roboto Slab', serif;
  }

  &.show {
    max-height: 5000px;
    padding: 1em 0.5em;
  }

  &.hide {
    max-height: 0px;
    transition: max-height 0s ease-out;
    visibility: hidden;
  }

  .end_battle {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
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
// const StyledToast = styled.section`
//   font-weight: 400;
//   font-size: 16px;
//   text-align: center;
//   color: #2d3436;
//   background-color: #fff;
//   padding: .5em;

//   p {
//     padding: 0.5em 0;

//     i {
//       font-style: italic;
//     }

//     span {
//       font-weight: 600;
//     }
//   }

//   h4 {
//     font-weight: 600;
//     font-size: 1.5em;
//   }
// `;
