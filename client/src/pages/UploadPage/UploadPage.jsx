import React, { useState } from "react";
import styled from "styled-components";

export default function UploadPage() {
  // HOOKS
  const [passwordField, updatePasswordField] = useState("");

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

      <StyledUploadForm>
        <h2>Rumor</h2>
        <input className="rumor" type="text" />
        <div className="button">Submit</div>
      </StyledUploadForm>
    </StyledMain>
  );
}

const StyledMain = styled.main`
  padding: 0.5em;
`;

const StyledUploadForm = styled.section`
  padding: 1em;

  h2 {
    font-weight: 900;
  }

  .rumor {
      width: 100%;
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
