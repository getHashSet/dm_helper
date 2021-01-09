import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import axios from 'axios';
import Nav from '../../components/Nav/Nav';
import * as S from '../../styles/StyledElements';
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

    // ================ //
    //     Functions    //
    // ================ //
    const updateToastMenu = (str) => {
        const html = <S.Toast>
            {str}
        </S.Toast>
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
        <S.Login>
            <h1>Hello World</h1>

            <label htmlFor="user_name">Enter User Name:</label>
            <input value={userNameState} type="text" name="user_name" onChange={updateUserNameField} />

            <label htmlFor="password">Enter Password:</label>
            <input value={userPasswordState} name="password" type="password" onChange={(e) => updateUserPasswordState(e.target.value)} />

            <div className="login" onClick={submitUserName}>Sign In</div>
            <Link to={'/upload'}>Upload</Link>
            <Nav/>
        </S.Login>
    )
}