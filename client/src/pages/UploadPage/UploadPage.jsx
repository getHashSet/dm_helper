import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function UploadPage() {
  // HOOKS
  const [passwordField, updatePasswordField] = useState("");
  const [locationField, updateLocationField] = useState("error");
  const [enemyField, updateEnemyField] = useState("");
  const [enemyArray, updateEnemyArray] = useState([]);
  const [infoField, updateInfoField] = useState("");
  const [descField, updateDescField] = useState("");
  const [crField, updateCrField] = useState("5");
  const [listOfApiEnemies, updateListOfApiEnemies] = useState([]);
  const [cr, updateCr] = useState(0);

  // =============== //
  //    FUNCTIONS    //
  // =============== //
  const submitEncounter = () => {

    const POSTrequest = {
      password: passwordField,
      encounter: {
        enemies: enemyArray,
        info: infoField,
        desc: descField,
        cr: crField,
        location: locationField.toLowerCase(),
      }
    }

    if ( passwordField.length < 1
      || enemyArray.length < 1
      || descField === ""
      || +crField < 0
      || locationField === "error"
    ) {
      console.log("BAD DATA");
      console.log(POSTrequest);
      return;
    } else {
      // edgecase: all friendly encounters are level 1
      if (POSTrequest.location === "friendly") {
        POSTrequest = 1;
      }

      console.log(POSTrequest);

      // datas good. send it.
      console.log("Good data");
      console.log(POSTrequest);

      axios.post("/api/encounters/upload", POSTrequest)
      .then(data => {
        // console.log(data.msg);
        resetFields();
      })
      .catch(err => {
        console.log(
          err.msg
        );
      })
    };
  };

  const addEnemy = () => {

    let cleanedSearchResult = enemyField.toLowerCase().trim().replace(/ /g, "-");

    switch (cleanedSearchResult) {
      case "dragon":
        cleanedSearchResult = "adult-red-dragon";
        break;
      case "black-dragon":
        cleanedSearchResult = "adult-black-dragon";
        break;
      case "red-dragon":
        cleanedSearchResult = "adult-red-dragon";
        break;
      case "blue-dragon":
        cleanedSearchResult = "adult-blue-dragon";
        break;
      case "green-dragon":
        cleanedSearchResult = "adult-gree-dragon";
        break;
      case "white-dragon":
        cleanedSearchResult = "adult-white-dragon";
        break;
      default:
        break;
    }

    axios.get(`https://www.dnd5eapi.co/api/monsters/${cleanedSearchResult}`)
    .then(enemyApi => {
      
      if (enemyApi.data.name !== undefined) {
        const cleanedEnemies = listOfApiEnemies;
        cleanedEnemies.push(enemyApi.data);
        updateListOfApiEnemies(cleanedEnemies);
        updateEnemyField("");
  
        // UPDATE CR
        const newCr = +cr + +enemyApi.data.challenge_rating;
        updateCr(newCr);
        
        const newListOfEnemies = enemyArray;
        newListOfEnemies.push(cleanedSearchResult);
        updateEnemyArray(newListOfEnemies);
      } 

      return;

    }).catch(err => {
      console.log(`Unable to find ${enemyField} in our library.`);
      return;
    });
  }

  const resetFields = () => {
    updateLocationField("error");
    updateEnemyField("");
    updateEnemyArray([]);
    updateInfoField("");
    updateDescField("");
    updateCrField("0");
    updateCr(0);
    updateListOfApiEnemies([]);
  };

  const submitToEnemyList = (e) => {
    if (e.key === "Enter") { addEnemy() };
  }

  const removeEnemy = (e) => {
    const thisIndex = e.target.getAttribute('index');
    const thisCr = e.target.getAttribute('cr');

    const newEnemyArray = enemyArray;
    const newListOfApiEnemies = listOfApiEnemies;
    const newCr = +cr - thisCr;

    newEnemyArray.splice(thisIndex, 1);
    newListOfApiEnemies.splice(thisIndex, 1);

    updateCr(newCr);
    updateEnemyArray(newEnemyArray);
    updateListOfApiEnemies(newListOfApiEnemies);    

    return;
  }

  // ========== //
  //   RETURN   //
  // ========== //
  return (
    <StyledMain>
      <StyledUploadForm>
        <h2>Authentication Token</h2>
        <div className="block">
          <label htmlFor="token">Token:</label>
          <input
            name="token"
            value={passwordField}
            type="text"
            onChange={(e) => updatePasswordField(e.target.value)}
          />
        </div>
      </StyledUploadForm>

      <StyledUploadForm className="rumor">
        <h2>Rumor</h2>
        <div className="block">
          <label htmlFor="rumor">Add A Rumor:</label>
          <textarea className="rumor" name="rumor" type="text" />
        </div>

        <div className="block">
          <div className="button">Submit Rumor</div>
        </div>
      </StyledUploadForm>

      <StyledUploadForm className="encounter">
        <h2>Encounter</h2>
        
        <div className="block">
          <div className="button" onClick={resetFields}>CLEAR</div>
        </div>

        <div className="block">
          <label htmlFor="enemies">Enemies:</label>
          <input type="text" name="enemies" value={enemyField} onKeyDown={submitToEnemyList} onChange={(e) => updateEnemyField(e.target.value)}/>
          <div className="add_button" onClick={addEnemy}>Add Enemy</div>

          <div>
            <label>Total CR: {cr}</label>
            <p>Enemy List:</p>
            <ul className="enemy_party">{listOfApiEnemies.map((enemy, index) => {
              return <li key={index}>
                <h4>{enemy.name}</h4>
                <p><span>cr:</span> {enemy.challenge_rating}</p>
                <p>
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" className="svg-inline--fa fa-trash fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path cr={enemy.challenge_rating} index={index} onClick={removeEnemy} fill="currentColor" d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path></svg>
                </p>
                </li>
            })}</ul>
          </div>
        </div>

        <div className="block">
          <label htmlFor="cr">Recommended Party Level:</label>
            <select name="cr" onChange={(e) => {updateCrField(e.target.value)}}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
      
        <div className="block">
          <label htmlFor="desc">Encounter Description:</label>
          <textarea value={descField} name="desc"cols="30" rows="10" onChange={(e) => {updateDescField(e.target.value)}}></textarea>
        </div>
        
        <div className="block">
          <label htmlFor="info">DM Notes:</label>
          <textarea value={infoField} type="text" name="info" onChange={(e) => updateInfoField(e.target.value)} />
        </div>

        <div className="block">
          <label htmlFor="location">Encounter Location</label>
          <select type="text" name="location" onChange={(e) => {updateLocationField(e.target.value)}}>
            <option value="error">select a location</option>
            <option value="woods">The Woods</option>
            <option value="mountains">Mountains</option>
            <option value="dungeon">Dungeon</option>
            <option value="friendly">Friendly</option>
            <option value="town">Town</option>
            <option value="underground">Underground</option>
          </select>
        </div>

        <div className="block">
          <div className="button" onClick={submitEncounter}>Submit Encounter</div>
        </div>

      </StyledUploadForm>
    </StyledMain>
  );
}

const StyledMain = styled.main`
  padding: 0.5em;
  background-color: #dfe6e9;
`;

const StyledUploadForm = styled.section`
  color: #4b6584;
  max-width: 800px;
  margin: 1em auto 2em;
  background-color: #fff;
  border-radius: .5em;
  box-shadow: 0 1px 4px #333;

  h2 {
    font-size: 2em;
    font-weight: 900;
    margin: .5em;
    padding: .5em 0;
  }

  label {
    margin-top: .5em;
  }

  input {
    width: calc(100% - .5em);
  }

  textarea {
    width: calc(100% - .5em);
    max-width: calc(100% - .5em);
  }

  select {
    min-width: 200px;
    margin: 0 8px;
  }

  svg {
    width: 1em;
    height: 1em;
    max-width: 1em;
    max-height: 1em;
  }

  .block {
    display: block;
    padding: 1em;
    margin: .5em 0;
    overflow: hidden;

    .enemy_party {
      display: flex;
      flex-wrap: wrap;

      li {
          display: flex;
          padding: 4px;
          margin: 4px 4px 4px 0;
          border: 1px solid #d1d8e0;
        
        h4 {
          font-weight: 900;
          padding-right: .5em;
          border-right: 1px solid #d1d8e0;
        }

        p {
          padding: 0 .5em;

          span {
            font-weight: 900;
          }
        }
      }
    }

    &:nth-child(even) {
      border-bottom: 1px solid #d1d8e0;
      border-top: 1px solid #d1d8e0;
      background-color: #f1f2f6;
    }
  }

  .add_button {
    padding: .5em;
    margin: .5em 0;
    width: fit-content;
    user-select: none;
    background-color: #3498db;
    color: #fff;
    font-weight: 900;

    &:hover {
      cursor: pointer;
      background-color: #2980b9;
    }

    &:active {
        transform: translateY(4px);
    }
  }

  .button {
    background-color: #e74c3c;
    color: #fff;
    font-weight: 900;
    padding: .5em;
    margin: .5em 0;
    width: fit-content;
    user-select: none;
    text-transform: uppercase;

    &:hover {
      cursor: pointer;
      background-color: #c0392b;
    }

    &:active {
        transform: translateY(4px);
    }
  }
`;
