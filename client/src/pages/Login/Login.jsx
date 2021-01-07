import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import axios from 'axios';
import Nav from '../../components/Nav/Nav';
import {
    showToastMenuState,
    updateToastData,
    updateUserName,
    updateLogin
} from "../../redux/actions";

export default function Login(props) {
    // ========= //
    //   HOOKS   //
    // ========= //
    const [userNameState, updateUserNameState] = useState("");
    const [userPasswordState, updateUserPasswordState] = useState("");
    const dispatch = useDispatch();

    // cache login attempts
    // reset password
    // user name field
    // password field
    // email token

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

    const updateUserNameField = (e) => {
        const str = e.target.value;
        console.log(e.target.value);
        updateUserNameState(str);
        dispatch(updateUserName(e.target.value));
    }

    const submitUserName = () => {
        const POSTobject = {
            userName: userNameState,
            password: userPasswordState,
        };

        axios.post("/login/attempt", POSTobject)
            .then(serverData => {
                console.log(serverData.data);
                updateToastMenu(serverData.data.msg);

                if (serverData.data.msg === "I like cake") {
                    dispatch(updateLogin(true));
                };
            })
            .catch(err => {
                updateToastMenu(err.data.err)
            })

    }

    return (
        <StyledLogin>
            <h1>Hello World</h1>

            <label htmlFor="user_name">Enter User Name:</label>
            <input value={userNameState} type="text" name="user_name" onChange={updateUserNameField} />

            <label htmlFor="password">Enter Password:</label>
            <input value={userPasswordState} name="password" type="password" onChange={(e) => updateUserPasswordState(e.target.value)} />

            <div className="login" onClick={submitUserName}>Sign In</div>
            <Link to={'/upload'}>Upload</Link>
            <Nav/>
        </StyledLogin>
    )
}

const StyledLogin = styled.section`
    background-color: #aaa;
    color: #fff;

    .login {
        user-select: none;
        border: 1px solid #fff;
        padding: 4px;
        margin: 4px;
        width: fit-content;

        &:hover {
            cursor: pointer;
        }

        &:active {
            transform: translateY(4px);
        }
    }
`;

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