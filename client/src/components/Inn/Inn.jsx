import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { showToastMenuState, updateToastData } from "../../redux/actions";
import axios from 'axios';
import { svg_beer, svg_d20, svg_refresh } from "../../styles";
import { StyledButton, StyledChapter, StyledFrame, StyledRefresh, StyledToast } from '../../styles/StyledElements';


Inn.defaultProps = {};

export default function Inn() {
  // =================== //
  //   HOOK INTO STATE   //
  // =================== //
  const [tavernName, updatetavernName] = useState("The Happy Hag");
  const dispatch = useDispatch();

  // ================ //
  //     Functions    //
  // ================ //
  const updateToastMenu = (str) => {
    const tempValue = (
      <StyledToast>
        {str}
      </StyledToast>
    );
    dispatch(showToastMenuState(true)); // redux => state => is it visible "true or false"
    dispatch(updateToastData(tempValue)); // default parent is a div with flex turned on.
  };

  const getRandomRumor = (e) => {
    e.preventDefault();

    axios.get("/api/rumor")
      .then(data => {
        const toast = <p>{data.data.rumor.toString()}</p>;
        updateToastMenu(toast);
      }).catch(err => {
        // do nothin
      });
  };

  const refreshTavern = (e) => {
    e.preventDefault();
    tavernName === "The Happy Hag"
      ? updatetavernName("Stuffit Inn & Pub")
      : updatetavernName("The Happy Hag");
  };

  return (
    <StyledChapter
      backgroundColor={props => props.theme.color.light}
    >
      <StyledFrame>
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

        <StyledButton onClick={getRandomRumor}>
          {svg_d20} Rumor
        </StyledButton>

        <StyledRefresh onClick={refreshTavern} title="Refresh Tavern">
          {svg_refresh}
        </StyledRefresh>

      </StyledFrame>
    </StyledChapter>
  );
}

const StyledTavernMenu = styled.section`
  h3 {
    font-weight: 900;
    font-size: 1.5em;
    padding: 0.5em 0;
  }
`;