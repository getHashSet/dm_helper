import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import { showToastMenuState, updateToastData } from "../../../redux/actions";

EnemyCard.defaultProps = {
    enemyName : "Enemy",
    ac : 10,
    initiative : 1,
    hp : 10,
    movement : ["walk", "swim", "fly", "dig"],
    stats : {
        STR : 14,
        DEX : 20,
        CON : 10,
        INT : 28,
        WIS : 5,
        CHA : 16
    },
    pageNumber : "Monster Manual",
    actions : 1,
    attacks : [
        {
            attack: "bite",
            bonusToHit : 5,
            bonusToDamage : 5,
            info : "",
        }
    ]
}

// ============= //
//   COMPONENT   //
// ============= //
export default function EnemyCard(props) {
    // =================== //
    //   HOOK INTO STATE   //
    // =================== //
    const dispatch = useDispatch(); // used to send data back to redux
    const [enemyHp, updateenemyHp] = useState(props.hp);
    const [hasAdvantage, updatehasAdvatage] = useState(false);

    // ================ //
    //     Functions    //
    // ================ //
    const updateToastMenu = (str) => {
        const html = <StyledToast>
            <h4>{str}</h4>
        </StyledToast>
        dispatch(showToastMenuState(true)); // redux => state => is it visible "true or false"
        dispatch(updateToastData(html)); // default parent is a div with flex turned on.
    }
    
    const rollSavingThrow = (e) => {
        let statMod = 0;

        if (e.target.getAttribute('data-mod') === null){
            statMod = e.target.parentElement.getAttribute('data-mod');
            statMod = statMod.slice(1, statMod.length - 1); // trim the () off the string
        } else {
            statMod = e.target.getAttribute('data-mod');
            statMod = statMod.slice(1, statMod.length - 1); // trim the () off the string
        }

        if (statMod === null) {statMod = 0};

        console.log(statMod);

        const d20 = Math.floor(Math.random() * 20) + 1;
        let savingThrow = d20 + +statMod;

        console.log(`Mod: ${statMod} d20: ${d20}`);

        // Edgecases
        if (savingThrow === 20 && statMod > 0) {savingThrow = "Dirty 20"};
        if (savingThrow < 1 && d20 !== 1) {
            savingThrow = "2";
        };
        if (savingThrow < 1) {
            savingThrow = 1;
        };
        if (d20 === 20) {savingThrow = "Crit"};
        if (d20 === 1) {savingThrow = "1"};

        console.log(`Sending ${savingThrow} to Toast.`)
        updateToastMenu(savingThrow);
    }

    const getStatMod = (stat) => {
        if (stat > 9 && stat < 12) {return};
        
        if (stat < 10) {
            return `(${Math.floor((stat - 10) / 2)})`;
        }

        if (stat > 11) {
            return `(${(stat - 10) / 2})`;
        }
    }

    // ========== //
    //   RETURN   //
    // ========== //
    return (
        <StyledCard>
            
            <h2>{props.enemyName}</h2>

            <StyledHpCounter>HP:  <span onClick={() => updateenemyHp(enemyHp - 1)}>-</span> {enemyHp} <span onClick={() => updateenemyHp(enemyHp + 1)}>+</span> </StyledHpCounter>

            <div>{`AC: ${props.ac}`}</div>

            <ul className="stats">

                <li className="class" 
                    data-mod={`${getStatMod(props.stats.STR)}`} 
                    onClick={rollSavingThrow}>
                    STR 
                    <span>{props.stats.STR}{getStatMod(props.stats.STR)}</span>
                </li>

                <li className="class"
                    data-mod={`${getStatMod(props.stats.DEX)}`}
                    onClick={rollSavingThrow}>
                    DEX <span>{props.stats.DEX}{getStatMod(props.stats.DEX)}</span>
                </li>

                <li className="class"
                data-mod={`${getStatMod(props.stats.CON)}`}
                onClick={rollSavingThrow}>
                    CON <span>{props.stats.CON}{getStatMod(props.stats.CON)}</span>
                </li>

                <li className="class"
                    data-mod={`${getStatMod(props.stats.INT)}`}
                    onClick={rollSavingThrow}>
                    INT <span>{props.stats.INT}{getStatMod(props.stats.INT)}</span>
                </li>

                <li className="class"
                    data-mod={`${getStatMod(props.stats.WIS)}`}
                    onClick={rollSavingThrow}>
                    WIS <span>{props.stats.WIS}{getStatMod(props.stats.WIS)}</span>
                </li>

                <li className="class"
                    data-mod={`${getStatMod(props.stats.CHA)}`}
                    onClick={rollSavingThrow}>
                    CHA <span>{props.stats.CHA}{getStatMod(props.stats.CHA)}</span>
                </li>
            </ul>
        </StyledCard>
    )
}

// ======== //
//   CARD   //
// ======== //
const StyledCard = styled.article`
    width: 30%;
    height: 500px;
    max-height: 90vh;
    max-width: 1000vw;
    margin: .5em;
    padding: 4px;
    background-color: #fff;
    border: 1px solid #c0392b;
    border-radius: .5em;
    color:#2f3640;

    .stats {
        margin: .5em 0;
        border-top: 1px solid #bdc3c7;
        border-bottom: 1px solid #bdc3c7;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;

        li {
            text-align: center;
            padding: .5em;
            font-size: .8em;
            font-weight: 900;
            text-transform: uppercase;
            user-select: none;

            span {
                margin-top: 2px;
                display: block;
                font-weight: 400;
            }

            &:hover {
                cursor: pointer;
                color: #e74c3c;
            }

            &:active {
                transform: translateY(3px);
            }
        }
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const StyledHpCounter = styled.div`
    user-select: none;

    span {
        &:hover {
            cursor: pointer;
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

    h4 {
        font-weight: 900;
        font-size: 3em;
    }
`;