import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import Nav from '../../components/Nav/Nav';
import * as S from '../../styles/StyledElements';
import {
    showToastMenuState,
    updateToastData,
    updateUserName,
    updateLogin,
} from "../../redux/actions";
import { Link } from 'react-router-dom';

export default function Login(props) {
    // ========= //
    //   HOOKS   //
    // ========= //
    const dispatch = useDispatch();
    const [userNameState, updateUserNameState] = useState("");
    const [userPasswordState, updateUserPasswordState] = useState("");

    // ================ //
    //     Functions    //
    // ================ //
    const updateToastHandler = (jsx) => {
        dispatch(showToastMenuState(true)); // redux => state => is it visible "true or false"
        dispatch(updateToastData(jsx)); // default parent is a div with flex turned on.
    };

    const updateUserNameField = (e) => {
        const str = e.target.value;
        updateUserNameState(str);
        dispatch(updateUserName(e.target.value));
    }

    const loginHandler = () => {
        axios.post("/auth/login", { username: userNameState, password: userPasswordState })
            .then(() => {
                updateUserNameState("");
                updateUserPasswordState("");
                dispatch(updateLogin(true));
            })
            .catch(() => {
                const toast = <S.Toast><S.Box>Username or password is incorrect.</S.Box></S.Toast>
                updateToastHandler(toast);
            })
    }

    const logOffHandler = () => {
        axios.post("/auth/logout", {})
        .then(() => {
            dispatch(updateLogin(false));
        })
        .catch(() => {
            const msg = <S.Toast><S.Box>OOPS! Something's gone wrong.</S.Box></S.Toast>;
            updateToastHandler(msg);
        })
    }

    if (useSelector(state => state.isLoggedIn)) {
        return (
            <React.Fragment>
                <S.Login>
                    <S.Frame maxWidth="500px">
                        <h1>Signed In</h1>

                        <S.Button backgroundColor={props => props.theme.color.gold} className="login" onClick={logOffHandler}>
                            Sign Out
                        </S.Button>
                    </S.Frame>
                </S.Login>
                <Nav />
            </React.Fragment>
            )
    } else {
        return (
            <React.Fragment>
                <S.Login>
                    <S.Frame maxWidth="500px" >
                        <h1>Login</h1>

                        <S.Box>
                            <label htmlFor="user_name">Enter eMail</label>
                            <input value={userNameState} type="email" name="user_name" onChange={updateUserNameField} autoComplete="username" placeholder="example@tabletopsquire.com" />
                        </S.Box>

                        <S.Box>
                            <label htmlFor="password">Enter Password</label>
                            <input value={userPasswordState} name="password" type="password" onChange={(e) => updateUserPasswordState(e.target.value)} autoComplete="current-password" placeholder="password" />
                        </S.Box>

                        <S.Box>
                            <Link to="/">forgot password?</Link>
                        </S.Box>

                        <S.Button backgroundColor={props => props.theme.color.gold} className="login" onClick={loginHandler}>
                            Sign In
                        </S.Button>
                    </S.Frame>
                </S.Login>
                <Nav />
            </React.Fragment>
        )
    }
}