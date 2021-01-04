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

    const cleanedSearchResult = enemyField.toLowerCase().trim().replace(/ /g, "-");

    axios.get(`https://www.dnd5eapi.co/api/monsters/${cleanedSearchResult}`)
    .then(data => {
      const newListOfEnemies = enemyArray;
      newListOfEnemies.push(cleanedSearchResult);
      updateEnemyArray(newListOfEnemies);
      updateEnemyField("");

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
  };

  return (
    <StyledMain>
      <h1>hello world</h1>
      <StyledUploadForm>
        <h2>Password</h2>
        <input
          value={passwordField}
          type="text"
          onChange={(e) => updatePasswordField(e.target.value)}
        />
      </StyledUploadForm>

      <StyledUploadForm className="rumor">
        <h2>Rumor</h2>
        <input className="rumor" type="text" />
        <div className="button">Submit Rumor</div>
      </StyledUploadForm>

      <StyledUploadForm className="encounter">
        <h2>Encounter</h2>
        
        <label htmlFor="enemies">Enemies:</label>
        <input type="text" name="enemies" value={enemyField} onChange={(e) => updateEnemyField(e.target.value)}/>
        <div className="add_button" onClick={addEnemy}>Add Enemy</div>

        <div>
          <p>enemies:</p>
          <ul>{enemyArray.map((enemy, index) => {
            return <li key={index}>{enemy}</li>
          })}</ul>
        </div>

        <label htmlFor="cr">Recommended Party Level:</label>
        <input value={crField} type="number" name="cr" onChange={(e) => {updateCrField(e.target.value)}}/>

        <label htmlFor="info">DM Notes:</label>
        <textarea value={infoField} type="text" name="info" onChange={(e) => updateInfoField(e.target.value)} />

        <label htmlFor="desc">Encounter Description:</label>
        <textarea value={descField} name="desc"cols="30" rows="10" onChange={(e) => {updateDescField(e.target.value)}}></textarea>

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

        <div className="button" onClick={submitEncounter}>Submit Encounter</div>

        <div className="button" onClick={resetFields}>CLEAR</div>

      </StyledUploadForm>
    </StyledMain>
  );
}

const StyledMain = styled.main`
  padding: 0.5em;
`;

const StyledUploadForm = styled.section`
  padding: 1em;
  max-width: 80vw;
  margin: auto;

  h2 {
    font-weight: 900;
  }


  label {
    margin-top: .5em;
  }

  input {
    width: 100%;
  }

  textarea {
    width: 100%;
  }

  select {
    min-width: 200px;
    margin: 0 8px;
  }

  .add_button {
    border: 1px solid black;
    padding: 4px;
    width: fit-content;
    user-select: none;

    &:hover {
      cursor: pointer;
    }

    &:active {
        transform: translateY(4px);
    }
  }

  .button {
    border: 1px solid black;
    border-radius: 1em;
    padding: .5em;
    margin: .5em 0;
    width: fit-content;
    user-select: none;

    &:hover {
      cursor: pointer;
    }

    &:active {
        transform: translateY(4px);
    }
  }
`;
