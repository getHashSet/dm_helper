import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { showToastMenuState, updateToastData } from "../../redux/actions";
import axios from 'axios';
import { svg_beer, svg_d20, svg_refresh } from "../../styles";

Inn.defaultProps = {};

export default function Inn() {
  // =================== //
  //   HOOK INTO STATE   //
  // =================== //
  const [tavernName, updatetavernName] = useState("The Happy Hag");
  const dispatch: Function = useDispatch();

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
    <StyledSection>
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
          {svg_d20}
          <span>Rumor</span>
        </StyledButton>

        <StyledRefresh onClick={refreshTavern} title="Refresh Tavern">
          {svg_refresh}
        </StyledRefresh>
      </StyledFrame>
    </StyledSection>
  );
}

const StyledTavernMenu = styled.section`
  h3 {
    font-weight: 900;
    font-size: 1.5em;
    padding: 0.5em 0;
  }
`;

const StyledFrame = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  color: #34495e;

  h2 {
    font-size: 2em;
    font-weight: 800;
    margin-bottom: 1em;
    user-select: none;

    svg {
      height: 1em;
      max-height: 1em;
      max-height: 1em;
      padding: 0 0.5em 0 0;
      margin-bottom: -4px;
    }
  }
`;

const StyledRefresh = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  color: #34495e;

  svg {
    width: 1em;
    transition: transform 1s;

    &:hover {
      cursor: pointer;
      transform: rotate(360deg);
    }
  }

  &:active {
    transform: translateY(4px);
  }

  @media (max-width: 768px) {
    svg {
      transition: transform 0;

      &:hover {
        transform: none;
      }
    }
  }
`;

const StyledSection = styled.section`
  padding: 1em 0.5em;
  display: flex;
  justify-content: center;
  background-color: #ecf0f1;
`;

const StyledButton = styled.button`
  background: #2ecc71;
  color: #fff;
  font-size: 1.5em;
  padding: 0.5em 1em;
  margin: 0.5em 0;
  border-radius: 2em;
  border: 1px solid #fff;
  text-transform: uppercase;
  font-weight: 900;

  svg {
    width: 1em;
    padding: 0 0.5em;
    margin-bottom: -2px;
  }

  span {
    padding-right: 0.5em;
  }

  &:hover {
    cursor: pointer;
    background-color: #27ae60;
    border: 1px solid #27ae60;
    color: #fff;
  }

  &:active {
    transform: translateY(4px);
  }

  &:focus {
    outline: none;
  }
`;

const StyledToast = styled.section`
  font-weight: 400;
  font-size: 16px;
  text-align: center;
  background-color: #fff;
  padding: .5em;

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
