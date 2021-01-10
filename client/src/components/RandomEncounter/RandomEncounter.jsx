// ========== //
//   IMPORT   //
// ========== //
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Slider from "../_subcomponents/Slider/Slider";
import EnemyCard from "../_subcomponents/EnemyCard/EnemyCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showToastMenuState, updateToastData } from "../../redux/actions";
import { svg_plus, svg_trash } from '../../styles';
import * as S from '../../styles/StyledElements';

// ============== //
//     EXPORT     //
// ============== //
export default function RandomEncounter() {
  // ================= //
  //   HOOKS & REDUX   //
  // ================= //
  const dispatch = useDispatch(); // used to send data back to redux
  const [userEncounterSelection, updateuserEncounterSelection] = useState("");
  const [partyLevel, updatepartyLevel] = useState(1);
  const [difficulty, updateDificulty] = useState(3);
  const [enemyEncounter, updateenemyEncounter] = useState({ desc: "", info: "", enemies: [] });
  const [inputeEnemies, updateinputeEnemies] = useState([]);
  const [searchInput, updatesearchInput] = useState("");
  const [enemyRoster, updateenemyRoster] = useState([]);
  const [enemyLookup, updateEnemyLookup] = useState([]);
  const [selectedEnemyLookup, updateSelectedEnemyLookup] = useState();
  const partyLevelMax = 10;
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
  const [, updateState] = useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  // ================ //
  //     Functions    //
  // ================ //
  const updateToastHandler = jsx => {
    const toastData = <S.Toast>{jsx}</S.Toast>;
    dispatch(updateToastData(toastData));
    dispatch(showToastMenuState(true));
  };

  const rollEnemyEncounter = () => {
    console.log(partyLevel);

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
        const enemies = data.data.encounter.enemies;
        console.log(enemies)
        updateenemyEncounter(data.data.encounter);
      })
      .catch((err) => {
        console.log("There was an issue with the api call.");
      })
      .finally(() => {
        // TODO: remove load screen.
      });
  };

  const clearEnemyEncounter = () => {
    updateenemyEncounter({ description: "", info: "", enemies: [] });
    updatesearchInput("");
    updateinputeEnemies([]);
    // forceUpdate();
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
    if (partyLevel === e.target.value) {
      return;
    };
    const newLevel = e.target.value;
    updatepartyLevel(+newLevel);
    console.log('updated party level to ' + newLevel);
    axios.get(`https://www.dnd5eapi.co/api/monsters?challenge_rating=${newLevel}`)
    .then(enemyLookup => {
        updateEnemyLookup(enemyLookup.data.results);
    }, [])
    .catch(err => {
        console.log(err);
    });
  };

  const addEnemy = (enemy = searchInput) => {
    if (enemy === "") { return };
    
    // STEP 1: Check if the enemy you are adding is a real thing
    try {
      
      const cleanedSearchResult = enemy.toLowerCase().trim().replace(/ /g, "-");
      
      axios.get(`https://www.dnd5eapi.co/api/monsters/${cleanedSearchResult}`)
        .then(enemyFromApi => {

          const enemy = enemyFromApi.data;
          
          // Step 1: update enemy roster.
          const newEnemyRoster = enemyRoster;
          newEnemyRoster.push(enemy);
          updateenemyRoster(newEnemyRoster);

          // Step 2: update the list we are going to send to the server.
          const newListOfEnemies = inputeEnemies;
          newListOfEnemies.push(cleanedSearchResult);
          updateinputeEnemies(newListOfEnemies);

          // Step 3: Clear input
          updatesearchInput("");
          forceUpdate();
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
    // forceUpdate();
  }

  const inputData = (e) => {

    if (e.key === "Enter") {
      addEnemy();
      // forceUpdate();
    };

  }

  const enemyLookupAddHandler = () => {
    addEnemy(selectedEnemyLookup);
  }

  // ================= //
  //   REACT EFFECTS   //
  // ================= //
  useEffect(() => {
    console.log('looking for enemies');
    axios.get(`https://www.dnd5eapi.co/api/monsters?challenge_rating=${partyLevel}`)
    .then(enemyLookup => {
        updateEnemyLookup(enemyLookup.data.results);
    })
    .catch(err => {
        console.log(err);
    });
  }, []);

  // ========== //
  //   RETURN   //
  // ========== //
  return (
    <React.Fragment>
      <S.Chapter backgroundColor={props => props.theme.color.red} fontColor={props => props.theme.color.white}>
        <S.Frame>
          <h2>Random Encounter</h2>

          <S.Box partyLevel={partyLevel}>
            <h3>Party Level</h3>
            <ul>{partyLevelButtons()}</ul>
          </S.Box>

          <S.Box>
            <h3>Challenge Rating</h3>
            <Slider updateDificulty={updateDificulty} difficulty={difficulty} />
          </S.Box>

          <S.Box>
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
          </S.Box>

          <S.Box>
            <h3>Custom Encounter</h3>
            <p className="instructions">Already have an encounter in mind? Thats great! Just input each of the enemies name here and build your roster.</p>
            <div className="search">
              <label htmlFor="enemyName">Search</label>
              <input value={searchInput} onKeyDown={inputData} onChange={(e) => updatesearchInput(e.target.value)} type="search" name="enemyName" />
              <div className="clickable" onClick={addEnemy}>{svg_plus}</div>
            </div>
          </S.Box>

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

          <S.Box>
            <h4>Enemy Lookup by Party Level: </h4>
            <S.Box>
              <select name="enemyLookup" onChange={e => updateSelectedEnemyLookup(e.target.value)}>
                {!enemyLookup ? "" : enemyLookup.map(enemy => {
                  return <option key={enemy.index} value={enemy.index}>{enemy.name}</option>
                })}
              </select>
            </S.Box>
            <S.Button wire backgroundColor="white" onClick={enemyLookupAddHandler}>Add Enemy</S.Button>
          </S.Box>

          <StyledButton onClick={rollEnemyEncounter}>
            Roll Encounter
          </StyledButton>
        </S.Frame>
      </S.Chapter>

      {/* BATTLE FIELD */}
      <StyledBattleField className={`chapter ${enemyEncounter.enemies.length > 0 ? "show" : "hide"}`} >
        <S.Frame>
          <h2>Battle Field</h2>
          <div className="block">
            <h3>Description</h3>
            <p>{enemyEncounter.desc}</p>
          </div>
          <S.WireFrame>
            <h3>DM Notes</h3>
            <p>{enemyEncounter.info}</p>
          </S.WireFrame>
          <StyledDeck>
            {enemyEncounter.enemies.map((enemy, index) => {
              return <EnemyCard key={index} enemy={enemy} />;
            })}
          </StyledDeck>
        </S.Frame>
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
