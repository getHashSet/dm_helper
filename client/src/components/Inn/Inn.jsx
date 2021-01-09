// ============= //
//     IMPORT    //
// ============= //
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { showToastMenuState, updateToastData } from "../../redux/actions";
import axios from 'axios';
import { svg_beer, svg_d20, svg_refresh } from "../../styles";
import * as S from '../../styles/StyledElements';

// ============= //
//     EXPORT    //
// ============= //
export default function Inn() {
  // ================= //
  //   HOOKS & REDUX   //
  // ================= //
  const dispatch = useDispatch();
  const [tavernName, updatetavernName] = useState("The Happy Hag");

  // ================ //
  //     Functions    //
  // ================ //
  const updateToastHandler = (data) => {
    const toast = <S.Toast>{data}</S.Toast>;
    dispatch(updateToastData(toast));
    dispatch(showToastMenuState(true));
  };
  
  const refreshTavernHandler = () => {
    tavernName === "The Happy Hag"
    ? updatetavernName("Stuffit Inn & Pub")
    : updatetavernName("The Happy Hag");
  };

  const getRandomRumor = (e) => {
    e.preventDefault();

    axios.get("/api/rumor")
      .then(data => {
        const toast = <p>{data.data.rumor.toString()}</p>;
        updateToastHandler(toast);
      }).catch(err => {
        // do nothin
      });
  };
  
  // ============= //
  //     RETURN    //
  // ============= //
  return (
    <S.Chapter backgroundColor={props => props.theme.color.light} >
      <S.Frame>
        <h2>
          {svg_beer}
          The Tavern
        </h2>
        <StyledTavernMenu>
          <h3>{tavernName}</h3>
          <p>How many employees?</p>
          <p>Tavern Employee [name, race, mood]</p>
          <p>How many patrons? [1d4, 2d4, 3d4, 4d4]</p>
          <p>Menu</p>
          <p>Room Cost</p>
        </StyledTavernMenu>

        <S.Button onClick={getRandomRumor}>
          {svg_d20} Rumor
        </S.Button>

        <S.Refresh onClick={refreshTavernHandler} title="Refresh Tavern">
          {svg_refresh}
        </S.Refresh>

      </S.Frame>
    </S.Chapter>
  );
}

// ========== //
//   STYLES   //
// ========== //
const StyledTavernMenu = styled.section`
  h3 {
    font-weight: 900;
    font-size: 1.5em;
    padding: 0.5em 0;
  }
`;