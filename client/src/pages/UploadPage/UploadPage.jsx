import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import Nav from "../../components/Nav/Nav";
import { updateToastData, showToastMenuState } from "../../redux/actions";
import { svg_d20 } from "../../styles";
import * as S from "../../styles/StyledElements";

export default function UploadPage() {
  // HOOKS
  const [rumorField, updateRumorField] = useState("");
  const [passwordField, updatePasswordField] = useState("");
  const [locationField, updateLocationField] = useState("error");
  const [enemyField, updateEnemyField] = useState("");
  const [enemyArray, updateEnemyArray] = useState([]);
  const [infoField, updateInfoField] = useState("");
  const [descField, updateDescField] = useState("");
  const [crField, updateCrField] = useState("1");
  const [listOfApiEnemies, updateListOfApiEnemies] = useState([]);
  const [cr, updateCr] = useState(0);
  const dispatch = useDispatch();

  // =============== //
  //    FUNCTIONS    //
  // =============== //

  const submitEncounter = () => {

    // TODO: add confirm field. 

    let POSTrequest = {
      password: passwordField,
      encounter: {
        enemies: enemyArray,
        info: infoField,
        desc: descField,
        cr: crField,
        location: locationField.toLowerCase(),
      }
    }

    if (passwordField.length < 1
      || enemyArray.length < 1
      || descField === ""
      || +crField < 1
      || locationField === "error"
      || locationField === "select a location"
    ) {
      alert(`Bad Data: Check password, enemies, And information fields. `);

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
    updateEnemyField("");
    updateEnemyArray([]);
    updateInfoField("");
    updateDescField("");
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

  const uploadRumor = () => {
    if (rumorField.length < 5) { return };

    const POSTrequest = {
      password: passwordField,
      rumor: rumorField,
    }

    const url = '/api/rumor/upload';

    axios.post(url, POSTrequest)
      .then(data => {
        console.log(data.msg);
        updateRumorField("");
      });
  }

  const uploadItem = () => {
    const POSTrequest = {
      token: passwordField,
      item: {
        name: "Backpack",
        cost: 2,
        coin: "gp",
        desc: "A common leather bag with two shoder straps and a rope tie.",
        category: ["common", "item shop", "tools"],
      }
    }

    axios.post('/api/items/add', POSTrequest)
      .then(server => {
        alert(server.data.msg);
      })
  }

  // ========= //
  //   TOAST   //
  // ========= //
  const updateToastHanddler = () => {
    const toastData =

      // ======= //
      //   JSX   //
      // ======= //
      <S.Toast>
        <section>
          <h2>Title</h2>
          <h3>Title</h3>
          <h4>Title</h4>
          <p>Body</p>
        </section>
      </S.Toast>

    // ============== //
    //   CALL TOAST   //
    // ============== //
    dispatch(updateToastData(toastData));
    dispatch(showToastMenuState(true));
  }

  // ========== //
  //   RETURN   //
  // ========== //
  return (
    <React.Fragment>
      <StyledMain>
        <h1 className="clickable" onClick={updateToastHanddler}>{svg_d20}</h1>

        <S.UploadForm>
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
        </S.UploadForm>

        <S.UploadForm>
          <h2>Item</h2>

          <div className="block">
            <label htmlFor="item_name">Item Name:</label>
            <input type="text" name="item_name" />
          </div>

          <div className="block">
            <label htmlFor="cost">Cost:</label>
            <input type="number" name="cost" />
            <div className="coin_type">
              <div className="coin copper">cp</div>
              <div className="coin silver">sp</div>
              <div className="coin gold">gp</div>
            </div>
          </div>

          <div className="block">
            <label htmlFor="item_desc">Description:</label>
            <textarea name="item_desc"></textarea>
          </div>

          <div className="block">
            <h4><span>(optional)</span>Weapon Info</h4>

            <label htmlFor="dice_type">Damage:</label>
            <input type="dice_type" placeholder="example: 2d6" />

            <label htmlFor="damage_type">Damage Type:</label>
            <select>
              <option value="bludgeoning">Bludgeoning</option>
              <option value="piercing">Piercing</option>
              <option value="slashing">Slashing</option>
              <option value="magic">Magic</option>
              <option value="fire">Fire</option>
            </select>

            <label htmlFor="properties">Properties:</label>
            <div className="properties">

              <div className="property">
                <div className="checkbox" name="light"></div>
                <p>Light</p>
              </div>

              <div className="property">
                <div className="checkbox" name="finesse"></div>
                <p>Finesse</p>
              </div>

            </div>
          </div>

          <div className="block">
            <h4>Category:</h4>
            <p>Select all that apply</p>
            <div className="categories">

              <div className="category">
                <div className="checkbox" name="adventure gear"></div>
                <p>Adventure Gear</p>
              </div>

              <div className="category">
                <div className="checkbox" name="trinket"></div>
                <p>Trinket</p>
              </div>

              <div className="category">
                <div className="checkbox" name="animal"></div>
                <p>Mounts and Other Animals</p>
              </div>

              <div className="category">
                <div className="checkbox" name="tack and drawn"></div>
                <p>Tack, Harness, and Drawn Vehicles</p>
              </div>

              <div className="category">
                <div className="checkbox" name="components"></div>
                <p>Material Components</p>
              </div>

              <div className="category">
                <div className="checkbox" name="magic"></div>
                <p>Magic</p>
              </div>

              <div className="category">
                <div className="checkbox" name="food"></div>
                <p>Food</p>
              </div>

              <div className="category">
                <div className="checkbox" name="drink"></div>
                <p>Drink</p>
              </div>

              <div className="category">
                <div className="checkbox" name="armor"></div>
                <p>Armor</p>
              </div>

              <div className="category">
                <div className="checkbox" name="weapon"></div>
                <p>Weapon</p>
              </div>

              <div className="category">
                <div className="checkbox" name="tool"></div>
                <p>Tool(s)</p>
              </div>

            </div>
          </div>

          <div className="block" onClick={uploadItem}>
            <p>UPLOAD ITEM</p>
          </div>

        </S.UploadForm>

        <S.UploadForm className="rumor">
          <h2>Rumor</h2>
          <div className="block">
            <label htmlFor="rumor">Add A Rumor:</label>
            <textarea value={rumorField} className="rumor" name="rumor" type="text" onChange={(e) => updateRumorField(e.target.value)} />
          </div>

          <div className="block">
            <div className="button" onClick={uploadRumor}>Submit Rumor</div>
          </div>
        </S.UploadForm>

        <S.UploadForm className="encounter">
          <h2>Encounter</h2>

          <div className="block">
            <div className="button" onClick={resetFields}>CLEAR</div>
          </div>

          <div className="block">
            <label htmlFor="location">Encounter Location</label>
            <select type="text" name="location" onChange={(e) => { updateLocationField(e.target.value) }}>
              <option value="error">select a location</option>
              <option value="plains">Road / Plains</option>
              <option value="woods">The Woods</option>
              <option value="mountains">Mountains</option>
              <option value="dungeon">Dungeon</option>
              <option value="friendly">Friendly</option>
              <option value="town">Town</option>
              <option value="underground">Underground</option>
            </select>
          </div>

          <div className="block">
            <label htmlFor="selectEnemy">Enemy Index (coming soon)</label>
            <label htmlFor="enemies">Enemies:</label>
            <input type="text" name="enemies" value={enemyField} onKeyDown={submitToEnemyList} onChange={(e) => updateEnemyField(e.target.value)} />
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
            <select name="cr" onChange={(e) => { updateCrField(e.target.value) }}>
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
            <textarea value={descField} name="desc" cols="30" rows="10" onChange={(e) => { updateDescField(e.target.value) }}></textarea>
          </div>

          <div className="block">
            <label htmlFor="info">DM Notes:</label>
            <textarea value={infoField} type="text" name="info" onChange={(e) => updateInfoField(e.target.value)} />
          </div>

          <div className="block">
            <div className="button" onClick={submitEncounter}>Submit Encounter</div>
          </div>

        </S.UploadForm>
      </StyledMain>
      <Nav />
    </React.Fragment>
  );
}

const StyledMain = styled.main`
  padding: 0.5em;
  background-color: #dfe6e9;


  svg {
        width: 1em;
        height: 1em;
        max-width: 100%;
        max-height: 100%;
        color: black;
    }
`;
